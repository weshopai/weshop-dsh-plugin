---
name: weshop-openapi
description: Use for WeShop image and video generation, editing, and transformation tasks — virtual try-on, model swap, background replace, pose change, canvas expand, background removal, AI video generation, product/photo generation, and more.
whenToUse: The user asks to generate, edit, transform, or animate canvas content with WeShop.
---

# WeShop OpenAPI

## Mandatory per-turn gate

For **every new user turn** that asks to generate, edit, transform, upscale, or animate content, this Skill must be invoked through the Skill tool before any WeShop generation call. Invoke it again even if it was already used earlier in the conversation, and again after context compaction, retry, or handoff. Reading this file or the package README with filesystem/Bash does not replace invoking the Skill.

Use the recipes in this Skill as the source of truth. Do not search the package source or the web for parameters already documented here.

WeShop generation runs server-side through the native Cordis tools (`weshop_generate_run` / `weshop_get_run`). The `WESHOP_API_KEY` lives in the Harness host process — never echo it, never put it in a tool argument or a canvas provenance record, and never send it anywhere other than `https://openapi.weshop.ai/openapi/*`. If the key is missing, stop before any API request and direct the user to https://open.weshop.ai/authorization/apikey.

## Workflow

1. Read the canvas (`weshop_canvas_get_state`) and use the selected `material` item as the source. Use its `asset.localPath` when available, else its `asset.url`.
2. Choose the agent and version from the table below; read that agent's parameter notes.
3. Call `weshop_generate_run` with `{ agent, originalImage?, referenceImages?, taskName?, params, wait: true }`. Use `originalImage` for agents documented with one legacy source image. Use `referenceImages` for agents documented with `images`; local paths are uploaded and copied to both `input.images` and `params.images` automatically. Result URLs come back in `data.executions[*].result[*].image` (image agents) or `*.video` / `*.videoPoster` (video agents).
4. On success, publish each returned remote URL directly with `weshop_canvas_publish_result` (images) or `weshop_canvas_publish_asset` (video/audio). Do not download the generated file first. Include complete provenance (`method`, `agent`, `version`, `executionId`, `prompt`/`taskName`, `sourceItemIds`, returned URL, completion time). A local path is supported only when the generating tool genuinely returns a local-only file. Never overwrite or reclassify the source material item.
5. If the run fails or times out, report the API error and offer to retry (the error envelope's `retryable` flag signals whether a retry is worthwhile).

## Agents (all `v1.0`)

| Agent | Use when | Required params (plus `batchCount` 1–16 optional) |
| --- | --- | --- |
| `aimodel` | Fashion model photos — replace model/scene, keep garment | `generatedContent` (`freeCreation`/`referToOrigin`), `maskType` (`autoApparelSegment`, `autoUpperApparelSegment`, `autoLowerApparelSegment`, `autoSubjectSegment`, `autoHumanSegment`, `inverseAutoHumanSegment`, `custom`); one of `textDescription`/`locationId`/`fashionModelId`; optional `negTextDescription`, `pose`, `customMaskUrl` |
| `aiproduct` | Product still-life — replace/enhance background | `generatedContent`, `maskType` (`autoSubjectSegment`/`custom`); one of `textDescription`/`locationId`; optional `negTextDescription`, `customMaskUrl` |
| `aipose` | Change pose, keep garment | `textDescription` (pose instruction); optional `generateVersion` (`lite` default/`pro`) |
| `expandimage` | Expand canvas, AI fills new area | `targetWidth`, `targetHeight` (max 4096); optional `fillLeft`, `fillTop` (default centered) |
| `removeBG` | Remove/replace background | `maskType` (`autoSubjectSegment`/`custom`); optional `backgroundHex` or `backgroundId` (omit both → transparent), `customMaskUrl` |
| `virtualtryon` | Try a garment on a model | `generateVersion` (`weshopFlash`/`weshopPro`/`bananaPro`), `descriptionType` (`custom`/`auto`); `textDescription` required when `custom` ('Figure 1'=garment, 'Figure 2'=model, 'Figure 3'=background); optional `aspectRatio`, `imageSize` (bananaPro: `1K`/`2K`/`4K`), model/background reference images |
| `gpt-image` | High-quality generation or reference-image editing with GPT Image 2 | `textDescription`, `aspectRatio` (`auto`, `1:1`, `2:3`, `3:2`, `4:3`, `3:4`, `16:9`, `9:16`, `21:9`; default `3:4`), `imageSize` (`1K`/`2K`/`4K`; default `1K`), `quality` (`low`/`medium`/`high`; default `low`); optional `batchCount`; pass 0–5 source images via top-level `referenceImages`, **not** `originalImage` |

Other common agents: `seedream`, `nano-banana-edit`, `midjourney`, `z-image`, `qwen-image-edit`, `firered-image-edit` (image); `kling`, `seedance`, `veo-ai`, `vidu-ai`, `wan-ai`, `grok-imagine-video`, `hailuo-ai`, `sora-2` (video). When in doubt about an agent's parameters, prefer a documented agent in this table or ask one targeted question rather than guessing.

### `gpt-image` recipes

Text-to-image (no source image):

```json
{
  "agent": "gpt-image",
  "version": "v1.0",
  "params": {
    "textDescription": "Describe the desired image precisely",
    "aspectRatio": "3:4",
    "imageSize": "1K",
    "quality": "low",
    "batchCount": 1
  },
  "wait": true
}
```

Edit from selected canvas images: use the same payload and add `"referenceImages": ["<selected localPath or URL>"]` (up to 5). Describe what must change and what must remain unchanged in `textDescription`.

## Notes

- `maskType` = protected region: content inside the mask stays unchanged; everything outside is regenerated. `custom` requires `customMaskUrl` (public PNG URL) or `customMask` (base64 PNG without the `data:image/png;base64,` prefix); dimensions should match the source.
- `generatedContent`: `freeCreation` = freer generation; `referToOrigin` = stay close to the source.
- `batchCount` default is `1`; set it explicitly for more variants.
- Polling is handled by the tool (`wait: true`); set `wait: false` for long video runs and poll with `weshop_get_run`.
