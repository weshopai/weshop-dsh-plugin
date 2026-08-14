<div align="center">

# WeShop for DeepSeek Harness

**内置于 DeepSeek Harness 的 AI 电商视觉工作台。**

[![License](https://img.shields.io/badge/license-MIT-2ea44f.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.1-282828.svg)]()
[![Platform](https://img.shields.io/badge/platform-DeepSeek%20Harness%20plugin-282828.svg)]()
[![English](https://img.shields.io/badge/Language-English-7530FE.svg)](./README.md)

在无限画布上选择商品、模特或参考图。

用自然语言描述你想要的效果，结果会直接出现在对话旁边。

[Read the English README](./README.md) · [获取 WeShop API Key](https://www.weshop.ai/apiKey) · [联系我们](mailto:hi@weshop.ai)

<img src="./assets/images/weshop_header_readme.png" alt="WeShop for DeepSeek Harness" width="100%" />

</div>

> [!IMPORTANT]
> **安装本插件前，必须先安装并成功运行 DeepSeek Harness。** 本仓库是 Harness 插件，不是独立应用。

## 📖 什么是 WeShop for DeepSeek Harness？

WeShop for DeepSeek Harness 把 WeShop 的电商视觉工作台直接接入 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)，创作过程和对话共享同一张无限画布，而不是切换到另一个独立工具。

它尤其适合这样的场景：

- 把一张商品图直接生成为干净、符合品牌调性的主图或场景图
- 用虚拟试穿快速看到服装或配饰上身效果
- 在对话内直接替换、扩展或清理背景，无需跳出
- 用一句自然语言描述，批量生成商品摄影图、编辑图和短视频

<img src="./assets/images/weshop_app_preview_readme.jpg" alt="WeShop 画布预览：在无限画布上生成的商品图，与 Harness 对话保持同步" width="100%" />

## ✨ 主要功能

- **🧩 原生插件架构**：原生 Cordis Host 与浏览器插件，无需启动 MCP 子进程。
- **🖼️ 无限画布**：支持框选多选、整组移动、撤销、下载、删除、缩放和平移。
- **💬 同步对话**：Harness 对话与画布实时同步，可通过 `@` 标签引用选中项。
- **🤖 内置 Preset 与 Skills**：随插件安装 `weshop-canvas` Agent Preset 和 WeShop Skills，开箱即用。
- **⚡ 自动发布**：生成的图片、视频、音频和文字自动发布到画布，无需手动下载再上传。
- **🔐 安全的 API Key 管理**：可在画布内配置，也支持 `WESHOP_API_KEY` 环境变量；密钥不会流向浏览器状态或模型。
- **🌐 中英双语界面**：自动识别系统语言，同时支持手动切换。
- **📦 可迁移安装**：打包为单个 `.tgz`，可安装到任意已运行 Harness 的电脑。

## 💡 为什么选择 WeShop？

| 痛点（传统模式） | WeShop 工作台 |
| :--- | :--- |
| **来回切换工具**：商品图、编辑图和视频要分别在不同应用里完成。 | **同一张画布**：摄影、试穿、换背景、编辑和视频都发生在对话所在的同一空间里。 |
| **手动来回搬运**：在别处生成后，还要下载再重新上传。 | **自动发布**：结果一生成就直接出现在画布上。 |
| **只能靠文字描述**：很难精确指向“这张商品图”或“这张参考图”。 | **空间化选择**：在画布上选中素材，直接用 `@` 在对话里引用。 |
| **密钥管理不透明**：不清楚凭证保存在哪里。 | **本地受限存储**：API Key 由本机 Harness Host 保存，不会返回浏览器或模型。 |

## 🚀 快速上手

### 开始前

安装 Node.js，然后至少成功启动一次官方 Harness Web UI：

```bash
npx @deepseek-ai/dsh web
```

Harness 默认打开在 `http://127.0.0.1:3080`。看到页面后即可先关闭 Harness，再继续下面的步骤。

也可以按照官方的 [DeepSeek Harness 源码安装说明](https://github.com/deepseek-ai/deepseek-harness#run)进行安装。

### 首次安装

关闭 Harness 后，只需运行一条命令：

```bash
npx weshop-dsh-plugin setup
```

安装器会将 WeShop 安装到 Harness Web profile、启用 bundle，并在发现旧版 WeShop 时自动迁移。无需 GitHub 账号、access token，也不需要手动改文件。

然后重启 Harness：

```bash
npx @deepseek-ai/dsh web
```

新建或打开一个任务，选择 **WeShop 画布模式** Preset。首次启用时会自动安装该 Preset。

### 更新 WeShop

最简单的更新方式是关闭 Harness 后运行：

```bash
npx weshop-dsh-plugin setup
```

如果已安装公开 npm 版，也可以运行：

```bash
cd ~/.dsh/profiles/web
pnpm update weshop-dsh-plugin
```

> **此前安装过旧版？**
> 如果此前通过 `.tgz` 安装过，或使用的是 `@weshop/dsh-canvas`、`@weshop/dsh-weshop-2-0`、`@weshopai/dsh-weshop-2-0`，首次运行一次 `npx weshop-dsh-plugin setup` 即可。它会自动替换旧包和 bundle 配置；之后即可使用上面的任一更新方式。

### 高级用法：构建可迁移安装包

克隆本 private 仓库需要相应的 GitHub 权限。

```bash
git clone git@github.com:weshopai/weshop-dsh-plugin.git
cd weshop-dsh-plugin
corepack enable
pnpm install --frozen-lockfile
pnpm build
pnpm pack
```

完成后会生成类似 `weshop-dsh-plugin-1.0.1.tgz` 的版本化文件。

安装到 Harness Web profile：

```bash
PLUGIN_TARBALL="/你的绝对路径/weshop-dsh-plugin-1.0.1.tgz"
cd ~/.dsh/profiles/web
pnpm add "$PLUGIN_TARBALL"
```

## ⚙️ 配置 WeShop OpenAPI

打开画布，点击顶部的 **配置 API Key**。密钥由本机 Harness Host 使用受限文件权限保存，不会返回浏览器，也不会写入画布状态或发送给模型。

也可以在启动 Harness 前设置环境变量：

```bash
export WESHOP_API_KEY="你的密钥"
npx @deepseek-ai/dsh web
```

可以从 [WeShop OpenAPI](https://www.weshop.ai/apiKey) 获取密钥。

## 🏗️ 开发与检查

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm pack --dry-run
```

主要入口与运行组件：

- `lib/index.js` — Cordis Host 插件、工具、Skills、HTTP routes 和私密配置。
- `lib/client.js` — 浏览器画布与同步对话界面。
- `cordis.patch.yml` — Bundle composition 入口。
- `presets/weshop-canvas/` — 内置 WeShop Agent Preset。
- `skills/` — 画布与 WeShop OpenAPI Skills。

## 🔒 迁移与安全说明

- 安装包包含编译后的 Host、浏览器入口、Presets、Skills 和所需资源。
- 目标电脑必须先具备可正常运行的 Harness Web profile。
- API Key 和本地生成资源不会写入安装包，需要在每台电脑上单独配置。
- 画布数据保存在浏览器本地，不会嵌入插件安装包。

## 🤝 联系方式

支持或合作请联系 [hi@weshop.ai](mailto:hi@weshop.ai)。

## 📄 许可证

本软件采用 [MIT License](LICENSE) 发布。

---

<div align="center">

<p>由 WeShop AI 团队倾注 ❤️ 打造。</p>

[![MIT License](https://img.shields.io/badge/License-MIT-2ea44f.svg)](./LICENSE)

</div>
