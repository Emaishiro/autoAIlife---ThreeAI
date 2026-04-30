# AI Prompt 系统分析报告

**日期：** 2026-04-29  
**分析文件：** `game.js`（5645 行）  
**分析人：** Claude Sonnet 4.6

---

## 概览

本游戏使用 **DeepSeek API** 驱动角色行为叙事，四个 AI 调用点共享一个中央 API 函数，并有一套多阶段 JSON 修复管线和离线 Mock 回退。

---

## 系统架构

```
游戏定时器触发 gameLoop()
  ├── 构建 user prompt（完整游戏状态）
  ├── updateCharactersMood()
  └── callAI(actionPrompt)
        ├── 无 API Key → mockAIResponse()
        ├── buildSystemPrompt()
        │     ├── generateDynamicPersonality() × 每个角色
        │     ├── 职业规则 / 代词规则 / 房间列表 / NPC 列表
        │     └── 写作风格指南 + JSON schema
        └── callDeepseekAPI([system, user])
              ├── fetch() → DeepSeek API
              ├── extractDeepseekResponseContent()
              └── cleanAndParseJSON()（多阶段修复）

处理 AI 响应
  ├── 逐 action 处理（移动/状态/购买/消耗/道具/技能）
  ├── 美术 prompt 生成（fire-and-forget）
  ├── 新 NPC / 爱情事件
  ├── 保存 recentEvents（最近 2 轮）
  ├── 推进游戏时间
  └── 日期变更 → doNightlyRelationshipReview()
```

---

## 四个 AI 调用点

| 函数 | 行号 | 用途 | maxTokens |
|------|------|------|-----------|
| `callAI()` | 1549 | 主游戏循环行动生成 | 10000（实际上限 8192）|
| `generateRestActionWithAI()` | 743 | 休息行动生成 | 500 |
| `callNightlyReviewAI()` | 1965 | 夜间关系审查 | 1500 |
| `generateArtworkImagePrompt()` | 2027 | 美术图像 prompt | 2400 |

---

## 🐛 已确认 Bug

### Bug 1：`consume_items` 字段名不匹配 ⚠️ 高优先级

- **位置：** `game.js:2644`
- **现象：** 角色无法从房间消耗物品，静默失败
- **根因：**
  - `game.js:1535` system prompt schema 定义字段为 `consumed.from`
  - `game.js:2644` 代码检查的是 `consumed.room`
- **影响：** AI 按 schema 返回 `from: "kitchen"` → 代码读 `.room` 为 undefined → 房间消耗跳过
- **只有** `from: "inventory"` 路径（`game.js:2639`）正常工作
- **修复方向：** 将 `game.js:2644` 的 `consumed.room` 改为 `consumed.from`

---

### Bug 2：energy 下限是 1 而非 0 ⚠️ 高优先级

- **位置：** `game.js:2606`
- **代码：** `Math.max(1, ...)`
- **现象：** 体力永远无法降到 0，"体力耗尽昏倒"机制无法触发
- **修复方向：** 改为 `Math.max(0, ...)`，在昏倒判断逻辑处检查 `energy === 0`

---

### Bug 3：Mock 系统硬编码 3 个角色 🟡 中优先级

- **位置：** `game.js:1899–1900`
- **现象：** 无 API Key 时，只为惠舞/三玖/五月生成动作
- **影响：** 自定义角色数量不是 3（1、2、4、5 个）时，mock 产生无效动作
- **修复方向：** 改为动态读取 `gameState.characters`，按实际角色生成 mock 动作

---

### Bug 4：夜间关系审查不启用 JSON 格式 🟡 中优先级

- **位置：** `game.js:1973`
- **代码：** `callNightlyReviewAI` 传 `useJsonFormat: false`
- **影响：** 非 thinking 模式下不设置 `response_format: json_object`，但 prompt 要求 JSON，解析靠 `cleanAndParseJSON` 兜底，可靠性低于结构化输出
- **修复方向：** 改为 `useJsonFormat: true`，或在 prompt 中增加更严格的 JSON 输出格式约束

---

## ⚠️ 稳定性风险

### 风险 1：无重试机制

