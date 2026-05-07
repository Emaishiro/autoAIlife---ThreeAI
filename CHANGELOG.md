# 更新日志

所有版本的变更记录，按日期倒序排列。

---

## [0.3.2] — 2026-05-29

### 修复

- **gameLoop 崩溃：`action.action.slice` 报错**
  AI 偶尔不返回 `action` 字段，导致 `undefined.slice(0, 40)` 抛出异常，整轮跳过。
  修复：`(action.action || '').slice(0, 40)`。

- **`RegExp.$1` 弃用警告**
  JSON 解析错误日志中使用了已弃用的全局 `RegExp.$1`，多次调用后值可能被覆盖。
  修复：改用 `match()` 返回的捕获数组 `posMatchFinal[1]`。

---

## [0.3.1] — 2026-05-28

### 修复

- **创作作品描述混入创作环境**
  AI 生成的作品描述（中文和英文 prompt）将画室、画师姿态、调色盘、清水等创作背景混入，而非仅描述作品本身。
  根本原因：prompt 中传入了 `完成背景`（`action.result`），并且描述要求中包含"光线、场景、氛围"等非作品内容。
  修复：移除 `完成背景` 字段，两个模式（SD / 自然语言）的描述要求均改为"仅描述作品画面本身，不得提及创作者、画室等创作环境"。

---

## [0.3.0] — 2026-05-26 至 2026-05-27

### 修复

- **`item.with.split is not a function`**
  夜晚关系结算时，`interaction_with` 字段有时 AI 返回数组而非字符串，导致 `.split()` 崩溃。
  修复：push 时做 `Array.isArray` 判断并 `join('、')`，读取时额外加 `String()` 兜底。

- **JSON 解析失败：`Unexpected end of JSON input`**
  响应在末尾截断时无位置号，位置型截断策略无法生效，整轮跳过。
  修复：新增末尾截断专项处理——从后往前最多扫 5 个字段边界（`",` / `"}` / `"]`），依次截断后用 `repairJSONStrings` 补全括号再解析。

---

## [0.2.9] — 2026-05-25

### 修复

- **角色自说自话（独白出现在互动对话中）**
  AI 为每个参与互动的角色各生成了独立的 `dialogue` 数组，其中部分数组只含单一说话人的台词。
  修复：打印对话前检查说话人集合，`speakers.size < 2` 的独白数组一律跳过，不输出到日志。

- **互动标题重复出现（"X与Y进行了互动" 出现多次）**
  同一轮互动中两个角色各自的 action 都会触发互动标题，第二次出现时对话已被判重跳过，导致标题单独孤立显示。
  修复：新增 `shownInteractionPairs` Set，按名字排序后拼 key，同一对只打印一次标题。

---

## [0.2.8] — 2026-05-24

### 修复

- **gameLoop 卡死（`isProcessing` 永久为 true）**
  `gameLoop` 主体无 try/catch/finally，行为处理阶段（2568–2932 行）一旦抛出未捕获异常，`isProcessing` 永远停留 `true`，循环因 guard clause 永远 return，整个模拟卡死。
  修复：将函数主体包裹在 `try { } catch (loopErr) { } finally { isProcessing = false; updateUI(); }` 中，任何异常均记录日志并自动恢复循环。

- **JSON 解析失败：`Expected ',' or '}'`（位置型错误无处理）**
  `repairJSONStrings` 修复后仍失败时，代码只对 `Unterminated string` 做激进截断，对"Expected ',' or '}'"等位置型错误无特殊处理，直接抛出。
  修复：新增按错误位置截断策略——提取错误位置号，找最后一个逗号前截断，再用 `repairJSONStrings` 补全括号。

---

## [0.2.7] — 2026-05-09

### 修复

- **设置面板角色颜色选择器与文本框不联动**
  颜色选择器拖动时文本框不更新；文本框需失焦才触发（`onchange`）；同步逻辑用 `[value="${newColor}"]` 选择器，而 DOM 属性不跟随输入变化，始终找不到目标元素。
  修复：两个输入框均加 `data-char-id` 属性，`updateSetupCharColor` 改用 `querySelectorAll('[data-char-id]')` 同步；文本框事件改为 `oninput` 实时触发。

---

## [0.2.6] — 2026-03-09

### 修复

- **生活日志颜色不跟随配置编辑器**
  `addLog` 使用硬编码的角色名→ID 映射，自定义角色和配置编辑器中修改的颜色无法反映到日志。
  修复：`addLog` 改为动态查询 `gameState.characters`，通过 `findCharacterIdByName()` 获取 charId，设置 `data-color-id` 属性，由 `applyCharacterColors()` 生成的 CSS 自动匹配。

- **导入后存档位没有存档信息**
  `confirmImportData()` 只更新了 `setupPanelState`，未写入 `localStorage`。
  修复：多存档汇总逐个写入对应槽位（save_1/2/3），单个存档写入 save_1，完成后调用 `renderSaveSlots()` 刷新。

- **导入时显示"格式错误"**
  `previewImportFile()` 未识别多存档汇总格式（`{ "apartment_sim_save_1": {...} }`），只接受单个存档结构。
  修复：检测顶层键是否含 `apartment_sim_save_*`，匹配时提取第一个存档对象进行预览。

- **导入后进游戏仍从默认值开始**
  `confirmImportData` 未保存 `loadedGameState`，进游戏时始终使用默认状态。
  修复：导入时同步写入 `loadedGameState`，供 `startGameFromSetup()` 使用。

### 重构

- **统一颜色管理系统**
  原有两套颜色更新函数（`updateCharColorLive` / `updateCharColor`）逻辑重复，颜色存储分散。
  重构：新增 `setCharacterColor(charId, newColor, options)` 统一入口，同步更新 `gameState` + `activeConfig` + UI；旧函数改为包装器，设置面板专用 `updateSetupCharColor` 仅操作 `setupPanelState`。

---

## [0.2.5] — 2026-03-06

### 新增

- 游戏前设置面板（全屏覆盖层）
- 角色配置（1–5 个，支持名/色/性/年/职/月薪/性格/技能/初始背包）
- 房间配置（1–10 个）
- 角色间关系度设置面板（2+ 角色时显示）
- 存档槽位管理（3 个本地槽位，读取/删除/导入/导出）
- 游戏中编辑抽屉（角色/房间/世界观实时编辑）
- 存档多格式兼容（v1.0 / v2.0，JSON / TXT）
- 动态配置架构（`GAME_CONFIG` / `activeConfig` / `gameState` 分层）
