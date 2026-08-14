# Native DeepSeek Harness plugin

This package mounts WeShop as one native Cordis plugin with four contributions:

- Host HTTP routes under `/api/weshop/*`.
- Native `ctx.tools` registrations for canvas and WeShop OpenAPI operations.
- Bundled `ctx.skills` registrations for opening and operating the canvas.
- A packaged `weshop-canvas` agent preset, installed on first activation and migrated from the known MCP-era preset with a backup.
- A browser client plugin for the canvas overlay and sidebar action.

It does not launch an MCP child process. Cordis owns every registration and removes it when the plugin unloads.

The browser contribution does not open when the preset is selected. It keeps the normal conversation visible while generation runs, then opens the canvas after a native publish-result action succeeds. The preset-only footer button can open it manually.

## Build

```bash
pnpm install
pnpm build
```

Install `@weshop/dsh-weshop-2-0` as a file dependency in a DSH Web profile, then insert the package as a single Cordis row. Set `WESHOP_API_KEY` in the Harness environment for generation tools.