- **位置：** `game.js:1549`
- **描述：** `callAI()` 失败直接返回 null，整个回合跳过
- **建议：** 添加指数退避重试（最多 2-3 次），对 5xx / 429 错误自动重试

### 风险 2：fetch 无超时

- **位置：** `game.js:1305`
- **描述：** `fetch()` 没有 `AbortController` / timeout
- **影响：** API 挂起时游戏循环永久阻塞
- **建议：** 添加 30 秒超时：
  ```js
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  fetch(url, { signal: controller.signal, ... });
  ```

### 风险 3：无速率限制 / 无请求队列

- **描述：** 主循环 + 美术 prompt 几乎同时发起请求，可能触发 429
- **建议：** 添加请求队列或最小间隔控制

### 风险 4：max_tokens 实际上限 8192

- **位置：** `game.js:1287`
- **代码：** `Math.min(Math.max(requestedTokens, 8000), 8192)`
- **影响：** 主循环请求 10000 token，实际被截断至 8192；5 角色 + thinking 模式时极易截断 JSON
- **建议：** 评估是否需要提高上限，或在多角色时拆分请求

### 风险 5：localStorage 溢出未处理

- **位置：** `game.js:2768`
- **描述：** `localStorage.setItem('artwork_prompt_log', ...)` 可能抛出 `QuotaExceededError`
- **建议：** `.catch()` 中增加存储溢出的专项处理（清理旧日志）

---

## 🚀 优化建议

### 优化 1：缓存 System Prompt（减少 token 浪费）

- **位置：** `game.js:1555`
- **现状：** 每轮游戏循环都完整重建 system prompt
- **问题：** 职业规则、房间列表、NPC 列表、写作风格指南等静态内容每次重复构建
- **建议：** 将静态部分缓存，仅在配置变动时刷新；动态部分（角色状态）单独构建

### 优化 2：消除 system / user prompt 的角色状态冗余

- **现状：**
  - `buildSystemPrompt()` → `generateDynamicPersonality()` 含状态注释
  - user prompt（`game.js:2439–2448`）再次重复数值状态
- **建议：** 合并到一处，减少 token 消耗约 10-15%

### 优化 3：扩大 recentEvents 历史窗口

- **位置：** `game.js:2841`
- **现状：** 只保留最近 2 轮事件作为 AI 记忆
- **影响：** 长期叙事连贯性差，角色容易"失忆"
- **建议：** 扩大至 5-8 轮，或按字符数限制而非轮数限制

### 优化 4：美术 Prompt 生成加入请求队列

- **位置：** `game.js:2733`
- **现状：** fire-and-forget，仅有 5 秒节流但无队列
- **建议：** 改为队列消费模式，避免快速推进时并发 API 调用

### 优化 5：`generateRestActionWithAI` 缺少 system message

- **位置：** `game.js:786–788`
- **现状：** 只发送 `[user]` 消息，无 system prompt 锚定行为
- **建议：** 添加简短 system prompt 以提升输出质量和一致性

---

## 已有亮点

- **多阶段 JSON 修复管线**（`cleanAndParseJSON` + `repairJSONStrings`）：字符级状态机 + 8 级降级解析，鲁棒性很高
- **动态状态注释**（`generateDynamicPersonality`）：实时将数值状态转换为语义描述（"精力不足"/"情绪低落"等），有效引导 AI 输出
- **Thinking 模式集成**：支持 `default` / `inner_os` / `no_inner_os` 三种思维风格
- **丰富的 context 构建**：时间/季节/节假日/房间/角色/关系/最近事件全部注入，上下文信息量充分

---

## 修复优先级建议

| 优先级 | 项目 | 预估工作量 |
|--------|------|-----------|
| P0 | Bug 1：consume_items 字段名不匹配 | 1 行 |
| P0 | Bug 2：energy 下限改为 0 | 1 行 |
| P1 | 风险 2：添加 fetch 超时 | ~10 行 |
| P1 | 风险 1：添加重试机制 | ~20 行 |
| P2 | Bug 4：夜间审查启用 JSON 格式 | 1 行 |
| P2 | Bug 3：Mock 系统动态化 | ~30 行 |
| P3 | 优化 3：扩大历史窗口 | 1 行 |
| P3 | 优化 1：缓存 system prompt | ~40 行 |
