/**
 * Native DeepSeek Harness tools for the WeShop canvas and OpenAPI.
 *
 * The tools register directly on ctx.tools. No MCP process or JSON-RPC bridge
 * is involved, and Cordis disposal unregisters every tool automatically.
 *
 * Environment:
 *   WESHOP_STATE_FILE / WESHOP_ACTIONS_FILE / WESHOP_REQUESTS_FILE /
 *   WESHOP_COMPLETIONS_FILE / WESHOP_PROGRESS_FILE / WESHOP_ASSET_DIR
 *   WESHOP_API_KEY / WESHOP_BASE_URL / WESHOP_POLL_INTERVAL_MS / WESHOP_POLL_MAX_MS
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const stateFile = process.env.WESHOP_STATE_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-state.json");
const actionFile = process.env.WESHOP_ACTIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-actions.jsonl");
const requestFile = process.env.WESHOP_REQUESTS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-requests.jsonl");
const completionFile = process.env.WESHOP_COMPLETIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-request-completions.jsonl");
const progressFile = process.env.WESHOP_PROGRESS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-progress.json");
let lastActionSequence = 0;
const nextActionSequence = () => (lastActionSequence = Math.max(Date.now(), lastActionSequence + 1));

/* ── WeShop OpenAPI (server-side; the key never leaves this process) ───────── */

const WESHOP_BASE_URL = process.env.WESHOP_BASE_URL || "https://openapi.weshop.ai/openapi";
let configuredApiKey = "";

export function setConfiguredApiKey(apiKey) {
  configuredApiKey = typeof apiKey === "string" ? apiKey.trim() : "";
}
const WESHOP_POLL_INTERVAL_MS = Number(process.env.WESHOP_POLL_INTERVAL_MS || 3000);
const WESHOP_POLL_MAX_MS = Number(process.env.WESHOP_POLL_MAX_MS || 600000);

/** Unified WeShop error envelope; throws with the API message. */
function weshopError(status, body) {
  const error = body?.error || {};
  return new Error(`WeShop API ${status} ${error.code || ""}: ${error.message || JSON.stringify(body).slice(0, 300)}`.trim());
}

async function weshopRequest(pathname, { method = "GET", jsonBody, form } = {}) {
  const apiKey = configuredApiKey || process.env.WESHOP_API_KEY || "";
  if (!apiKey) throw new Error("未配置 WeShop API Key。请按以下任一方式配置后再告诉我重试：\n1. 打开 WeShop 画布，点击顶部「配置 API Key」，填写 API Key；或\n2. 启动 Harness 前设置环境变量 WESHOP_API_KEY。");
  const headers = { Authorization: apiKey }; // raw key, no Bearer prefix
  let body;
  if (form) body = form;
  else if (jsonBody !== undefined) { headers["content-type"] = "application/json"; body = JSON.stringify(jsonBody); }
  const response = await fetch(`${WESHOP_BASE_URL}${pathname}`, { method, headers, body });
  const text = await response.text();
  let parsed;
  try { parsed = JSON.parse(text); } catch { parsed = {}; }
  if (!response.ok || parsed.success === false) throw weshopError(response.status, parsed);
  return parsed;
}

