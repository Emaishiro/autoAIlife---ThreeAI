# 作品文生图命令词功能测试指南

## 功能概述
当角色完成创作作品时，deepseek 自动生成中英双语的文生图命令词显示在生活日志上。

## 快速测试步骤

### 场景1：无 API Key（Mock 模式测试）

1. **启动游戏**
   - 打开 `index.html`
   - 不输入 API Key（保持为空）
   - 点击"开始游戏"

2. **快进到下午工作时段**
   - 使用"快速推进"或时间倍数加速
   - 让游戏时间推进到 14-17 点（下午工作时段）

3. **观察日志**
   - 在生活日志中寻找粉紫色的日志条目
   - 应该看到：
     ```
     ✦ 三玖 完成了新作品 《那个女孩》
       衣料质感细腻的少女，光影在脸上流动，若有若无的神情
     [SD Prompt] a quiet girl sitting by the window, back facing viewer, ...
     [Negative] lowres, bad anatomy, blurry, ugly, text, watermark...
     ```
   - 五月也会生成类似的视频制作相关的 prompt

### 场景2：有 API Key（真实 API 调用）

1. **配置 API Key**
   - 在输入框中填入有效的 deepseek API Key
   - 点击"开始游戏"

2. **快进到下午工作时段**
   - 同上步骤

3. **观察日志**
   - 等待 1-2 秒，deepseek 会实时生成对应作品的 prompt
   - prompt 内容会基于三玖/五月的具体描述动态生成
   - 格式同上

## 预期日志颜色

- **粉紫色** (`#ff79c6`)：作品完成标题行
- **青蓝色** (`#8be9fd`)：Prompt 内容行

## 关键验证点

| 验证项 | 预期结果 | 状态 |
|--------|---------|------|
| Mock 模式下有 prompt 显示 | ✓ 三玖插画/五月视频 prompt 显示 | [ ] |
| API Key 模式下 prompt 动态生成 | ✓ prompt 内容因 deepseek 而不同 | [ ] |
| 惠舞工作时无 artwork 日志 | ✓ 只有三玖和五月出现 artwork | [ ] |
| 日志格式正确 | ✓ 包含中文描述 + 英文 prompt | [ ] |
| 5秒节流工作 | ✓ 同时完成多个作品不会触发多次 | [ ] |
| 日志色彩醒目 | ✓ 粉紫+青蓝在黑底绿字中清晰可见 | [ ] |

## 代码修改位置

| 文件 | 改动 | 行号 |
|------|------|------|
| game.js | gameState.lastArtworkPromptTime 新增 | 172 |
| game.js | systemPrompt workOutput 说明 | 799-805 |
| game.js | mock 三玖 workOutput | 1029-1033 |
| game.js | mock 五月 workOutput | 1044-1048 |
| game.js | 三个新函数 | 1232-1325 |
| game.js | gameLoop 触发逻辑 | 1685-1710 |
| style.css | artwork 样式 | 165-182 |

## 故障排查

**问题**：日志中看不到 artwork 条目
- 检查是否已快进到 14-17 时段
- 检查浏览器控制台是否有错误信息
- 确保 gameState.lastArtworkPromptTime 被正确初始化

**问题**：API Key 模式下 prompt 生成失败
- 检查 API Key 是否有效
- 检查网络连接
- 查看浏览器控制台的错误提示

**问题**：日志色彩显示不正确
- 清除浏览器缓存
- 检查 style.css 是否正确加载 `.artwork` 和 `.artwork-prompt` 类

## 演示场景

### 推荐演示流程

1. 打开游戏（无 API Key）
2. 点击"快速推进"数次，到达 14:00-17:00 时间范围
3. 在日志中找到粉紫色的 artwork 条目
4. 截图展示中英双语 prompt 效果
5. 如果有 API Key，再演示一遍真实 API 调用的效果

### 截图重点

- 粉紫色作品完成标题
- 中文作品描述
- 英文 SD Prompt
- 负向提示词（Negative）
