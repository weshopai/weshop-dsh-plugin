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
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { registerNativeTools } from "./native-tools.js";

export const name = "weshop2.0";
export const inject = ["webServer", "tools", "skills"];

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
    description: "Open, launch, show, or display the embedded WeShop 2.0 canvas workspace.",
  },
  {
    name: "inspect-weshop-canvas",
    description: "Read and operate the current WeShop canvas, including generation, editing, publishing, and context-menu requests.",
  },
  {
    name: "weshop-openapi",
    description: "Use WeShop OpenAPI for commercial image and video generation, editing, and transformation tasks.",
  },
];

function skillBody(name) {
  const markdown = fs.readFileSync(path.join(skillDirectory, name, "SKILL.md"), "utf8");
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, "");
}

function registerBundledSkills(ctx) {
  for (const skill of bundledSkills) {
    ctx.skills.register({
      ...skill,
      invocation: { modelInvocable: true, userInvocable: true },
      provider: "weshop2.0",
      source: "bundled",
      resourceBase: { kind: "directory", path: path.join(skillDirectory, skill.name) },
      content: skillBody(skill.name),
    });
  }
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
  ".txt": "text/plain; charset=utf-8",
};

function readJsonBody(request, limit = 5_000_000) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > limit) reject(new Error("Request body too large"));
    });
    request.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (error) { reject(error); }
    });
    request.on("error", reject);
  });
}

function json(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(value));
}

function readState() {
  if (!fs.existsSync(stateFile)) return { version: 2, title: "Untitled space", items: [], selectedItemId: null };
  try { return JSON.parse(fs.readFileSync(stateFile, "utf8")); }
  catch { return { version: 2, title: "Untitled space", items: [], selectedItemId: null }; }
}

export function apply(ctx) {
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
        } catch { json(response, 400, { ok: false, error: "invalid canvas state" }); }
        return;
      }

      if (pathname === "/api/weshop/actions" && request.method === "GET") {
        const after = Number(new URL(request.url ?? "/", "http://127.0.0.1").searchParams.get("after") || 0);
        const actions = [];
        if (fs.existsSync(actionFile)) {
          for (const line of fs.readFileSync(actionFile, "utf8").split("\n")) {
            if (!line.trim()) continue;
            try {
              const action = JSON.parse(line);
              if (action.sequence <= after) continue;
              if (action.type === "add-asset" && action.payload?.localPath && fs.existsSync(action.payload.localPath)) {
                const extension = path.extname(action.payload.localPath).toLowerCase();
                if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".mov", ".webm", ".mp3", ".wav", ".m4a", ".ogg", ".txt"].includes(extension)) {
                  const id = `${action.sequence}-${Math.random().toString(36).slice(2, 8)}${extension}`;
                  const destination = path.join(assetDirectory, id);
                  fs.copyFileSync(action.payload.localPath, destination);
                  action.payload.url = `/api/weshop/assets/${id}`;
                  action.payload.localPath = destination;
                }
              }
              actions.push(action);
            } catch { /* Ignore malformed action records. */ }
          }
        }
        json(response, 200, { actions });
        return;
      }

      if (pathname === "/api/weshop/requests" && request.method === "POST") {
        try {
          const body = await readJsonBody(request);
          const state = readState();
          const item = state.items?.find((candidate) => candidate.id === body.itemId);
          if (!item || !["reverse-prompt", "upscale", "local-edit"].includes(body.type)) throw new Error("invalid request");
          const canvasRequest = {
            id: `request-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            sequence: Date.now(),
            status: "pending",
            type: body.type,
            prompt: String(body.prompt || ""),
            item,
            createdAt: new Date().toISOString(),
          };
          fs.appendFileSync(requestFile, `${JSON.stringify(canvasRequest)}\n`);
          json(response, 201, { ok: true, request: canvasRequest });
        } catch { json(response, 400, { ok: false, error: "invalid canvas request" }); }
        return;
      }

      if (pathname === "/api/weshop/progress" && request.method === "GET") {
        response.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
        response.end(fs.existsSync(progressFile) ? fs.readFileSync(progressFile) : '{"stage":"idle"}');
        return;
      }

      if (pathname === "/api/weshop/assets" && request.method === "POST") {
        try {
          const { name = "asset", type = "application/octet-stream", dataUrl = "" } = await readJsonBody(request, 140_000_000);
          const encoded = String(dataUrl).split(",", 2)[1];
          if (!encoded || !/^(image|video|audio)\//.test(String(type))) throw new Error("invalid asset");
          const extension = ({ "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "video/mp4": ".mp4", "video/quicktime": ".mov", "video/webm": ".webm", "audio/mpeg": ".mp3", "audio/wav": ".wav", "audio/mp4": ".m4a", "audio/ogg": ".ogg" })[type] || ".bin";
          const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
          const localPath = path.join(assetDirectory, id);
          fs.writeFileSync(localPath, Buffer.from(encoded, "base64"));
          json(response, 201, { url: `/api/weshop/assets/${id}`, localPath, originalName: name });
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
          "cache-control": "private, max-age=31536000, immutable",
        });
        fs.createReadStream(localPath).pipe(response);
        return;
      }

      // Built-in demo assets (the subproject's assets/ directory).
      if (pathname.startsWith("/api/weshop/demo/") && request.method === "GET") {
        const id = path.basename(pathname);
        const localPath = path.join(demoDirectory, id);
        if (!fs.existsSync(localPath) || !localPath.startsWith(`${demoDirectory}${path.sep}`)) {
          response.writeHead(404).end();
          return;
        }
        response.writeHead(200, {
          "content-type": contentTypes[path.extname(localPath)] || "application/octet-stream",
          "cache-control": "public, max-age=31536000, immutable",
        });
        fs.createReadStream(localPath).pipe(response);
        return;
      }

      response.writeHead(404, { "content-type": "application/json; charset=utf-8" });
      response.end(JSON.stringify({ error: "not found" }));
    },
  }), "weshop-canvas-host: /api/weshop routes");
}
