---
name: inspect-weshop-canvas
description: Read, generate for, edit, and operate the current weshop 2.0 canvas. Use whenever the user asks about canvas materials/results or asks the agent to generate, upscale, transform, reverse-prompt, or locally edit an image for the canvas. All generated outputs must be published automatically with weshop_canvas_publish_result; never use the webpage Add button.
whenToUse: The user asks about canvas contents, the selected image, materials/results, or wants generation/edit/upscale/reverse-prompt/local-edit on canvas content.
---

# Inspect weshop Canvas

## Non-negotiable insertion rule

- `Add` in the canvas is exclusively a human-facing material importer. Never use browser automation to insert a generated output through it.
- Every successful image MUST be inserted with `weshop_canvas_publish_result`. Publish generated video, audio, or text with `weshop_canvas_publish_asset` and the matching `mediaType` before replying that the task is complete.
- Publishing the result is part of generation completion, not an optional follow-up step. Do not ask the user to add it manually.
- If publishing fails, report the failure and retry the canvas tool; do not fall back to the webpage `Add` button.

## Visible execution progress

Use `weshop_canvas_report_progress` at meaningful transitions so the canvas exposes concise, verifiable status — not private chain-of-thought. Set one stable `startedAt` timestamp for the task and include a monotonic `percent`:

1. `interpreting` (~8%): one-sentence understanding plus `outputPlan`.
2. `researching` (~12–20%, only when required): report the platform/market/source focus.
3. `planning` (~22%): selected WeShop commercial workflow or model and why it fits.
4. `prompt-ready` (~32%): set `promptStatus` to "已完成"; summarize the prompt constraints.
5. `generating` (35–85%): report the active model and expected output count.
6. `publishing` (~92%): report that completed files are being added automatically.
7. `complete` (100%) or `error`: report the concrete outcome.

Do not emit updates for every API poll. Keep progress useful and sparse.

- Call `weshop_canvas_get_state` before reasoning about the full canvas.
- Call `weshop_canvas_get_selection` when the user says "this", "these", "selected", or otherwise refers to the active selection. Always inspect `selectedItemIds` and `selectedItems`; they contain the complete multi-selection. The singular fields are compatibility aliases for the primary/last-selected item only.
- Treat `kind: material` as source/reference input and `kind: result` as generated output.
- Use each item's `provenance` to explain how it entered the canvas. Do not infer missing provenance.
- If `connected` is false, ask the user to open weshop 2.0 first.
- Call `weshop_canvas_get_requests` when the user asks to handle an operation submitted from the canvas right-click menu.

## Canvas context-menu requests

- `reverse-prompt`: inspect the request image, infer a detailed reusable prompt, report it in the conversation, then call `weshop_canvas_complete_request` with the prompt as the summary.
- `upscale`: run the most suitable image enhancement/upscale capability (see the `weshop-openapi` skill), publish the output with `weshop_canvas_publish_result`, then complete the request.
- `local-edit`: use the request's edit instruction and source image; preserve the source item, publish the edited output as a new result, then complete the request.
- Never complete a request until its analysis or generation has actually finished.

## WeShop OpenAPI workflow

When the user asks to generate, edit, transform, or animate canvas content:

1. Read the canvas state and current selection first.
2. Treat all selected `material` items as candidate API inputs, preserving their order from `selectedItems`. For agents supporting multiple reference images, pass the complete compatible selection. Do not use unrelated results unless the user requests them.
3. Load the `weshop-openapi` skill and follow its workflow. It owns intent compilation, endpoint selection, uploads, request parameters, polling, and API-key handling.
4. If the WeShop API key is unavailable, stop before any API request and direct the user to https://open.weshop.ai/authorization/apikey.
5. Preserve output provenance for canvas insertion: WeShop agent name/version, execution ID, source canvas item IDs, task name or prompt, creation time, and returned asset URL.
6. Classify generated outputs as `result`; never overwrite or reclassify their source `material` items.
7. After a successful generation, publish the matching asset type directly from the returned URL so it appears automatically: images use `weshop_canvas_publish_result`; video/audio/text use `weshop_canvas_publish_asset`. Do not download remote results first; use a local path only for a genuinely local-only output. Never use `Add` for this.
8. Put complete creation lineage in `provenance`: `method`, WeShop `agent` and `version`, `executionId`, `prompt` or `taskName`, `sourceItemIds`, returned URL, and completion timestamp.

## Pure plugin boundary

- The weshop canvas is a canvas-only surface inside the DeepSeek Harness GUI and does not embed a separate chat.
- Read canvas state through the native tools, then converse with the user in the existing DeepSeek conversation.
- Never expose the WeShop API key to the browser; all WeShop requests run inside the Harness host process, and the key is supplied through the Harness environment.

The native Cordis plugin is the authority for canvas context. The `weshop-openapi` skill is the authority for WeShop generation behavior.
