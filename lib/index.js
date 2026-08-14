import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
//#region src/native-tools.js
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
const stateFile$1 = process.env.WESHOP_STATE_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-state.json");
const actionFile$1 = process.env.WESHOP_ACTIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-actions.jsonl");
const requestFile$1 = process.env.WESHOP_REQUESTS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-requests.jsonl");
const completionFile = process.env.WESHOP_COMPLETIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-request-completions.jsonl");
const progressFile$1 = process.env.WESHOP_PROGRESS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-progress.json");
const WESHOP_BASE_URL = process.env.WESHOP_BASE_URL || "https://openapi.weshop.ai/openapi";
const WESHOP_API_KEY = process.env.WESHOP_API_KEY || "";
const WESHOP_POLL_INTERVAL_MS = Number(process.env.WESHOP_POLL_INTERVAL_MS || 3e3);
const WESHOP_POLL_MAX_MS = Number(process.env.WESHOP_POLL_MAX_MS || 6e5);
/** Unified WeShop error envelope; throws with the API message. */
function weshopError(status, body) {
	const error = body?.error || {};
	return new Error(`WeShop API ${status} ${error.code || ""}: ${error.message || JSON.stringify(body).slice(0, 300)}`.trim());
}
async function weshopRequest(pathname, { method = "GET", jsonBody, form } = {}) {
	if (!WESHOP_API_KEY) throw new Error("WESHOP_API_KEY is not set in the Harness environment");
	const headers = { Authorization: WESHOP_API_KEY };
	let body;
	if (form) body = form;
	else if (jsonBody !== void 0) {
		headers["content-type"] = "application/json";
		body = JSON.stringify(jsonBody);
	}
	const response = await fetch(`${WESHOP_BASE_URL}${pathname}`, {
		method,
		headers,
		body
	});
	const text = await response.text();
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		parsed = {};
	}
	if (!response.ok || parsed.success === false) throw weshopError(response.status, parsed);
	return parsed;
}
/** Upload a local image file; returns a reusable public URL. */
async function weshopUpload(localPath) {
	const { readFile } = await import("node:fs/promises");
	const bytes = await readFile(localPath);
	const type = {
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".webp": "image/webp",
		".gif": "image/gif"
	}[path.extname(localPath).toLowerCase()] || "application/octet-stream";
	const form = new FormData();
	form.append("image", new Blob([bytes], { type }), path.basename(localPath));
	return (await weshopRequest("/agent/assets/images", {
		method: "POST",
		form
	}))?.data?.image;
}
/** Poll one run until a terminal status or the time budget runs out. */
async function weshopPollRun(executionId) {
	const deadline = Date.now() + WESHOP_POLL_MAX_MS;
	for (;;) {
		const data = await weshopRequest(`/agent/runs/${encodeURIComponent(executionId)}`);
		const status = (data?.data?.executions?.at(-1))?.status;
		if (status === "Success" || status === "Failed") return data;
		if (Date.now() + WESHOP_POLL_INTERVAL_MS > deadline) throw new Error(`WeShop run ${executionId} did not finish within ${WESHOP_POLL_MAX_MS}ms (last status: ${status || "unknown"})`);
		await new Promise((resolve) => setTimeout(resolve, WESHOP_POLL_INTERVAL_MS));
	}
}
/** Create a WeShop run. Accepts a local originalImage path (uploaded automatically). */
async function weshopCreateRun(input) {
	const agent = {
		name: input.agent,
		version: input.version || "v1.0"
	};
	const runInput = { ...input.taskName ? { taskName: input.taskName } : {} };
	const params = { ...input.params || {} };
	if (input.originalImage) {
		const url = /^https?:\/\//.test(input.originalImage) ? input.originalImage : await weshopUpload(input.originalImage);
		runInput.originalImage = url;
		params.originalImage = url;
	}
	return weshopRequest("/agent/runs", {
		method: "POST",
		jsonBody: {
			agent,
			input: runInput,
			params
		}
	});
}
function readState$1() {
	if (!fs.existsSync(stateFile$1)) return {
		version: 1,
		connected: false,
		title: "Untitled space",
		items: [],
		selectedItemId: null,
		selectedItem: null
	};
	try {
		return {
			connected: true,
			...JSON.parse(fs.readFileSync(stateFile$1, "utf8"))
		};
	} catch {
		return {
			version: 1,
			connected: false,
			error: "Canvas state is unavailable",
			items: [],
			selectedItemId: null,
			selectedItem: null
		};
	}
}
function writeProgress(progress) {
	let previous = {};
	try {
		if (fs.existsSync(progressFile$1)) previous = JSON.parse(fs.readFileSync(progressFile$1, "utf8"));
	} catch {}
	const value = {
		...progress,
		...progress.startedAt ? {} : previous.startedAt ? { startedAt: previous.startedAt } : {},
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	fs.writeFileSync(progressFile$1, JSON.stringify(value, null, 2));
	return value;
}
function readRequests() {
	if (!fs.existsSync(requestFile$1)) return [];
	const completed = /* @__PURE__ */ new Set();
	if (fs.existsSync(completionFile)) for (const line of fs.readFileSync(completionFile, "utf8").split("\n")) try {
		if (line.trim()) completed.add(JSON.parse(line).requestId);
	} catch {}
	return fs.readFileSync(requestFile$1, "utf8").split("\n").flatMap((line) => {
		try {
			const request = JSON.parse(line);
			return completed.has(request.id) ? [] : [request];
		} catch {
			return [];
		}
	});
}
const toolSchemas = [
	{
		name: "weshop_canvas_get_state",
		description: "Read the complete weshop 2.0 canvas, including every material and result, provenance, position, size, viewport, counts, canvases, and current selection.",
		inputSchema: {
			type: "object",
			properties: {},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_get_selection",
		description: "Read the item currently selected on the weshop 2.0 canvas, including whether it is a material or result and how it was created or imported.",
		inputSchema: {
			type: "object",
			properties: {},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_add_image",
		description: "Low-level canvas image insertion. For every generated, edited, transformed, or upscaled output, use weshop_canvas_publish_result instead.",
		inputSchema: {
			type: "object",
			required: [
				"kind",
				"title",
				"provenance"
			],
			properties: {
				kind: {
					type: "string",
					enum: ["material", "result"]
				},
				title: { type: "string" },
				localPath: {
					type: "string",
					description: "Absolute path to a local image file."
				},
				url: {
					type: "string",
					description: "HTTPS image URL, used only when no local file is available."
				},
				width: {
					type: "number",
					minimum: 120,
					maximum: 1200
				},
				provenance: {
					type: "object",
					description: "How the image was created, including method, prompt, sources, agent, executionId, and model when available.",
					additionalProperties: true
				}
			},
			anyOf: [{ required: ["localPath"] }, { required: ["url"] }],
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_publish_result",
		description: "MANDATORY final step for every successful WeShop generation, edit, transformation, or upscale. Automatically publish the output to the live canvas as kind=result. Never use the webpage Add button for generated outputs.",
		inputSchema: {
			type: "object",
			required: ["title", "provenance"],
			properties: {
				title: { type: "string" },
				localPath: {
					type: "string",
					description: "Absolute path to the generated image file."
				},
				url: {
					type: "string",
					description: "Returned HTTPS image URL when no local file is available."
				},
				width: {
					type: "number",
					minimum: 120,
					maximum: 1200
				},
				provenance: {
					type: "object",
					description: "Complete generation lineage including agent, executionId, prompt/task, and source item IDs.",
					additionalProperties: true
				}
			},
			anyOf: [{ required: ["localPath"] }, { required: ["url"] }],
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_publish_asset",
		description: "Publish any generated result to the live canvas. Supports image, video, audio, and text. This is the mandatory final step for non-image outputs.",
		inputSchema: {
			type: "object",
			required: [
				"mediaType",
				"title",
				"provenance"
			],
			properties: {
				mediaType: {
					type: "string",
					enum: [
						"image",
						"video",
						"audio",
						"text"
					]
				},
				title: { type: "string" },
				localPath: { type: "string" },
				url: { type: "string" },
				content: {
					type: "string",
					description: "Inline content, required for text when no file or URL is used."
				},
				width: {
					type: "number",
					minimum: 120,
					maximum: 1200
				},
				provenance: {
					type: "object",
					additionalProperties: true
				}
			},
			anyOf: [
				{ required: ["localPath"] },
				{ required: ["url"] },
				{ required: ["content"] }
			],
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_report_progress",
		description: "Report concise, user-visible execution progress to the canvas. Use at meaningful transitions: intent understood, model selected, prompt ready, generating, publishing, complete, or error. Report decisions and status, never hidden chain-of-thought.",
		inputSchema: {
			type: "object",
			required: ["stage", "label"],
			properties: {
				stage: {
					type: "string",
					enum: [
						"interpreting",
						"researching",
						"planning",
						"prompt-ready",
						"generating",
						"publishing",
						"complete",
						"error",
						"idle"
					]
				},
				label: { type: "string" },
				summary: {
					type: "string",
					description: "Short user-facing interpretation or status, not private reasoning."
				},
				model: { type: "string" },
				promptStatus: { type: "string" },
				outputPlan: {
					type: "string",
					description: "For example: 4 independent images × 1 pose."
				},
				percent: {
					type: "number",
					minimum: 0,
					maximum: 100
				},
				startedAt: {
					type: "string",
					description: "ISO timestamp for elapsed-time display. Preserve the same value across one task."
				}
			},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_get_requests",
		description: "Read pending image operations submitted from the canvas context menu. For upscale and local-edit, use the weshop-openapi skill, publish with weshop_canvas_publish_result, then complete the request. For reverse-prompt, analyze the selected image and return the inferred prompt before completing it.",
		inputSchema: {
			type: "object",
			properties: {},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_complete_request",
		description: "Mark a canvas context-menu request complete after its result has been handled. Include a concise summary or the inferred prompt.",
		inputSchema: {
			type: "object",
			required: ["requestId", "summary"],
			properties: {
				requestId: { type: "string" },
				summary: { type: "string" },
				resultItemId: { type: "string" }
			},
			additionalProperties: false
		}
	},
	{
		name: "weshop_generate_run",
		description: "Run a WeShop OpenAPI generation/editing task (virtual try-on, model swap, background replace, pose change, canvas expand, background removal, product/photo generation, etc.). The API key is handled server-side; never echo it. Pass originalImage as a local path (uploaded automatically) or an https URL. See the weshop-openapi skill for per-agent parameters. After success, publish the output with weshop_canvas_publish_result.",
		inputSchema: {
			type: "object",
			required: [
				"agent",
				"originalImage",
				"params"
			],
			properties: {
				agent: {
					type: "string",
					description: "Agent name, e.g. aimodel, aiproduct, aipose, expandimage, removeBG, virtualtryon, seedream, gpt-image, midjourney, kling."
				},
				version: {
					type: "string",
					description: "Agent version; default v1.0."
				},
				originalImage: {
					type: "string",
					description: "Local absolute path (auto-uploaded) or https URL of the source image."
				},
				taskName: {
					type: "string",
					description: "Optional human-readable task label."
				},
				params: {
					type: "object",
					description: "Agent-specific run parameters (maskType, generatedContent, textDescription, batchCount, ...). See the weshop-openapi skill.",
					additionalProperties: true
				},
				wait: {
					type: "boolean",
					description: "Poll to completion and return final result URLs (default true). Set false to return the executionId immediately."
				}
			},
			additionalProperties: false
		}
	},
	{
		name: "weshop_get_run",
		description: "Poll one WeShop run by executionId and return its current or terminal status and result URLs.",
		inputSchema: {
			type: "object",
			required: ["executionId"],
			properties: { executionId: { type: "string" } },
			additionalProperties: false
		}
	}
];
async function executeTool(name, input) {
	const state = readState$1();
	if (name === "weshop_canvas_get_state") return state;
	if (name === "weshop_canvas_get_selection") return {
		connected: state.connected,
		selectedItemId: state.selectedItemId || null,
		selectedItem: state.selectedItem || null
	};
	if (name === "weshop_canvas_report_progress") return {
		ok: true,
		progress: writeProgress(input)
	};
	if (name === "weshop_canvas_get_requests") return {
		connected: state.connected,
		requests: readRequests()
	};
	if (name === "weshop_canvas_complete_request") {
		if (!readRequests().some((request) => request.id === input.requestId)) throw new Error("Unknown or completed request");
		const completion = {
			requestId: input.requestId,
			summary: input.summary,
			...input.resultItemId ? { resultItemId: input.resultItemId } : {},
			completedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		fs.appendFileSync(completionFile, `${JSON.stringify(completion)}\n`);
		return {
			ok: true,
			...completion
		};
	}
	if ([
		"weshop_canvas_add_image",
		"weshop_canvas_publish_result",
		"weshop_canvas_publish_asset"
	].includes(name)) {
		if (!input.localPath && !input.url && !input.content) throw new Error("localPath, url, or content is required");
		const publishingResult = name !== "weshop_canvas_add_image";
		const action = {
			sequence: Date.now(),
			type: "add-asset",
			payload: {
				id: `${publishingResult ? "result" : input.kind || "result"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				kind: publishingResult ? "result" : input.kind || "result",
				mediaType: input.mediaType || "image",
				title: input.title || "Untitled result",
				...input.localPath ? { localPath: input.localPath } : {},
				...input.url ? { url: input.url } : {},
				...input.content ? { content: input.content } : {},
				width: input.width || 460,
				provenance: input.provenance || { method: "agent-generation" },
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		};
		fs.appendFileSync(actionFile$1, `${JSON.stringify(action)}\n`);
		if (publishingResult) writeProgress({
			stage: "complete",
			label: "结果已放入画布",
			summary: input.title || "生成结果已发布",
			model: input.provenance?.agent || input.provenance?.model || "",
			promptStatus: "完成",
			outputPlan: input.provenance?.outputPlan || "",
			percent: 100
		});
		return {
			ok: true,
			queued: true,
			itemId: action.payload.id,
			kind: action.payload.kind
		};
	}
	if (name === "weshop_generate_run") {
		if (!input.agent || !input.originalImage || !input.params) throw new Error("agent, originalImage, and params are required");
		const executionId = (await weshopCreateRun(input))?.meta?.executionId;
		if (!executionId) throw new Error("WeShop did not return an executionId");
		if (input.wait === false) return {
			ok: true,
			executionId,
			started: true
		};
		return {
			ok: true,
			executionId,
			done: await weshopPollRun(executionId)
		};
	}
	if (name === "weshop_get_run") {
		const executionId = input.executionId;
		if (!executionId) throw new Error("executionId is required");
		return {
			ok: true,
			executionId,
			data: await weshopRequest(`/agent/runs/${encodeURIComponent(executionId)}`)
		};
	}
	throw new Error(`Unknown tool: ${name}`);
}
const output = {
	schema: {},
	render: (_args, value) => [{
		type: "text",
		text: JSON.stringify(value, null, 2)
	}]
};
/** Register every WeShop tool directly on the Cordis tool registry. */
function registerNativeTools(ctx) {
	for (const schema of toolSchemas) ctx.tools.register({
		name: schema.name,
		description: schema.description,
		parameters: schema.inputSchema,
		output,
		execute: (args) => executeTool(schema.name, args || {})
	});
}
//#endregion
//#region src/index.js
/**
* Native WeShop Cordis host plugin for DeepSeek Harness.
*
* Registers the canvas HTTP API on DSH's own webserver (`ctx.webServer`),
* so the in-GUI canvas client and native model tools share one
* state/actions/requests/progress/assets store without any standalone server.
*
* Routes (all under /api/weshop):
*   GET  /api/weshop/state            read canvas state JSON
*   POST /api/weshop/state            write canvas state JSON
*   GET  /api/weshop/actions?after=N  read MCP-queued actions (add-asset), copying local assets
*   POST /api/weshop/requests         queue a context-menu request (reverse-prompt/upscale/local-edit)
*   GET  /api/weshop/progress         read the agent progress record
*   POST /api/weshop/assets           upload media (image/video/audio) -> {url, localPath}
*   GET  /api/weshop/assets/<id>      serve an uploaded asset
*   GET  /api/weshop/demo/<file>      serve built-in demo assets
*
* Loaded from a cordis patch row: { name: '<abs path>/server/canvas-host.mjs' }
*/
const name = "weshop2.0";
const inject = [
	"webServer",
	"tools",
	"skills"
];
const stateFile = process.env.WESHOP_STATE_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-state.json");
const actionFile = process.env.WESHOP_ACTIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-actions.jsonl");
const requestFile = process.env.WESHOP_REQUESTS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-requests.jsonl");
const progressFile = process.env.WESHOP_PROGRESS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-progress.json");
const assetDirectory = process.env.WESHOP_ASSET_DIR || path.join(os.tmpdir(), "weshop-2-0-assets");
const demoDirectory = process.env.WESHOP_DEMO_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../assets");
const skillDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../skills");
fs.mkdirSync(assetDirectory, { recursive: true });
const bundledSkills = [
	{
		name: "open-weshop-2-0",
		description: "Open, launch, show, or display the embedded WeShop 2.0 canvas workspace."
	},
	{
		name: "inspect-weshop-canvas",
		description: "Read and operate the current WeShop canvas, including generation, editing, publishing, and context-menu requests."
	},
	{
		name: "weshop-openapi",
		description: "Use WeShop OpenAPI for commercial image and video generation, editing, and transformation tasks."
	}
];
function skillBody(name) {
	return fs.readFileSync(path.join(skillDirectory, name, "SKILL.md"), "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");
}
function registerBundledSkills(ctx) {
	for (const skill of bundledSkills) ctx.skills.register({
		...skill,
		invocation: {
			modelInvocable: true,
			userInvocable: true
		},
		provider: "weshop2.0",
		source: "bundled",
		resourceBase: {
			kind: "directory",
			path: path.join(skillDirectory, skill.name)
		},
		content: skillBody(skill.name)
	});
}
const contentTypes = {
	".css": "text/css; charset=utf-8",
	".html": "text/html; charset=utf-8",
	".gif": "image/gif",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".js": "text/javascript; charset=utf-8",
	".mp3": "audio/mpeg",
	".mp4": "video/mp4",
	".m4a": "audio/mp4",
	".mov": "video/quicktime",
	".ogg": "audio/ogg",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
	".webm": "video/webm",
	".wav": "audio/wav",
	".txt": "text/plain; charset=utf-8"
};
function readJsonBody(request, limit = 5e6) {
	return new Promise((resolve, reject) => {
		let body = "";
		request.on("data", (chunk) => {
			body += chunk;
			if (body.length > limit) reject(/* @__PURE__ */ new Error("Request body too large"));
		});
		request.on("end", () => {
			try {
				resolve(body ? JSON.parse(body) : {});
			} catch (error) {
				reject(error);
			}
		});
		request.on("error", reject);
	});
}
function json(response, status, value) {
	response.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
		"cache-control": "no-store"
	});
	response.end(JSON.stringify(value));
}
function readState() {
	if (!fs.existsSync(stateFile)) return {
		version: 2,
		title: "Untitled space",
		items: [],
		selectedItemId: null
	};
	try {
		return JSON.parse(fs.readFileSync(stateFile, "utf8"));
	} catch {
		return {
			version: 2,
			title: "Untitled space",
			items: [],
			selectedItemId: null
		};
	}
}
function apply(ctx) {
	registerBundledSkills(ctx);
	registerNativeTools(ctx);
	ctx.effect(() => ctx.webServer.register({
		kind: "prefix",
		path: "/api/weshop",
		handler: async (request, response) => {
			const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
			if (pathname === "/api/weshop/state" && request.method === "GET") {
				json(response, 200, readState());
				return;
			}
			if (pathname === "/api/weshop/state" && request.method === "POST") {
				try {
					const state = await readJsonBody(request);
					fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
					json(response, 200, { ok: true });
				} catch {
					json(response, 400, {
						ok: false,
						error: "invalid canvas state"
					});
				}
				return;
			}
			if (pathname === "/api/weshop/actions" && request.method === "GET") {
				const after = Number(new URL(request.url ?? "/", "http://127.0.0.1").searchParams.get("after") || 0);
				const actions = [];
				if (fs.existsSync(actionFile)) for (const line of fs.readFileSync(actionFile, "utf8").split("\n")) {
					if (!line.trim()) continue;
					try {
						const action = JSON.parse(line);
						if (action.sequence <= after) continue;
						if (action.type === "add-asset" && action.payload?.localPath && fs.existsSync(action.payload.localPath)) {
							const extension = path.extname(action.payload.localPath).toLowerCase();
							if ([
								".png",
								".jpg",
								".jpeg",
								".webp",
								".gif",
								".mp4",
								".mov",
								".webm",
								".mp3",
								".wav",
								".m4a",
								".ogg",
								".txt"
							].includes(extension)) {
								const id = `${action.sequence}-${Math.random().toString(36).slice(2, 8)}${extension}`;
								const destination = path.join(assetDirectory, id);
								fs.copyFileSync(action.payload.localPath, destination);
								action.payload.url = `/api/weshop/assets/${id}`;
								action.payload.localPath = destination;
							}
						}
						actions.push(action);
					} catch {}
				}
				json(response, 200, { actions });
				return;
			}
			if (pathname === "/api/weshop/requests" && request.method === "POST") {
				try {
					const body = await readJsonBody(request);
					const item = readState().items?.find((candidate) => candidate.id === body.itemId);
					if (!item || ![
						"reverse-prompt",
						"upscale",
						"local-edit"
					].includes(body.type)) throw new Error("invalid request");
					const canvasRequest = {
						id: `request-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
						sequence: Date.now(),
						status: "pending",
						type: body.type,
						prompt: String(body.prompt || ""),
						item,
						createdAt: (/* @__PURE__ */ new Date()).toISOString()
					};
					fs.appendFileSync(requestFile, `${JSON.stringify(canvasRequest)}\n`);
					json(response, 201, {
						ok: true,
						request: canvasRequest
					});
				} catch {
					json(response, 400, {
						ok: false,
						error: "invalid canvas request"
					});
				}
				return;
			}
			if (pathname === "/api/weshop/progress" && request.method === "GET") {
				response.writeHead(200, {
					"content-type": "application/json; charset=utf-8",
					"cache-control": "no-store"
				});
				response.end(fs.existsSync(progressFile) ? fs.readFileSync(progressFile) : "{\"stage\":\"idle\"}");
				return;
			}
			if (pathname === "/api/weshop/assets" && request.method === "POST") {
				try {
					const { name = "asset", type = "application/octet-stream", dataUrl = "" } = await readJsonBody(request, 14e7);
					const encoded = String(dataUrl).split(",", 2)[1];
					if (!encoded || !/^(image|video|audio)\//.test(String(type))) throw new Error("invalid asset");
					const extension = {
						"image/jpeg": ".jpg",
						"image/png": ".png",
						"image/webp": ".webp",
						"image/gif": ".gif",
						"video/mp4": ".mp4",
						"video/quicktime": ".mov",
						"video/webm": ".webm",
						"audio/mpeg": ".mp3",
						"audio/wav": ".wav",
						"audio/mp4": ".m4a",
						"audio/ogg": ".ogg"
					}[type] || ".bin";
					const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
					const localPath = path.join(assetDirectory, id);
					fs.writeFileSync(localPath, Buffer.from(encoded, "base64"));
					json(response, 201, {
						url: `/api/weshop/assets/${id}`,
						localPath,
						originalName: name
					});
				} catch {
					json(response, 400, { error: "invalid media asset" });
				}
				return;
			}
			if (pathname.startsWith("/api/weshop/assets/") && request.method === "GET") {
				const id = path.basename(pathname);
				const localPath = path.join(assetDirectory, id);
				if (!fs.existsSync(localPath)) {
					response.writeHead(404).end();
					return;
				}
				response.writeHead(200, {
					"content-type": contentTypes[path.extname(localPath)] || "application/octet-stream",
					"cache-control": "private, max-age=31536000, immutable"
				});
				fs.createReadStream(localPath).pipe(response);
				return;
			}
			if (pathname.startsWith("/api/weshop/demo/") && request.method === "GET") {
				const id = path.basename(pathname);
				const localPath = path.join(demoDirectory, id);
				if (!fs.existsSync(localPath) || !localPath.startsWith(`${demoDirectory}${path.sep}`)) {
					response.writeHead(404).end();
					return;
				}
				response.writeHead(200, {
					"content-type": contentTypes[path.extname(localPath)] || "application/octet-stream",
					"cache-control": "public, max-age=31536000, immutable"
				});
				fs.createReadStream(localPath).pipe(response);
				return;
			}
			response.writeHead(404, { "content-type": "application/json; charset=utf-8" });
			response.end(JSON.stringify({ error: "not found" }));
		}
	}), "weshop-canvas-host: /api/weshop routes");
}
//#endregion
export { apply, inject, name };
