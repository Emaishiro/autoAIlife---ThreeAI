# API 调用错误修复日志

## 问题诊断

### 错误序列
1. **错误1** (2026-03-05): `getPronoun is not defined`
   - 原因: 函数被调用但未定义
   - 修复: 添加 `function getPronoun(gender)`

2. **错误2**: `Failed to read 'headers' property from 'RequestInit': String contains non ISO-8859-1 code point`
   - 原因: 两个fetch调用的逻辑不一致
   - 表现: 某些情况下响应解析失败

3. **错误3** (当前): `Unterminated string in JSON at position 2337 (line 52 column 163)`
   - 原因: JSON被截断或包含未转义的特殊字符
   - 位置: 系统提示的第52行（接近结尾）
   - 根本原因: max_tokens设置过低，导致API响应中途被截断

## 修复方案

### 1. 代码重构 (消除重复)
**修改前:**
- `callAI()` 中有 70 行直接的 fetch 调用代码
- `callNightlyReviewAI()` 中有 14 行类似的 fetch 调用代码
- headers、错误处理、JSON解析方式都不一致

**修改后:**
- 提取共享逻辑到 4 个工具函数:
  1. `getDeepseekHeaders()` - headers 生成
  2. `cleanAndParseJSON()` - JSON 清理和解析
  3. `callDeepseekAPI()` - 通用 API 调用
  4. `API_CONFIG` - 配置常量

### 2. 参数优化
| 函数 | 修改前 max_tokens | 修改后 max_tokens | 原因 |
|-----|------------------|------------------|------|
| callAI (daily actions) | 1000 | 2000 | 3个角色×50-150字的action, JSON结构复杂 |
| callNightlyReviewAI | 600 | 800 | 关系更新数据较小，但需要安全边际 |

### 3. 错误处理改进
新增检查项:
- `response.ok` 检查 - 确保HTTP成功
- `finish_reason` 检查 - 检测是否被 "length" 限制截断
- 空内容检查 - 防止崩溃
- 详细的调试日志 - 记录解析失败的上下文

### 4. JSON 清理逻辑改进
**支持的格式:**
- 标准JSON: `{"key": "value"}`
- markdown包装: ` ```json\n{"key": "value"}\n``` `
- 混合格式: ` ```\n{"key": "value"}\n``` `

## 文件修改详情

### game.js 主要改动

#### 常量定义 (L394-399)
```javascript
const API_CONFIG = {
    ENDPOINT: 'https://api.deepseek.com/chat/completions',
    MODEL: 'deepseek-chat',
    METHOD: 'POST'
};
```

#### 工具函数 (L401-484)
1. `cleanAndParseJSON(rawContent)` - L401-435
2. `getDeepseekHeaders()` - L437-443
3. `callDeepseekAPI(messages, useJsonFormat, maxTokens)` - L445-484

#### 函数修改
1. `callAI()` - L550-624
   - 使用: `callDeepseekAPI([...], true, 2000)`
   
2. `callNightlyReviewAI()` - L823-836
   - 使用: `callDeepseekAPI([...], false, 800)`

## 预期效果

✅ 消除3个相关错误
✅ 统一的错误处理
✅ 更高的可靠性（更高的max_tokens）
✅ 更好的调试能力（详细日志）
✅ 代码质量改善（消除重复，单一职责）
✅ 易于维护（API配置集中）

## 测试清单

- [ ] 正常时段调用AI生成日常行为
- [ ] 夜晚关系结算AI调用
- [ ] 节假日特殊场景处理
- [ ] API超时/错误处理
- [ ] 响应被截断时的降级处理
