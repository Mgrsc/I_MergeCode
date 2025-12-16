# I_MergeCode v2 ✨

智能代码合并工具，提供实时Diff预览和AI代码合并功能，支持MorphLLM和Relace。

## 🎯 核心特性

- 🎨 **可视化Diff显示**：带行号的彩色内联变更展示
  - 🟢 绿色高亮新增内容
  - 🔴 红色高亮删除内容
  - 保留语法高亮的逐行对比
- 📋 **智能复制**：一键复制合并代码（无行号）
- 💾 **自动保存设置**：浏览器本地持久化存储所有配置
  - API Key（本地安全存储）
  - 服务商偏好
  - 模型选择
  - 自定义端点
- 🔄 **多服务商支持**：MorphLLM + Relace
- ⚡ **实时高效**：优化用于实时代码合并
- 🛡️ **可选限流**：月度请求限制控制使用量
- 🏗️ **现代化架构**：Next.js 16 + React 19 + TypeScript 5.9 + Tailwind CSS 4

## 🛠️ 支持的服务商

### MorphLLM
| 模型 | 速度 | 准确率 | 最佳场景 |
|------|------|--------|----------|
| `morph-v3-fast` | 10,500 tok/s | 96% | 实时编辑 |
| `morph-v3-large` | 2,500 tok/s | 98% | 生产代码 |
| `auto` | 动态 | ~98% | 自动选择 |

[获取API Key](https://morphllm.com/dashboard)

### Relace
| 模型 | 最佳场景 |
|------|----------|
| `auto` | 自动模型选择（推荐） |
| `relace-apply-2.5-lite` | 快速处理+良好准确率 |
| `relace-apply-2` | 最高准确率 |

[获取API Key](https://app.relace.ai/)

**Relace特性**：
- 专为代码合并优化的InstantApply API
- 支持可选指令提示
- Token使用追踪
- 高精度代码合并

## 🚀 快速开始

### 一键部署到Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/i-mergecode-v2)

1. 点击上方按钮或推送到GitHub
2. 在Vercel导入仓库
3. 直接部署（无需环境变量）

### 本地开发
```bash
# 安装依赖（推荐pnpm）
pnpm install

# 开发模式
pnpm dev
```
访问 [http://localhost:3000](http://localhost:3000)

### 生产构建
```bash
pnpm build
pnpm start
```

## 📖 使用指南

### 1. 配置设置
所有设置自动保存到浏览器localStorage：

- **API Key**：输入服务商API密钥（仅本地存储）
- **服务商**：选择MorphLLM或Relace
- **模型**：根据需求选择模型
- **自定义端点**（可选）：高级配置

### 2. 准备输入格式
**重要**：指导你的LLM按以下格式输出代码修改，添加到System Prompt：

````markdown
## 代码修改输出规范

**强制格式**：
- 仅输出两个标签：`<instruction>` 和 `<update>`，均用代码块包裹
- instruction：单句简洁英文描述
- update中：用 `// ... existing code ...` 占位未修改代码

**占位符规则**：
- 替换所有未变更代码行
- 保留函数签名和控制结构边界
- 修改点前后保留1-2行关键代码作上下文

**示例**：
```xml
<instruction>Add input parameter validation logic.</instruction>
```

```xml
<update>
function processData(input) {
    // ... existing code ...
  
    // 新增校验
    if (!input || typeof input !== 'object') {
        throw new Error('Invalid input');
    }
  
    // ... existing code ...
    return result;
}
</update>
```
简要说明：xxx
````

### 3. 应用变更
LLM生成修改后：

1. **更新代码**：粘贴`<update>`标签中的代码
2. **原始代码**：粘贴你的原始代码
3. **指令**（可选）：粘贴`<instruction>`标签内容
4. 点击 **"应用变更"** 完成！

### 4. 查看结果
- **可视化Diff**：彩色高亮精确变更
- **行号追踪**：逐行变更定位
- **Token统计**：监控API消耗
- **智能复制**：一键复制纯净结果

## 🏗️ 项目结构

```
├── app/
│   ├── api/apply/         # AI合并API端点
│   ├── globals.css        # Tailwind+自定义样式 (30行)
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页 (99行)
├── components/            # React组件 (10个)
│   ├── config/           # 配置面板
│   ├── diff/             # Diff查看器
│   ├── editors/          # 代码编辑器
│   ├── layout/           # 布局组件
│   └── ui/               # UI组件 (弹窗、Toast)
├── hooks/                # 自定义Hook (5个)
│   ├── useCodeEditor.ts
│   ├── useApiConfig.ts
│   ├── useCopyToClipboard.ts
│   ├── useDiffCalculator.ts
│   └── useAIMerge.ts
├── lib/                  # 工具库
│   ├── diff-utils.ts     # Diff计算
│   ├── morphllm.ts       # MorphLLM集成
│   ├── relace.ts         # Relace集成
│   └── rateLimit.ts      # 限流
└── types/                # TypeScript类型定义
```

## ⚙️ 环境变量（可选）

参考 `.env.example`：
```
NEXT_PUBLIC_DEFAULT_API_KEY=your_api_key
NEXT_PUBLIC_DEFAULT_PROVIDER=morphllm
NEXT_PUBLIC_DEFAULT_MODEL=morph-v3-fast
NEXT_PUBLIC_CUSTOM_ENDPOINT=
```

## 📄 许可证

[MIT License](LICENSE) © 2024

---

**⭐ 喜欢就点个Star！** 欢迎贡献代码和反馈 ✨
