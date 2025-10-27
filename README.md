# I_MergeCode

🚀 I_MergeCode intelligent code merging tool can accurately and quickly merge code changes from Large Language Models (LLM), reducing costly large model outputs.

## ✨ Features

- 🎨 **Visual Diff Display**: Color-coded inline changes with line numbers
  - 🟢 Green highlights for additions
  - 🔴 Red highlights for deletions
  - Line-by-line comparison with syntax preservation
- 📋 **Smart Copy**: Copy merged code without line numbers
- 💾 **Auto-Save Settings**: All configurations persist in browser
  - API Key (securely stored locally)
  - Provider preference
  - Model selection
  - Custom endpoints
- 🔄 **Multiple Providers**: Support for MorphLLM and Relace
- ⚡ **Fast & Accurate**: Optimized for real-time code merging
- 🛡️ **Optional Rate Limiting**: Monthly request limits for controlled usage

## Supported Providers

### MorphLLM

| Model | Speed | Accuracy | Best For |
|-------|-------|----------|----------|
| morph-v3-fast | 10,500 tok/s | 96% | Real-time editing |
| morph-v3-large | 2,500 tok/s | 98% | Production code |
| auto | Variable | ~98% | Automatic selection |

Get your API key at [MorphLLM Dashboard](https://morphllm.com/dashboard)

### Relace

| Model | Best For |
|-------|----------|
| auto | Automatic model selection (recommended) |
| relace-apply-2.5-lite | Fast processing with good accuracy |
| relace-apply-2 | Maximum accuracy |

Relace provides specialized code merging capabilities using their InstantApply API. Get your API key at [Relace Dashboard](https://app.relace.ai/)

**Features:**
- Direct code apply API (optimized for code merging)
- Support for optional instruction hints
- Token usage tracking
- High accuracy code merging

## Quick Start

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or push to GitHub
2. Import your repository in Vercel
3. Deploy (no environment variables needed)

### Local Development

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1. Configure Settings

All settings are automatically saved in your browser:

- **API Key**: Enter your provider API key (stored locally, never sent to our servers)
- **Provider**: Choose between MorphLLM or Relace
- **Model**: Select the appropriate model for your needs
- **Custom Endpoint** (optional): For advanced configurations

### 2. Prepare Your Input

Instruct your LLM to generate code modifications in a format optimized for quick application. Add the following specification to your LLM's system prompt:

````markdown
## Code Modification Output Specification

**Mandatory Format**:
- Only output two tags: `<instruction>` and `<update>`, both wrapped in code blocks. If there are code blocks inside, the outer ``` count must be greater than the inner count.
- The instruction should be a single, concise, and clear English description.
- In the update, use `// ... existing code ...` as a placeholder for all unmodified code.

**Placeholder Rules**:
- Replace all unchanged lines of code.
- Preserve function signatures and control structure boundaries.
- Keep 1-2 lines of key code before and after the modification point for context.

**Example**:
```xml
<instruction>Add input parameter validation logic.</instruction>
```

```xml
<update>
function processData(input) {
    // ... existing code ...

    // New validation
    if (!input || typeof input !== 'object') {
        throw new Error('Invalid input');
    }

    // ... existing code ...
    return result;
}
</update>
```
Brief description: xxxx
````

**💡 Tip**: This format ensures your LLM outputs clean, mergeable code changes that can be directly applied.

### 3. Apply Changes

Once your LLM generates the code modification:

1. **Update Code \***: Paste the code from the `<update>` XML tag
2. **Original Code \***: Paste your original/existing code
3. **Instruction (Optional)**: Paste the content from the `<instruction>` XML tag
4. Click **"Apply Changes"** and you're done!

### 4. Review Output

- **Visual Diff**: See exactly what changed with color-coded highlights
- **Line Numbers**: Track changes line-by-line
- **Token Usage**: Monitor API consumption
- **Smart Copy**: One-click copy without line numbers

## Environment Variables

Optional configuration (see `.env.example`):

## License

MIT
