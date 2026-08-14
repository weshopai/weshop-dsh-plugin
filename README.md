# WeShop 2.0 for DeepSeek Harness

English | [简体中文](README.zh-CN.md)

WeShop 2.0 is an AI visual workspace for e-commerce creation inside [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness). Select products, models, or reference images on an infinite canvas, describe the desired result in natural language, and use WeShop OpenAPI to create product photography, virtual try-on, background replacement, image edits, and video assets without leaving the conversation.

> [!IMPORTANT]
> **Install and successfully run DeepSeek Harness before installing this plugin.** This repository is a Harness plugin, not a standalone application.

## Highlights

- Native Cordis Host and browser plugin; no MCP child process.
- Infinite canvas with marquee multi-selection, grouped movement, undo, download, delete, zoom, and pan tools.
- Synchronized Harness conversation with `@` references for selected canvas items.
- Bundled `weshop-canvas` agent preset and WeShop Skills.
- Automatic publication of generated images, video, audio, and text to the canvas.
- Secure API Key configuration in the canvas or through `WESHOP_API_KEY`.
- Chinese and English interface with automatic locale detection and manual switching.
- Portable `.tgz` package for installation on another Harness machine.

## Prerequisites: install Harness first

Install Node.js, then start the official Harness Web UI once:

```bash
npx @deepseek-ai/dsh web
```

Harness should open at `http://127.0.0.1:3080`. Stop it before changing the Web profile.

Alternatively, follow the official [DeepSeek Harness source installation instructions](https://github.com/deepseek-ai/deepseek-harness#run).

## Install the WeShop plugin

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

This creates a versioned file such as `weshop-dsh-weshop-2-0-0.1.14.tgz`.

### 2. Install it into the Harness Web profile

```bash
PLUGIN_TARBALL="/absolute/path/to/weshop-dsh-weshop-2-0-0.1.14.tgz"
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

If an older `@weshop/dsh-canvas` plugin is installed, remove it from dependencies and bundles before continuing. Running both implementations can cause duplicate canvas or `shell.overlay` loader errors.

### 3. Restart Harness

```bash
npx @deepseek-ai/dsh web
```

Create or open a task using the **WeShop Canvas** preset. The plugin installs its bundled preset on first activation.

## Configure WeShop OpenAPI

Open the canvas and select **Configure API Key** in the top bar. The key is saved by the local Harness Host with restricted file permissions and is never returned to the browser, canvas state, or model.

You may instead provide the key before starting Harness:

```bash
export WESHOP_API_KEY="your-key"
npx @deepseek-ai/dsh web
```

Get a key from [WeShop OpenAPI](https://open.weshop.ai/authorization/apikey).

## Development

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm pack --dry-run
```

Package entry points and runtime contributions:

- `lib/index.js`: Cordis Host plugin, tools, Skills, routes, and private configuration.
- `lib/client.js`: browser canvas and synchronized conversation UI.
- `cordis.patch.yml`: bundle composition entry.
- `presets/weshop-canvas/`: bundled WeShop agent preset.
- `skills/`: bundled canvas and WeShop OpenAPI instructions.

## Portability and security

- The package contains compiled Host and browser entries, presets, Skills, and required assets.
- The target computer must already have a working Harness Web profile.
- API Keys and generated local assets are intentionally excluded from the package and must be configured on each machine.
- Canvas data is stored locally by the browser; it is not embedded in the installation archive.

## License

This software is source-available under the [PolyForm Noncommercial License 1.0.0](LICENSE). Personal, research, educational, charitable, and other noncommercial uses are permitted. Commercial use requires separate written permission from WeShop AI.

This is not an OSI-approved open-source license because it restricts commercial use.