/** Upload a local image file; returns a reusable public URL. */
async function weshopUpload(localPath) {
  const { readFile } = await import("node:fs/promises");
  const bytes = await readFile(localPath);
  const ext = path.extname(localPath).toLowerCase();
  const type = ({ ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif" })[ext] || "application/octet-stream";
  const form = new FormData();
  form.append("image", new Blob([bytes], { type }), path.basename(localPath));
  const data = await weshopRequest("/agent/assets/images", { method: "POST", form });
  return data?.data?.image;
}

/** Poll one run until a terminal status or the time budget runs out. */
async function weshopPollRun(executionId) {
  const deadline = Date.now() + WESHOP_POLL_MAX_MS;
  for (;;) {
    const data = await weshopRequest(`/agent/runs/${encodeURIComponent(executionId)}`);
    const execution = data?.data?.executions?.at(-1);
    const status = execution?.status;
    if (status === "Success" || status === "Failed") return data;
    if (Date.now() + WESHOP_POLL_INTERVAL_MS > deadline) throw new Error(`WeShop run ${executionId} did not finish within ${WESHOP_POLL_MAX_MS}ms (last status: ${status || "unknown"})`);
    await new Promise((resolve) => setTimeout(resolve, WESHOP_POLL_INTERVAL_MS));
  }
}

async function resolveImageReference(value) {
  return /^https?:\/\//.test(value) ? value : weshopUpload(value);
}

/** Create a WeShop run. Local image references are uploaded automatically. */
async function weshopCreateRun(input) {
  const agent = { name: input.agent, version: input.version || "v1.0" };
  const runInput = { ...(input.taskName ? { taskName: input.taskName } : {}) };
  const params = { ...(input.params || {}) };
  if (input.originalImage) {
    const url = await resolveImageReference(input.originalImage);
    runInput.originalImage = url;
    params.originalImage = url;
  }
  if (input.referenceImages?.length) {
    const images = await Promise.all(input.referenceImages.map(resolveImageReference));
    runInput.images = images;
    params.images = images;
  }
  return weshopRequest("/agent/runs", { method: "POST", jsonBody: { agent, input: runInput, params } });
}

/* ── Canvas state / requests / progress ────────────────────────────────────── */

function readState() {
  if (!fs.existsSync(stateFile)) return { version: 1, connected: false, title: "Untitled space", items: [], selectedItemIds: [], selectedItems: [], selectedItemId: null, selectedItem: null };
  try { return { connected: true, ...JSON.parse(fs.readFileSync(stateFile, "utf8")) }; }
  catch { return { version: 1, connected: false, error: "Canvas state is unavailable", items: [], selectedItemIds: [], selectedItems: [], selectedItemId: null, selectedItem: null }; }
}

function writeProgress(progress) {
  let previous = {};
  try { if (fs.existsSync(progressFile)) previous = JSON.parse(fs.readFileSync(progressFile, "utf8")); } catch { /* Start a new progress record. */ }
  const value = { ...progress, ...(progress.startedAt ? {} : previous.startedAt ? { startedAt: previous.startedAt } : {}), updatedAt: new Date().toISOString() };
  fs.writeFileSync(progressFile, JSON.stringify(value, null, 2));
  return value;
}

function readRequests() {
  if (!fs.existsSync(requestFile)) return [];
  const completed = new Set();
  if (fs.existsSync(completionFile)) for (const line of fs.readFileSync(completionFile, "utf8").split("\n")) {
    try { if (line.trim()) completed.add(JSON.parse(line).requestId); } catch { /* Ignore malformed completion records. */ }
  }
  return fs.readFileSync(requestFile, "utf8").split("\n").flatMap((line) => {
    try { const request = JSON.parse(line); return completed.has(request.id) ? [] : [request]; } catch { return []; }
  });
}

const toolSchemas = [
  {
    name: "weshop_canvas_get_state",
    description: "Read the complete WeShop for DeepSeek Harness canvas, including every material and result, provenance, position, size, viewport, counts, canvases, and the full multi-selection in selectedItemIds/selectedItems.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "weshop_canvas_get_selection",
    description: "Read every item currently selected on the WeShop for DeepSeek Harness canvas. Use selectedItemIds/selectedItems for multi-selection; selectedItemId/selectedItem remain as the primary selection for compatibility.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "weshop_canvas_add_image",
    description: "Low-level canvas image insertion. For every generated, edited, transformed, or upscaled output, use weshop_canvas_publish_result instead.",
    inputSchema: {
      type: "object",
      required: ["kind", "title", "provenance"],
      properties: {
        kind: { type: "string", enum: ["material", "result"] },
        title: { type: "string" },
        localPath: { type: "string", description: "Absolute path to a local image file." },
        url: { type: "string", description: "HTTPS image URL. Prefer this for remote/generated results so the canvas can display it directly." },
        width: { type: "number", minimum: 120, maximum: 1200 },
        batchId: { type: "string", description: "Stable generation batch ID. Use the executionId for every output of one generation." },
        batchIndex: { type: "number", minimum: 0, description: "Zero-based output order within batchId." },
        provenance: { type: "object", description: "How the image was created, including method, prompt, sources, agent, executionId, and model when available.", additionalProperties: true },
      },
      anyOf: [{ required: ["localPath"] }, { required: ["url"] }],
      additionalProperties: false,
    },
  },
  {
    name: "weshop_canvas_publish_result",
    description: "MANDATORY final step for every successful WeShop generation, edit, transformation, or upscale. Publish returned HTTPS URLs directly; do not download remote results first. Automatically inserts the output into the live canvas as kind=result.",
    inputSchema: {
      type: "object",
      required: ["title", "provenance"],
      properties: {
        title: { type: "string" },
        localPath: { type: "string", description: "Absolute path only for a genuinely local-only generated image." },
        url: { type: "string", description: "Returned HTTPS image URL. Preferred for WeShop generation results." },
        width: { type: "number", minimum: 120, maximum: 1200 },
        batchId: { type: "string", description: "Stable generation batch ID. Use the executionId for every output of one generation." },
        batchIndex: { type: "number", minimum: 0, description: "Zero-based output order within batchId." },
        provenance: { type: "object", description: "Complete generation lineage including agent, executionId, prompt/task, and source item IDs.", additionalProperties: true },
      },
      anyOf: [{ required: ["localPath"] }, { required: ["url"] }],
      additionalProperties: false,
    },
  },
  {
    name: "weshop_canvas_publish_asset",
    description: "Publish any generated result to the live canvas. Prefer returned HTTPS URLs without downloading them first. Supports image, video, audio, and text; mandatory for non-image outputs.",
    inputSchema: {
      type: "object",
      required: ["mediaType", "title", "provenance"],
      properties: {
        mediaType: { type: "string", enum: ["image", "video", "audio", "text"] },
        title: { type: "string" },
        localPath: { type: "string" },
        url: { type: "string" },
        content: { type: "string", description: "Inline content, required for text when no file or URL is used." },
        width: { type: "number", minimum: 120, maximum: 1200 },
        batchId: { type: "string", description: "Stable generation batch ID. Use the executionId for every output of one generation." },
        batchIndex: { type: "number", minimum: 0, description: "Zero-based output order within batchId." },
        provenance: { type: "object", additionalProperties: true },
      },
      anyOf: [{ required: ["localPath"] }, { required: ["url"] }, { required: ["content"] }],
      additionalProperties: false,
    },
  },
  {
    name: "weshop_canvas_report_progress",
    description: "Report concise, user-visible execution progress to the canvas. Use at meaningful transitions: intent understood, model selected, prompt ready, generating, publishing, complete, or error. Report decisions and status, never hidden chain-of-thought.",
    inputSchema: {
      type: "object",
      required: ["stage", "label"],
      properties: {
        stage: { type: "string", enum: ["interpreting", "researching", "planning", "prompt-ready", "generating", "publishing", "complete", "error", "idle"] },
        label: { type: "string" },
        summary: { type: "string", description: "Short user-facing interpretation or status, not private reasoning." },
        model: { type: "string" },
        promptStatus: { type: "string" },
        outputPlan: { type: "string", description: "For example: 4 independent images × 1 pose." },
        percent: { type: "number", minimum: 0, maximum: 100 },
        startedAt: { type: "string", description: "ISO timestamp for elapsed-time display. Preserve the same value across one task." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "weshop_canvas_get_requests",
    description: "Read pending image operations submitted from the canvas context menu. For upscale and local-edit, use the weshop-openapi skill, publish with weshop_canvas_publish_result, then complete the request. For reverse-prompt, analyze the selected image and return the inferred prompt before completing it.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "weshop_canvas_complete_request",
    description: "Mark a canvas context-menu request complete after its result has been handled. Include a concise summary or the inferred prompt.",
    inputSchema: {
      type: "object",
      required: ["requestId", "summary"],
      properties: { requestId: { type: "string" }, summary: { type: "string" }, resultItemId: { type: "string" } },
      additionalProperties: false,
    },
  },
  {
    name: "weshop_generate_run",
    description: "Run a WeShop OpenAPI generation/editing task. MANDATORY: invoke the weshop-openapi Skill during the current user turn before calling this tool, even if it was invoked earlier in the conversation. The API key is handled server-side; never echo it. Use originalImage for legacy single-source agents; use referenceImages for agents such as gpt-image that accept params.images. Local paths upload automatically. After success, publish every output to the canvas.",
    inputSchema: {
      type: "object",
      required: ["agent", "params"],
      properties: {
        agent: { type: "string", description: "Agent name, e.g. aimodel, aiproduct, aipose, expandimage, removeBG, virtualtryon, seedream, gpt-image, midjourney, kling." },
        version: { type: "string", description: "Agent version; default v1.0." },
        originalImage: { type: "string", description: "Local absolute path (auto-uploaded) or https URL of the source image." },
        referenceImages: { type: "array", description: "Local absolute paths or HTTPS URLs for agents whose API uses input.images/params.images (for example gpt-image, up to 5). Local files upload automatically.", items: { type: "string" } },
        taskName: { type: "string", description: "Optional human-readable task label." },
        params: { type: "object", description: "Agent-specific run parameters (maskType, generatedContent, textDescription, batchCount, ...). See the weshop-openapi skill.", additionalProperties: true },
        wait: { type: "boolean", description: "Poll to completion and return final result URLs (default true). Set false to return the executionId immediately." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "weshop_get_run",
    description: "Poll one WeShop run by executionId and return its current or terminal status and result URLs.",
    inputSchema: {
      type: "object",
      required: ["executionId"],
      properties: { executionId: { type: "string" } },
      additionalProperties: false,
    },
  },
];

async function executeTool(name, input) {
    const state = readState();
    if (name === "weshop_canvas_get_state") return state;
    if (name === "weshop_canvas_get_selection") return { connected: state.connected, selectedItemIds: state.selectedItemIds || (state.selectedItemId ? [state.selectedItemId] : []), selectedItems: state.selectedItems || (state.selectedItem ? [state.selectedItem] : []), selectedItemId: state.selectedItemId || null, selectedItem: state.selectedItem || null };
    if (name === "weshop_canvas_report_progress") return { ok: true, progress: writeProgress(input) };
    if (name === "weshop_canvas_get_requests") return { connected: state.connected, requests: readRequests() };
    if (name === "weshop_canvas_complete_request") {
      const pending = readRequests();
      if (!pending.some((request) => request.id === input.requestId)) throw new Error("Unknown or completed request");
      const completion = { requestId: input.requestId, summary: input.summary, ...(input.resultItemId ? { resultItemId: input.resultItemId } : {}), completedAt: new Date().toISOString() };
      fs.appendFileSync(completionFile, `${JSON.stringify(completion)}\n`);
      return { ok: true, ...completion };
    }
    if (["weshop_canvas_add_image", "weshop_canvas_publish_result", "weshop_canvas_publish_asset"].includes(name)) {
      if (!input.localPath && !input.url && !input.content) throw new Error("localPath, url, or content is required");
      const publishingResult = name !== "weshop_canvas_add_image";
      const action = {
        sequence: nextActionSequence(),
        type: "add-asset",
        payload: {
          id: `${publishingResult ? "result" : (input.kind || "result")}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          kind: publishingResult ? "result" : (input.kind || "result"),
          mediaType: input.mediaType || "image",
          title: input.title || "Untitled result",
          ...(input.localPath ? { localPath: input.localPath } : {}),
          ...(input.url ? { url: input.url } : {}),
          ...(input.content ? { content: input.content } : {}),
          width: input.width || 460,
          ...(input.batchId ? { batchId: input.batchId } : {}),
          ...(Number.isFinite(input.batchIndex) ? { batchIndex: input.batchIndex } : {}),
          provenance: input.provenance || { method: "agent-generation" },
          createdAt: new Date().toISOString(),
        },
      };
      fs.appendFileSync(actionFile, `${JSON.stringify(action)}\n`);
      if (publishingResult) writeProgress({ stage: "complete", label: "结果已放入画布", summary: input.title || "生成结果已发布", model: input.provenance?.agent || input.provenance?.model || "", promptStatus: "完成", outputPlan: input.provenance?.outputPlan || "", percent: 100 });
      return { ok: true, queued: true, itemId: action.payload.id, kind: action.payload.kind };
    }
    if (name === "weshop_generate_run") {
      if (!input.agent || !input.params) throw new Error("agent and params are required");
      const created = await weshopCreateRun(input);
      const executionId = created?.meta?.executionId;
      if (!executionId) throw new Error("WeShop did not return an executionId");
      if (input.wait === false) return { ok: true, executionId, started: true };
      const done = await weshopPollRun(executionId);
      return { ok: true, executionId, done };
    }
    if (name === "weshop_get_run") {
      const executionId = input.executionId;
      if (!executionId) throw new Error("executionId is required");
      const data = await weshopRequest(`/agent/runs/${encodeURIComponent(executionId)}`);
      return { ok: true, executionId, data };
    }
    throw new Error(`Unknown tool: ${name}`);
}

const output = {
  schema: {},
  render: (_args, value) => [{ type: "text", text: JSON.stringify(value, null, 2) }],
};

/** Register every WeShop tool directly on the Cordis tool registry. */
export function registerNativeTools(ctx, options = {}) {
  setConfiguredApiKey(options.apiKey);
  for (const schema of toolSchemas) {
    ctx.tools.register({
      name: schema.name,
      description: schema.description,
      parameters: schema.inputSchema,
      output,
      execute: (args) => executeTool(schema.name, args || {}),
    });
  }
}
