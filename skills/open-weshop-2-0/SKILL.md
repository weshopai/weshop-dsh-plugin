---
name: open-weshop-2-0
description: Use whenever the user asks to open, launch, show, or display weshop 2.0, weshop2.0, WeShop, or the weshop canvas workspace.
whenToUse: The user wants to see or enter the weshop 2.0 canvas workspace.
---

# Open weshop 2.0

The weshop 2.0 canvas is embedded in the DeepSeek Harness GUI as a full-screen canvas surface, backed by the Host and Client contributions of `@weshop/dsh-weshop-2-0`.

1. Confirm the `weshop2.0` Cordis row is enabled in the Web profile and the package is built.
2. The canvas opens by default; if it is hidden, tell the user to click the weshop icon in the sidebar footer (or say "open weshop 2.0" again).
3. Summarize what is on the canvas by calling `weshop_canvas_get_state`.
4. Do not start a separate server; the canvas state, actions, requests, progress, and assets are served by DSH itself under `/api/weshop/*`.

Reuse the mounted canvas; never open an external browser tab for it unless the user explicitly requests that.
