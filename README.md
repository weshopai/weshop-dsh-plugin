# Native DeepSeek Harness plugin

This package mounts WeShop as one native Cordis plugin with four contributions:

- Host HTTP routes under `/api/weshop/*`.
- Native `ctx.tools` registrations for canvas and WeShop OpenAPI operations.
- Bundled `ctx.skills` registrations for opening and operating the canvas.
- A packaged `weshop-canvas` agent preset, installed on first activation and migrated from the known MCP-era preset with a backup.
- A browser client plugin for the canvas overlay and sidebar action.

It does not launch an MCP child process. Cordis owns every registration and removes it when the plugin unloads.

The browser contribution does not open when the preset is selected. It keeps the normal Harness conversation visible while generation runs, then opens a full-screen canvas studio after a native publish-result action succeeds. The studio includes a compact live view of the same Harness session, can send prompts back into it, and answers its pending question and approval interactions. The preset-only footer button can open it manually.

Remote generation URLs are published directly into the canvas. Local asset copying remains available only for local-only tool outputs and user uploads. Selected canvas assets can be downloaded or deleted from the floating action bar.

Canvas item mutations keep an in-memory undo history. Users can undo from the top bar or with Command/Ctrl+Z; keyboard deletion is disabled while any text-editing control has focus.

## Build

```bash
pnpm install
pnpm build
```

Install `@weshop/dsh-weshop-2-0` as a file dependency in a DSH Web profile, then insert the package as a single Cordis row. Set `WESHOP_API_KEY` in the Harness environment for generation tools.
