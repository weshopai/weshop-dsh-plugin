<div align="center">

# WeShop for DeepSeek Harness

**An AI visual workspace for e-commerce creation, built into DeepSeek Harness.**

[![License](https://img.shields.io/badge/license-PolyForm%20Noncommercial-7530FE.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.25-282828.svg)]()
[![Platform](https://img.shields.io/badge/platform-DeepSeek%20Harness%20plugin-282828.svg)]()
[![简体中文](https://img.shields.io/badge/Language-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-7530FE.svg)](./README.zh-CN.md)

Select products, models, or reference images on an infinite canvas.
Describe the result you want in natural language, and watch it appear right next to the conversation.

[Read the Chinese README](./README.zh-CN.md) · [Get a WeShop API Key](https://www.weshop.ai/apiKey) · [Contact us](mailto:hi@weshop.ai)

<img src="./assets/images/weshop_header_readme.png" alt="WeShop for DeepSeek Harness" width="100%" />

</div>

> [!IMPORTANT]
> **Install and successfully run DeepSeek Harness before installing this plugin.** This repository is a Harness plugin, not a standalone application.

## 📖 What is WeShop for DeepSeek Harness?

WeShop for DeepSeek Harness brings WeShop's e-commerce visual workspace directly into [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness), so creative work happens on the same infinite canvas as your conversation instead of a separate tool.

It is built for workflows like:

- Turning a product shot into a clean, on-brand main image or lifestyle scene
- Trying garments and accessories on a model with virtual try-on
- Swapping, extending, or cleaning up backgrounds without leaving the chat
- Batching photography, edits, and short video from a single natural-language brief

<img src="./assets/images/weshop_app_preview_readme.jpg" alt="WeShop canvas preview: a generated product image on an infinite canvas, synced with the Harness conversation" width="100%" />

## ✨ Highlights

- **🧩 Native plugin architecture**: Native Cordis Host and browser plugin; no MCP child process required.
- **🖼️ Infinite canvas**: Marquee multi-selection, grouped movement, undo, download, delete, zoom, and pan.
- **💬 Synchronized conversation**: Harness chat stays in sync with the canvas, with `@` references for selected items.
- **🤖 Bundled preset & Skills**: Ships with the `weshop-canvas` agent preset and WeShop Skills, ready on first use.
- **⚡ Automatic publishing**: Generated images, video, audio, and text land directly on the canvas — no manual download/re-upload.
- **🔐 Secure API Key handling**: Configure in the canvas or via `WESHOP_API_KEY`; the key never reaches browser state or the model.
- **🌐 Bilingual interface**: Chinese and English, with automatic locale detection and manual switching.
- **📦 Portable install**: Packages as a single `.tgz` for installation on any machine running Harness.

## 💡 Why WeShop?

| Pain Point (Traditional) | The WeShop Workspace |
| :--- | :--- |
| **Tool-switching**: product photos, edits, and video each live in a different app. | **One canvas**: photography, try-on, background replacement, edits, and video happen in the same space as your conversation. |
| **Manual round-trips**: generate somewhere else, then download and re-upload. | **Automatic publishing**: results are added straight to the canvas as soon as they're ready. |
| **Prompt-only workflows**: hard to point at *this* product or *this* reference image. | **Spatial selection**: select items on the canvas and reference them with `@` right in chat. |
| **Opaque key handling**: unclear where credentials are stored. | **Restricted local storage**: your API Key is saved by the local Harness Host and never returned to the browser or model. |

## 🚀 Getting Started

### Prerequisites: install Harness first

Install Node.js, then start the official Harness Web UI once:

```bash
npx @deepseek-ai/dsh web
```

Harness should open at `http://127.0.0.1:3080`. Stop it before changing the Web profile.

Alternatively, follow the official [DeepSeek Harness source installation instructions](https://github.com/deepseek-ai/deepseek-harness#run).

### 1. Build a portable package

Access to this private repository is required.

```bash
git clone git@github.com:weshopai/weshop-dsh-plugin.git
cd weshop-dsh-plugin
corepack enable
pnpm install --frozen-lockfile
pnpm build
pnpm pack
```

This creates a versioned file such as `weshop-dsh-weshop-2-0-0.1.25.tgz`.

### 2. Install it into the Harness Web profile

```bash
PLUGIN_TARBALL="/absolute/path/to/weshop-dsh-weshop-2-0-0.1.25.tgz"
cd ~/.dsh/profiles/web
pnpm add "$PLUGIN_TARBALL"
```

Open `~/.dsh/profiles/web/package.json` and append `@weshop/dsh-weshop-2-0` to `dsh.profile.bundles`. Preserve the bundles already installed by Harness:

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "@weshop/dsh-weshop-2-0"
      ]
    }
  }
}
```

> **⚠️ Upgrading from `@weshop/dsh-canvas`**
> If an older `@weshop/dsh-canvas` plugin is installed, remove it from dependencies and bundles before continuing. Running both implementations can cause duplicate canvas or `shell.overlay` loader errors.

### 3. Restart Harness

```bash
npx @deepseek-ai/dsh web
```

Create or open a task using the **WeShop Canvas** preset. WeShop for DeepSeek Harness installs its bundled preset on first activation.

## ⚙️ Configure WeShop OpenAPI

Open the canvas and select **Configure API Key** in the top bar. The key is saved by the local Harness Host with restricted file permissions and is never returned to the browser, canvas state, or model.

You may instead provide the key before starting Harness:

```bash
export WESHOP_API_KEY="your-key"
npx @deepseek-ai/dsh web
```

Get a key from [WeShop OpenAPI](https://www.weshop.ai/apiKey).

## 🏗️ Development

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm pack --dry-run
```

Package entry points and runtime contributions:

- `lib/index.js` — Cordis Host plugin, tools, Skills, routes, and private configuration.
- `lib/client.js` — browser canvas and synchronized conversation UI.
- `cordis.patch.yml` — bundle composition entry.
- `presets/weshop-canvas/` — bundled WeShop agent preset.
- `skills/` — bundled canvas and WeShop OpenAPI instructions.

## 🔒 Portability & Security

- The package contains compiled Host and browser entries, presets, Skills, and required assets.
- The target computer must already have a working Harness Web profile.
- API Keys and generated local assets are intentionally excluded from the package and must be configured on each machine.
- Canvas data is stored locally by the browser; it is not embedded in the installation archive.

## 🤝 Contact

For support, partnerships, or commercial licensing, email [hi@weshop.ai](mailto:hi@weshop.ai).

## 📄 License

This software is source-available under the [PolyForm Noncommercial License 1.0.0](LICENSE). Personal, research, educational, charitable, and other noncommercial uses are permitted. Commercial use requires separate written permission from WeShop AI.

This is not an OSI-approved open-source license because it restricts commercial use.

---

<div align="center">

<p>Built with ❤️ by the WeShop AI team.</p>

[![PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-7530FE.svg)](./LICENSE)

</div>
