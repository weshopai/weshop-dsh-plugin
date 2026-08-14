---
name: open-weshop-2-0
description: Use whenever the user asks to open, launch, show, or display WeShop for DeepSeek Harness or the WeShop canvas workspace.
whenToUse: The user wants to see or enter the WeShop for DeepSeek Harness canvas workspace.
---

# Open WeShop for DeepSeek Harness

The WeShop for DeepSeek Harness canvas is embedded in the DeepSeek Harness GUI as a full-screen canvas surface, backed by the Host and Client contributions of `weshop-dsh-plugin`.

1. Confirm the `weshop` Cordis row is enabled in the Web profile and the package is built.
2. If the canvas is hidden, tell the user to click the WeShop icon in the sidebar footer (or say "open WeShop" again).
3. Summarize what is on the canvas by calling `weshop_canvas_get_state`.
4. Do not start a separate server; the canvas state, actions, requests, progress, and assets are served by DSH itself under `/api/weshop/*`.

Reuse the mounted canvas; never open an external browser tab for it unless the user explicitly requests that.
