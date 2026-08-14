# WeShop 2.0 for DeepSeek Harness

[English](README.md) | 简体中文

WeShop 2.0 是运行在 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) 内的 AI 电商视觉工作台。你可以在无限画布上选择商品、模特或参考图，通过自然语言描述目标，并调用 WeShop OpenAPI 完成商品摄影、虚拟试穿、背景替换、图片编辑和视频生成，全程无需离开当前对话。

> [!IMPORTANT]
> **安装本插件前，必须先安装并成功运行 DeepSeek Harness。** 本仓库是 Harness 插件，不是独立应用。

## 主要功能

- 原生 Cordis Host 与浏览器插件，无需启动 MCP 子进程。
- 无限画布，支持框选多选、整组移动、撤销、下载、删除、缩放和平移。
- 同步 Harness 对话，并通过 `@` 标签引用画布选中项。
- 内置 `weshop-canvas` Agent Preset 和 WeShop Skills。
- 自动把生成的图片、视频、音频和文字发布到画布。
- 可在画布内安全配置 API Key，也支持 `WESHOP_API_KEY` 环境变量。
- 中英文界面，自动识别系统语言并允许手动切换。
- 可以打包成 `.tgz`，迁移到其他已安装 Harness 的电脑。

## 前置步骤：先安装 Harness

安装 Node.js，然后至少成功启动一次官方 Harness Web UI：

```bash
npx @deepseek-ai/dsh web
```

Harness 默认打开在 `http://127.0.0.1:3080`。修改 Web profile 前，请先停止 Harness。

也可以按照官方的 [DeepSeek Harness 源码安装说明](https://github.com/deepseek-ai/deepseek-harness#run)进行安装。

## 安装 WeShop 插件

### 1. 构建可迁移安装包

克隆本 private 仓库需要相应的 GitHub 权限。

```bash
git clone git@github.com:weshopai/weshop-dsh-plugin.git
cd weshop-dsh-plugin
corepack enable
pnpm install --frozen-lockfile
pnpm build
pnpm pack
```

完成后会生成类似 `weshop-dsh-weshop-2-0-0.1.21.tgz` 的版本化文件。

### 2. 安装到 Harness Web profile

```bash
PLUGIN_TARBALL="/你的绝对路径/weshop-dsh-weshop-2-0-0.1.21.tgz"
cd ~/.dsh/profiles/web
pnpm add "$PLUGIN_TARBALL"
```

打开 `~/.dsh/profiles/web/package.json`，在 `dsh.profile.bundles` 中追加 `@weshop/dsh-weshop-2-0`。不要删除 Harness 已有的 bundle：

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

如果安装过旧版 `@weshop/dsh-canvas`，请先从 dependencies 和 bundles 中删除。新旧实现同时运行可能造成重复画布或 `shell.overlay` loader 报错。

### 3. 重启 Harness

```bash
npx @deepseek-ai/dsh web
```

新建或打开使用 **WeShop 画布模式** Preset 的任务。插件会在第一次启用时安装随包提供的 Preset。

## 配置 WeShop OpenAPI

打开画布，点击顶部的 **配置 API Key**。密钥由本机 Harness Host 使用受限文件权限保存，不会返回浏览器，也不会写入画布状态或发送给模型。

也可以在启动 Harness 前设置环境变量：

```bash
export WESHOP_API_KEY="你的密钥"
npx @deepseek-ai/dsh web
```

可以从 [WeShop OpenAPI](https://open.weshop.ai/authorization/apikey) 获取密钥。

## 开发与检查

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm pack --dry-run
```

主要入口与运行组件：

- `lib/index.js`：Cordis Host 插件、工具、Skills、HTTP routes 和私密配置。
- `lib/client.js`：浏览器画布与同步对话界面。
- `cordis.patch.yml`：Bundle composition 入口。
- `presets/weshop-canvas/`：内置 WeShop Agent Preset。
- `skills/`：画布与 WeShop OpenAPI Skills。

## 迁移与安全说明

- 安装包包含编译后的 Host、浏览器入口、Presets、Skills 和所需资源。
- 目标电脑必须先具备可正常运行的 Harness Web profile。
- API Key 和本地生成资源不会写入安装包，需要在每台电脑上单独配置。
- 画布数据保存在浏览器本地，不会嵌入插件安装包。

## 许可证

本软件采用 [PolyForm Noncommercial License 1.0.0](LICENSE) 以 source-available 方式提供。允许个人、研究、教育、慈善及其他非商业用途。商业使用必须另行取得 WeShop AI 的书面许可。

由于限制商业使用，本许可证不属于 OSI 认可的开源许可证。
