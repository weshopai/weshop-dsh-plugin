import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowCounterClockwise, ArrowsInSimple, CornersOut, DownloadSimple, ImageSquare, MagicWand,
  CaretDown, CheckCircle, CursorClick, DotsSix, Hand, Key, MagnifyingGlassPlus, Minus, MusicNotes, PencilSimple, Plus,
  Sparkle, SquaresFour, TextT, Trash, UploadSimple, VideoCamera, X,
} from "@phosphor-icons/react";
import { initialLocale, saveLocale, translator } from "./i18n.js";

const STORAGE_KEY = "weshop-2-0-dsh:spaces:v1";
const ACTIVE_CANVAS_STORAGE_KEY = "weshop-2-0-dsh:active-space:v1";
const blankCanvas = (index = 1) => ({ id: `canvas-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title: index === 1 ? "Untitled space" : `Untitled space ${index}`, items: [], view: { x: 0, y: 0, scale: .72 } });
function restoreCanvases() {
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (saved?.length) return saved; } catch { /* Start clean. */ }
  return [blankCanvas()];
}
function restoreActiveCanvasId(canvases) {
  try {
    const savedId = localStorage.getItem(ACTIVE_CANVAS_STORAGE_KEY);
    if (savedId && canvases.some((canvas) => canvas.id === savedId)) return savedId;
  } catch { /* Use the first available canvas. */ }
  return canvases[0].id;
}

export function WeshopWorkspace({ onExit, onSelectionChange, locale: controlledLocale, onLocaleChange, embedded = false, initialActionCursor = Date.now() }) {
  const [localLocale, setLocalLocale] = useState(initialLocale);
  const locale = controlledLocale || localLocale;
  const t = useMemo(() => translator(locale), [locale]);
  const changeLocale = (next) => { saveLocale(next); if (onLocaleChange) onLocaleChange(next); else setLocalLocale(next); };
  const [canvases, setCanvases] = useState(restoreCanvases);
  const [activeCanvasId, setActiveCanvasId] = useState(() => restoreActiveCanvasId(canvases));
  const activeInitial = canvases.find((canvas) => canvas.id === activeCanvasId) || canvases[0];
  const [items, setItems] = useState(activeInitial.items);
  const [view, setView] = useState(activeInitial.view);
  const [selectedIds, setSelectedIds] = useState([]);
  const [title, setTitle] = useState(activeInitial.title);
  const [canvasMenuOpen, setCanvasMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [editDialog, setEditDialog] = useState(null);
  const [editPrompt, setEditPrompt] = useState("");
  const [dropActive, setDropActive] = useState(false);
  const [toast, setToast] = useState(null);
  const [progress, setProgress] = useState(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [textDialogOpen, setTextDialogOpen] = useState(false);
  const [newText, setNewText] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const stageRef = useRef(null);
  const gesture = useRef(null);
  const fileRef = useRef(null);
  const actionCursor = useRef(initialActionCursor);
  const itemsRef = useRef(items);
  const viewRef = useRef(view);
  const historyRef = useRef([]);
  const [undoDepth, setUndoDepth] = useState(0);
  const [selectionRect, setSelectionRect] = useState(null);
  const [apiConfig, setApiConfig] = useState(null);
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiKeyDraft, setApiKeyDraft] = useState("");
  const [apiSaving, setApiSaving] = useState(false);
  const [canvasMode, setCanvasMode] = useState("select");
  const spacePressed = useRef(false);
  const selected = selectedIds.at(-1) || null;

  const recordUndo = (snapshot = itemsRef.current) => {
    historyRef.current = [...historyRef.current.slice(-79), snapshot];
    setUndoDepth(historyRef.current.length);
  };
  const replaceItems = (update, { record = true } = {}) => {
    const current = itemsRef.current;
    const next = typeof update === "function" ? update(current) : update;
    if (next === current) return;
    if (record) recordUndo(current);
    itemsRef.current = next;
    setItems(next);
  };
  const undo = () => {
    const previous = historyRef.current.at(-1);
    if (!previous) return;
    historyRef.current = historyRef.current.slice(0, -1);
    itemsRef.current = previous;
    setItems(previous);
    setSelectedIds([]);
    setUndoDepth(historyRef.current.length);
    notify(t("已返回上一步"));
  };

  useEffect(() => {
    setCanvases((all) => all.map((canvas) => canvas.id === activeCanvasId ? { ...canvas, title, items, view } : canvas));
  }, [activeCanvasId, items, title, view]);
  useEffect(() => { viewRef.current = view; }, [view]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(canvases)); }, [canvases]);
  useEffect(() => { localStorage.setItem(ACTIVE_CANVAS_STORAGE_KEY, activeCanvasId); }, [activeCanvasId]);

  const canvasState = useMemo(() => {
    const describeItem = ({ src, localPath, ...item }) => {
      const resolvedUrl = src ? new URL(src, window.location.origin) : null;
      return {
        ...item,
        asset: item.mediaType === "text"
          ? { transport: "inline-text", content: item.content || "", readableByAgent: true }
          : src?.startsWith("data:")
            ? { transport: "browser-data-url", readableByAgent: false }
            : {
                transport: resolvedUrl?.origin === window.location.origin ? "local-url" : "remote-url",
                url: resolvedUrl?.href || null,
                ...(localPath ? { localPath } : {}),
                readableByAgent: true,
              },
      };
    };
    const activeItems = selectedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean);
    const activeItem = activeItems.at(-1);
    return {
      version: 3,
      canvasId: activeCanvasId,
      title,
      updatedAt: new Date().toISOString(),
      viewport: view,
      selectedItemIds: activeItems.map((item) => item.id),
      selectedItems: activeItems.map(describeItem),
      selectedItemId: selected,
      selectedItem: activeItem ? describeItem(activeItem) : null,
      counts: {
        total: items.length,
        materials: items.filter((item) => item.kind === "material").length,
        results: items.filter((item) => item.kind === "result").length,
        images: items.filter((item) => (item.mediaType || "image") === "image").length,
        videos: items.filter((item) => item.mediaType === "video").length,
        audio: items.filter((item) => item.mediaType === "audio").length,
        text: items.filter((item) => item.mediaType === "text").length,
      },
      canvases: canvases.map((canvas) => ({ id: canvas.id, title: canvas.id === activeCanvasId ? title : canvas.title, itemCount: canvas.id === activeCanvasId ? items.length : canvas.items.length, active: canvas.id === activeCanvasId })),
      items: items.map(describeItem),
    };
  }, [activeCanvasId, canvases, items, selected, selectedIds, title, view]);

  useEffect(() => {
    const timer = setTimeout(() => fetch("/api/weshop/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(canvasState),
    }).catch(() => undefined), 80);
    return () => clearTimeout(timer);
  }, [canvasState]);

  const refreshApiConfig = async () => {
    try {
      const response = await fetch("/api/weshop/config");
      if (response.ok) setApiConfig(await response.json());
    } catch { /* Configuration status is optional while the host starts. */ }
  };
  useEffect(() => { void refreshApiConfig(); }, []);

  const saveApiKey = async (apiKey) => {
    setApiSaving(true);
    try {
      const response = await fetch("/api/weshop/config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "save failed");
      setApiConfig(result);
      setApiKeyDraft("");
      setApiDialogOpen(false);
      notify(t(apiKey ? "WeShop API Key 已保存" : result.configured ? "已恢复其他 API Key 配置" : "API Key 已清除"));
    } catch { notify(t("API Key 保存失败，请稍后重试")); }
    finally { setApiSaving(false); }
  };

  useEffect(() => {
    const readAspect = (payload) => new Promise((resolve) => {
      const fallback = payload.aspect || (payload.mediaType === "audio" ? 2.6 : payload.mediaType === "text" ? 1.35 : 1.5);
      if (!payload.url || !["image", "video", undefined].includes(payload.mediaType)) return resolve(fallback);
      const timer = window.setTimeout(() => resolve(fallback), 3500);
      if ((payload.mediaType || "image") === "image") {
        const image = new Image();
        image.onload = () => { window.clearTimeout(timer); resolve(image.naturalWidth / image.naturalHeight || fallback); };
        image.onerror = () => { window.clearTimeout(timer); resolve(fallback); };
        image.src = payload.url;
      } else {
        const video = document.createElement("video");
        video.onloadedmetadata = () => { window.clearTimeout(timer); resolve(video.videoWidth / video.videoHeight || fallback); };
        video.onerror = () => { window.clearTimeout(timer); resolve(fallback); };
        video.src = payload.url;
      }
    });
    const applyActions = async () => {
      try {
        const response = await fetch(`/api/weshop/actions?after=${actionCursor.current}`);
        const data = await response.json();
        const additions = [];
        for (const action of [...(data.actions || [])].sort((a, b) => (a.sequence || 0) - (b.sequence || 0))) {
          actionCursor.current = Math.max(actionCursor.current, action.sequence || 0);
          if (action.type !== "add-asset" || (!action.payload?.url && !action.payload?.content)) continue;
          const payload = action.payload;
          additions.push({ payload, aspect: await readAspect(payload) });
        }
        if (!additions.length) return;
        let lastInserted = null;
        replaceItems((all) => {
          const next = [...all];
          const viewport = viewRef.current;
          for (const { payload, aspect } of additions) {
            if (next.some((item) => item.id === payload.id)) continue;
            const index = next.length;
            lastInserted = {
              id: payload.id,
              kind: "result",
              mediaType: payload.mediaType || "image",
              ...(payload.url ? { src: payload.url } : {}),
              ...(payload.content ? { content: payload.content } : {}),
              ...(payload.localPath ? { localPath: payload.localPath } : {}),
              title: payload.title || "Generated result",
              provenance: payload.provenance || { method: "agent-generation" },
              createdAt: payload.createdAt || new Date().toISOString(),
              x: (180 - viewport.x) / viewport.scale + (index % 3) * 34,
              y: (210 - viewport.y) / viewport.scale + (index % 4) * 30,
              width: payload.width || 460,
              aspect,
            };
            next.push(lastInserted);
          }
          return next;
        });
        if (lastInserted) {
          setSelectedIds([lastInserted.id]);
          window.requestAnimationFrame(() => {
            const rect = stageRef.current?.getBoundingClientRect();
            if (!rect) return;
            const height = lastInserted.width / lastInserted.aspect;
            const scale = Math.min(1, Math.max(.5, Math.min((rect.width * .68) / lastInserted.width, (rect.height * .72) / height)));
            setView({
              scale,
              x: rect.width / 2 - (lastInserted.x + lastInserted.width / 2) * scale,
              y: rect.height / 2 - (lastInserted.y + height / 2) * scale,
            });
          });
        }
      } catch { /* The local canvas bridge may still be starting. */ }
    };
    const timer = setInterval(applyActions, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const readProgress = async () => {
      try {
        const response = await fetch("/api/weshop/progress");
        if (response.ok) setProgress(await response.json());
      } catch { /* Progress is optional while the bridge starts. */ }
    };
    readProgress();
    const timer = setInterval(readProgress, 900);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!progress?.startedAt || ["complete", "error", "idle"].includes(progress.stage)) { setElapsed(0); return undefined; }
    const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - new Date(progress.startedAt).getTime()) / 1000)));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [progress?.stage, progress?.startedAt]);

  const selectedItem = useMemo(() => items.find((item) => item.id === selected), [items, selected]);
  const selectedItems = useMemo(() => selectedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean), [items, selectedIds]);
  useEffect(() => {
    onSelectionChange?.(selectedItems.map((item) => ({
      id: item.id,
      title: item.title || "Untitled",
      kind: item.kind || "material",
      mediaType: item.mediaType || "image",
    })));
  }, [onSelectionChange, selectedItems]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  };

  const openCanvas = (canvas) => {
    setActiveCanvasId(canvas.id);
    setTitle(canvas.title);
    const nextItems = canvas.items || [];
    itemsRef.current = nextItems;
    setItems(nextItems);
    historyRef.current = [];
    setUndoDepth(0);
    setView(canvas.view || { x: 0, y: 0, scale: .72 });
    setSelectedIds([]);
    setCanvasMenuOpen(false);
  };

  const createCanvas = () => {
    const canvas = blankCanvas(canvases.length + 1);
    setCanvases((all) => [...all, canvas]);
    openCanvas(canvas);
  };

  const deleteCanvas = () => {
    if (!window.confirm(`删除“${title}”？画布里的素材和结果也会被删除。`)) return;
    const remaining = canvases.filter((canvas) => canvas.id !== activeCanvasId);
    if (remaining.length) {
      setCanvases(remaining);
      openCanvas(remaining[0]);
    } else {
      const replacement = blankCanvas();
      setCanvases([replacement]);
      openCanvas(replacement);
    }
  };

  const zoomAt = (nextScale, clientX, clientY) => {
    const rect = stageRef.current.getBoundingClientRect();
    setView((current) => {
      const scale = Math.min(2.4, Math.max(.28, nextScale));
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const worldX = (px - current.x) / current.scale;
      const worldY = (py - current.y) / current.scale;
      return { scale, x: px - worldX * scale, y: py - worldY * scale };
    });
  };

  const onWheel = (event) => {
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) zoomAt(view.scale * Math.exp(-event.deltaY * .004), event.clientX, event.clientY);
    else setView((current) => ({ ...current, x: current.x - event.deltaX, y: current.y - event.deltaY }));
  };

  const beginCanvasGesture = (event) => {
    if (event.target.closest("[data-result]") || ![0, 1].includes(event.button)) return;
    if (event.button === 1 || spacePressed.current || canvasMode === "pan") {
      gesture.current = { type: "pan", startX: event.clientX, startY: event.clientY, view };
    } else {
      const rect = stageRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const additive = event.shiftKey || event.metaKey || event.ctrlKey;
      gesture.current = { type: "marquee", startX: x, startY: y, additive, baseIds: additive ? selectedIds : [] };
      if (!additive) setSelectedIds([]);
      setSelectionRect({ x, y, width: 0, height: 0 });
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const beginDrag = (event, item) => {
    event.stopPropagation();
    if (event.button === 1 || spacePressed.current || canvasMode === "pan") {
      gesture.current = { type: "pan", startX: event.clientX, startY: event.clientY, view };
      stageRef.current.setPointerCapture(event.pointerId);
      return;
    }
    const toggle = event.shiftKey || event.metaKey || event.ctrlKey;
    const nextIds = toggle
      ? selectedIds.includes(item.id) ? selectedIds.filter((id) => id !== item.id) : [...selectedIds, item.id]
      : selectedIds.includes(item.id) ? selectedIds : [item.id];
    setSelectedIds(nextIds);
    if (!nextIds.includes(item.id)) return;
    const origins = new Map(items.filter((candidate) => nextIds.includes(candidate.id)).map((candidate) => [candidate.id, { x: candidate.x, y: candidate.y }]));
    gesture.current = { type: "item", ids: nextIds, startX: event.clientX, startY: event.clientY, origins, recorded: false };
    stageRef.current.setPointerCapture(event.pointerId);
  };

  const beginResize = (event, item) => {
    event.stopPropagation();
    setSelectedIds([item.id]);
    gesture.current = { type: "resize", id: item.id, startX: event.clientX, width: item.width, recorded: false };
    stageRef.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    const current = gesture.current;
    if (!current) return;
    if (current.type === "pan") {
      setView({ ...current.view, x: current.view.x + event.clientX - current.startX, y: current.view.y + event.clientY - current.startY });
      return;
    }
    if (current.type === "marquee") {
      const rect = stageRef.current.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const box = {
        x: Math.min(current.startX, pointerX),
        y: Math.min(current.startY, pointerY),
        width: Math.abs(pointerX - current.startX),
        height: Math.abs(pointerY - current.startY),
      };
      setSelectionRect(box);
      const hits = items.filter((item) => {
        const left = view.x + item.x * view.scale;
        const top = view.y + item.y * view.scale;
        const width = item.width * view.scale;
        const height = item.width / item.aspect * view.scale;
        return left < box.x + box.width && left + width > box.x && top < box.y + box.height && top + height > box.y;
      }).map((item) => item.id);
      setSelectedIds([...new Set([...current.baseIds, ...hits])]);
      return;
    }
    const dx = (event.clientX - current.startX) / view.scale;
    if (!current.recorded) {
      recordUndo();
      current.recorded = true;
    }
    if (current.type === "resize") {
      const width = Math.min(1200, Math.max(120, current.width + dx));
      replaceItems((all) => all.map((item) => item.id === current.id ? { ...item, width } : item), { record: false });
      return;
    }
    const dy = (event.clientY - current.startY) / view.scale;
    replaceItems((all) => all.map((item) => {
      const origin = current.origins.get(item.id);
      return origin ? { ...item, x: origin.x + dx, y: origin.y + dy } : item;
    }), { record: false });
  };

  const arrange = () => {
    if (!items.length || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const gap = 48;
    const outer = 96;
    const targetWidth = Math.max(760, Math.min(1900, rect.width / .76));
    const ordered = [...items].sort((a, b) => (a.y - b.y) || (a.x - b.x));
    const widths = ordered.map((item) => Math.max(180, Math.min(680, item.width)));
    const medianWidth = [...widths].sort((a, b) => a - b)[Math.floor(widths.length / 2)] || 420;
    const normalize = Math.max(.72, Math.min(1.12, 420 / medianWidth));
    const rows = [];
    let row = [];
    let rowWidth = 0;

    for (const item of ordered) {
      const width = Math.max(220, Math.min(650, item.width * normalize));
      const height = width / Math.max(.3, item.aspect || 1);
      const entry = { item, width, height };
      const nextWidth = rowWidth + (row.length ? gap : 0) + width;
      if (row.length && nextWidth > targetWidth) {
        rows.push(row);
        row = [entry];
        rowWidth = width;
      } else {
        row.push(entry);
        rowWidth = nextWidth;
      }
    }
    if (row.length) rows.push(row);

    const arranged = new Map();
    let y = outer;
    for (const entries of rows) {
      const width = entries.reduce((sum, entry) => sum + entry.width, 0) + gap * Math.max(0, entries.length - 1);
      const height = Math.max(...entries.map((entry) => entry.height));
      let x = outer + Math.max(0, (targetWidth - width) / 2);
      for (const entry of entries) {
        arranged.set(entry.item.id, {
          x,
          y: y + (height - entry.height) / 2,
          width: entry.width,
        });
        x += entry.width + gap;
      }
      y += height + gap;
    }

    const contentHeight = Math.max(1, y - gap + outer);
    const boundsWidth = targetWidth + outer * 2;
    const scale = Math.max(.28, Math.min(1, (rect.width - 80) / boundsWidth, (rect.height - 100) / contentHeight));
    replaceItems((all) => all.map((item) => ({ ...item, ...arranged.get(item.id) })));
    setView({
      scale,
      x: (rect.width - boundsWidth * scale) / 2,
      y: (rect.height - contentHeight * scale) / 2,
    });
  };

  const fitAll = () => {
    if (!items.length) return;
    const rect = stageRef.current.getBoundingClientRect();
    const minX = Math.min(...items.map((item) => item.x));
    const minY = Math.min(...items.map((item) => item.y));
    const maxX = Math.max(...items.map((item) => item.x + item.width));
    const maxY = Math.max(...items.map((item) => item.y + item.width / item.aspect));
    const scale = Math.min(1, (rect.width - 120) / (maxX - minX), (rect.height - 160) / (maxY - minY));
    setView({ scale, x: (rect.width - (maxX - minX) * scale) / 2 - minX * scale, y: (rect.height - (maxY - minY) * scale) / 2 - minY * scale + 20 });
  };

  const addFiles = (fileList, dropPoint = null) => {
    [...fileList].filter((file) => /^(image|video|audio)\//.test(file.type) || file.type === "text/plain").forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const mediaType = file.type.startsWith("video/") ? "video" : file.type.startsWith("audio/") ? "audio" : file.type === "text/plain" ? "text" : "image";
        const addAsset = async (aspect) => {
          let asset = { url: reader.result };
          try {
            const response = await fetch("/api/weshop/assets", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ name: file.name, type: file.type, dataUrl: reader.result }),
            });
            if (response.ok) asset = await response.json();
          } catch { /* Keep browser asset when the local bridge is unavailable. */ }
          replaceItems((all) => [...all, {
            id: `material-${Date.now()}-${index}`,
            kind: "material",
            mediaType,
            ...(mediaType === "text" ? { content: String(reader.result) } : { src: asset.url }),
            ...(asset.localPath ? { localPath: asset.localPath } : {}),
            title: file.name.replace(/\.[^.]+$/, ""),
            provenance: { method: "local-upload", source: file.name, mimeType: file.type, bytes: file.size },
            createdAt: new Date().toISOString(),
            x: dropPoint ? (dropPoint.x - view.x) / view.scale + index * 26 : (160 - view.x) / view.scale + all.length * 36,
            y: dropPoint ? (dropPoint.y - view.y) / view.scale + index * 26 : (180 - view.y) / view.scale + all.length * 28,
            width: 420,
            aspect,
          }]);
        };
        if (mediaType === "image") {
          const image = new Image(); image.onload = () => addAsset(image.width / image.height); image.src = reader.result;
        } else if (mediaType === "video") {
          const video = document.createElement("video"); video.onloadedmetadata = () => addAsset(video.videoWidth / video.videoHeight || 16 / 9); video.src = reader.result;
        } else addAsset(mediaType === "audio" ? 2.6 : 1.35);
      };
      if (file.type === "text/plain") reader.readAsText(file); else reader.readAsDataURL(file);
    });
  };

  const addTextCard = () => {
    if (!newText.trim()) return;
    replaceItems((all) => [...all, { id: `material-text-${Date.now()}`, kind: "material", mediaType: "text", title: newText.trim().split("\n")[0].slice(0, 48) || "Text", content: newText.trim(), provenance: { method: "canvas-text", source: "User text" }, createdAt: new Date().toISOString(), x: (180 - view.x) / view.scale + all.length * 28, y: (190 - view.y) / view.scale + all.length * 24, width: 360, aspect: 1.35 }]);
    setNewText(""); setTextDialogOpen(false); setAddMenuOpen(false);
  };

  const importImages = (event) => {
    addFiles(event.target.files);
    event.target.value = "";
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDropActive(false);
    const rect = stageRef.current.getBoundingClientRect();
    addFiles(event.dataTransfer.files, { x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  const queueOperation = async (type, item, prompt = "") => {
    setContextMenu(null);
    try {
      const response = await fetch("/api/weshop/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, itemId: item.id, prompt }),
      });
      if (!response.ok) throw new Error("request failed");
      notify(t(type === "reverse-prompt" ? "已提交反推提示词任务" : type === "upscale" ? "已提交高清放大任务" : "已提交局部编辑任务"));
    } catch { notify(t("任务提交失败，请确认本地画布服务正在运行")); }
  };

  const removeSelected = () => {
    if (!selectedIds.length) return;
    const removing = new Set(selectedIds);
    replaceItems((all) => all.filter((item) => !removing.has(item.id)));
    setSelectedIds([]);
  };

  const downloadSelected = async () => {
    if (!selectedItem?.src) return;
    const filename = (selectedItem.title || "weshop-result").replace(/[\\/:*?"<>|]+/g, "-");
    try {
      const response = await fetch(selectedItem.src);
      if (!response.ok) throw new Error(`download failed: ${response.status}`);
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      notify(t("已开始下载"));
    } catch {
      window.open(selectedItem.src, "_blank", "noopener,noreferrer");
      notify(t("原图已打开，可从浏览器保存"));
    }
  };

  useEffect(() => {
    const onKey = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const editing = target?.closest("input, textarea, select, [contenteditable='true'], [role='textbox']") !== null;
      if (event.code === "Space" && !editing) { event.preventDefault(); spacePressed.current = true; }
      if (!editing && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "v") setCanvasMode("select");
      if (!editing && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === "h") setCanvasMode("pan");
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z" && !event.shiftKey && !editing) {
        event.preventDefault();
        undo();
        return;
      }
      if ((event.key === "Backspace" || event.key === "Delete") && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) removeSelected();
      if (event.key === "0" && !editing) fitAll();
    };
    const onKeyUp = (event) => { if (event.code === "Space") spacePressed.current = false; };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKeyUp); };
  });

  return <div className={`pure-canvas-shell${embedded ? " is-embedded" : ""}`}>
    <header className="topbar">
      <div className="brand-mark"><SquaresFour weight="fill" size={16} /></div>
      <div className="canvas-switcher">
        <input className="space-title" value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Space title" />
        <button className="switcher-trigger" onClick={() => setCanvasMenuOpen((open) => !open)} aria-label={t("管理画布")} aria-expanded={canvasMenuOpen}><CaretDown size={13} /></button>
        {canvasMenuOpen && <div className="canvas-menu">
          <div className="canvas-menu-label">CANVASES</div>
          {canvases.map((canvas) => <button key={canvas.id} className={canvas.id === activeCanvasId ? "is-active" : ""} onClick={() => openCanvas(canvas)}><span>{canvas.id === activeCanvasId ? title : canvas.title}</span><small>{canvas.id === activeCanvasId ? items.length : canvas.items.length}</small></button>)}
          <div className="canvas-menu-actions"><button onClick={createCanvas}><Plus size={14} />{t("新建画布")}</button><button className="delete-canvas" onClick={deleteCanvas}><Trash size={14} />{t("删除当前")}</button></div>
        </div>}
      </div>
      <span className="saved-state">Saved locally</span>
      <div className="topbar-actions">
        <label className="language-switch" title={t("语言")}><select value={locale} onChange={(event) => changeLocale(event.target.value)} aria-label={t("语言")}><option value="zh-CN">中文</option><option value="en">EN</option></select></label>
        <button className={`quiet-button api-key-button${apiConfig?.configured ? " is-configured" : ""}`} onClick={() => setApiDialogOpen(true)} title={t("配置 WeShop API Key")}>{apiConfig?.configured ? <CheckCircle size={17} weight="fill" /> : <Key size={17} />} {t(apiConfig?.configured ? "API 已配置" : "配置 API Key")}</button>
        <button className="quiet-button undo-button" onClick={undo} disabled={undoDepth === 0} title={t("返回上一步 (⌘/Ctrl+Z)")}><ArrowCounterClockwise size={17} /> {t("返回上一步")}</button>
        <button className="quiet-button" onClick={arrange}><SquaresFour size={17} /> Arrange</button>
        <div className="add-menu-wrap"><button className="primary-button" onClick={() => setAddMenuOpen((open) => !open)}><UploadSimple size={17} /> Add <CaretDown size={11} /></button>{addMenuOpen && <div className="add-menu"><button onClick={() => { fileRef.current.click(); setAddMenuOpen(false); }}><UploadSimple size={16} /><span><strong>{t("上传文件")}</strong><small>{t("图片、视频、音频、TXT")}</small></span></button><button onClick={() => { setTextDialogOpen(true); setAddMenuOpen(false); }}><TextT size={16} /><span><strong>{t("添加文字")}</strong><small>{t("直接写入画布")}</small></span></button></div>}</div>
      </div>
    </header>

    <main ref={stageRef} className={`canvas mode-${canvasMode} ${dropActive ? "is-drop-active" : ""}`} onWheel={onWheel} onPointerDown={(event) => { setContextMenu(null); beginCanvasGesture(event); }} onPointerMove={onPointerMove} onPointerUp={() => { gesture.current = null; setSelectionRect(null); }} onPointerCancel={() => { gesture.current = null; setSelectionRect(null); }} onContextMenu={(event) => { if (!selectedItem || event.target.closest("[data-result]")) return; event.preventDefault(); setContextMenu({ item: selectedItem, x: Math.min(event.clientX, window.innerWidth - 224), y: Math.min(event.clientY, window.innerHeight - 278) }); }} onDragEnter={(event) => { event.preventDefault(); setDropActive(true); }} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDropActive(false); }} onDrop={onDrop}>
      <div className="world" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
        {items.map((item) => <article
          data-result
          key={item.id}
          className={`result-card media-${item.mediaType || "image"} ${selectedIds.includes(item.id) ? "is-selected" : ""}`}
          style={{ transform: `translate(${item.x}px, ${item.y}px)`, width: item.width }}
          onPointerDown={(event) => beginDrag(event, item)}
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!selectedIds.includes(item.id)) setSelectedIds([item.id]);
            setContextMenu({ item, x: Math.min(event.clientX, window.innerWidth - 224), y: Math.min(event.clientY, window.innerHeight - 278) });
          }}
          onDoubleClick={() => {
            const rect = stageRef.current.getBoundingClientRect();
            const scale = Math.min(1.35, (rect.width * .62) / item.width);
            setView({ scale, x: rect.width / 2 - (item.x + item.width / 2) * scale, y: rect.height / 2 - (item.y + item.width / item.aspect / 2) * scale });
          }}
        >
          {(item.mediaType || "image") === "image" && <img src={item.src} alt={item.title} draggable="false" />}
          {item.mediaType === "video" && <><video src={item.src} controls preload="metadata" onPointerDown={(event) => event.stopPropagation()} /><button type="button" className="video-drag-handle" onPointerDown={(event) => beginDrag(event, item)} onDoubleClick={(event) => event.stopPropagation()} aria-label={`Move ${item.title}`} title={item.title}><DotsSix size={15} weight="bold" /><span>{item.title}</span></button></>}
          {item.mediaType === "audio" && <div className="audio-card"><MusicNotes size={30} weight="duotone" /><strong>{item.title}</strong><audio src={item.src} controls onPointerDown={(event) => event.stopPropagation()} /></div>}
          {item.mediaType === "text" && <div className="text-card"><TextT size={19} /><p>{item.content}</p></div>}
          <span className={`kind-chip ${item.kind}`}>{item.mediaType || "image"} · {item.kind}</span>
          {selectedIds.length === 1 && selected === item.id && <button className="resize-handle" aria-label={`Resize ${item.title}`} onPointerDown={(event) => beginResize(event, item)} />}
        </article>)}
      </div>

      {selectionRect && <div className="selection-marquee" style={{ left: selectionRect.x, top: selectionRect.y, width: selectionRect.width, height: selectionRect.height }} />}

      {!items.length && <button className="empty-state" onClick={() => setAddMenuOpen(true)}><ImageSquare size={26} /><strong>Add your first material</strong><span>{t("支持图片、视频、音频和文字，生成结果会自动出现。")}</span></button>}
      {dropActive && <div className="drop-overlay"><UploadSimple size={30} /><strong>{t("拖到这里添加素材")}</strong><span>{t("图片、视频、音频和 TXT")}</span></div>}
      {!!selectedItems.length && <div className="selection-actions" onPointerDown={(event) => event.stopPropagation()}><span className="selection-count">{selectedItems.length} selected</span>{selectedItems.length === 1 && selectedItem?.src && <button type="button" onClick={() => void downloadSelected()} aria-label={t("下载所选内容")} title={t("下载")}><DownloadSimple size={17} /></button>}<button type="button" onClick={removeSelected} aria-label={t("删除所选内容")} title={t("删除")}><Trash size={17} /></button></div>}
      <div className="canvas-tool-controls" onPointerDown={(event) => event.stopPropagation()}><button className={canvasMode === "select" ? "is-active" : ""} onClick={() => setCanvasMode("select")} aria-label={t("选择工具")} title={t("选择 / 框选 (V)")}><CursorClick size={17} /></button><button className={canvasMode === "pan" ? "is-active" : ""} onClick={() => setCanvasMode("pan")} aria-label={t("手型工具")} title={t("拖动画布 (H)，或按住 Space")}><Hand size={17} /></button></div>
      <div className="canvas-controls" onPointerDown={(event) => event.stopPropagation()}><button onClick={() => zoomAt(view.scale / 1.18, innerWidth / 2, innerHeight / 2)} aria-label="Zoom out"><Minus size={16} /></button><span>{Math.round(view.scale * 100)}%</span><button onClick={() => zoomAt(view.scale * 1.18, innerWidth / 2, innerHeight / 2)} aria-label="Zoom in"><Plus size={16} /></button><i /><button onClick={fitAll} aria-label="Fit all"><ArrowsInSimple size={17} /></button><button onClick={() => setView({ x: 0, y: 0, scale: .72 })} aria-label="Reset view"><CornersOut size={17} /></button></div>
    </main>

    {progress?.stage && progress.stage !== "idle" && <aside className={`agent-progress stage-${progress.stage}`}>
      <div className="progress-head"><span className="progress-pulse" /><strong>{progress.label || t("WeShop 正在处理")}</strong><small>{elapsed ? `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}` : progress.updatedAt ? new Date(progress.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</small></div>
      {progress.summary && <p>{progress.summary}</p>}
      <div className="progress-track"><span style={{ width: `${Math.max(3, Math.min(100, progress.percent ?? ({ interpreting: 8, researching: 14, planning: 22, "prompt-ready": 32, generating: 58, publishing: 92, complete: 100, error: 100 }[progress.stage] || 3)))}%` }} /></div>
      <div className="progress-meta">{progress.model && <span>{t("模型")} <b>{progress.model}</b></span>}{progress.promptStatus && <span>Prompt <b>{progress.promptStatus}</b></span>}{progress.outputPlan && <span>{t("输出")} <b>{progress.outputPlan}</b></span>}</div>
    </aside>}

    {contextMenu && <div className="context-menu" style={{ left: contextMenu.x, top: contextMenu.y }} onPointerDown={(event) => event.stopPropagation()}>
      <div className="context-heading"><span>{t(contextMenu.item.kind === "material" ? "素材" : "结果")}</span><strong>{contextMenu.item.title}</strong></div>
      {(contextMenu.item.mediaType || "image") === "image" && <><button onClick={() => queueOperation("reverse-prompt", contextMenu.item)}><Sparkle size={17} /><span><strong>{t("反推提示词")}</strong><small>{t("分析画面并生成可复用提示词")}</small></span></button><button onClick={() => queueOperation("upscale", contextMenu.item)}><MagicWand size={17} /><span><strong>{t("高清放大")}</strong><small>{t("通过 WeShop 增强清晰度")}</small></span></button></>}
      <button onClick={() => { setLightbox(contextMenu.item); setContextMenu(null); }}><MagnifyingGlassPlus size={17} /><span><strong>{t("查看大图")}</strong><small>{t("在画布上方预览原图")}</small></span></button>
      {(contextMenu.item.mediaType || "image") === "image" && <button onClick={() => { setEditDialog(contextMenu.item); setEditPrompt(""); setContextMenu(null); }}><PencilSimple size={17} /><span><strong>{t("局部编辑")}</strong><small>{t("描述需要修改的区域和内容")}</small></span></button>}
    </div>}

    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`查看 ${lightbox.title}`} onPointerDown={() => setLightbox(null)}>
      <button className="modal-close" onClick={() => setLightbox(null)} aria-label={t("关闭")}><X size={19} /></button>
      {(lightbox.mediaType || "image") === "image" && <img src={lightbox.src} alt={lightbox.title} onPointerDown={(event) => event.stopPropagation()} />}
      {lightbox.mediaType === "video" && <video className="lightbox-video" src={lightbox.src} controls autoPlay onPointerDown={(event) => event.stopPropagation()} />}
      {lightbox.mediaType === "audio" && <div className="lightbox-audio" onPointerDown={(event) => event.stopPropagation()}><MusicNotes size={54} weight="duotone" /><strong>{lightbox.title}</strong><audio src={lightbox.src} controls autoPlay /></div>}
      {lightbox.mediaType === "text" && <article className="lightbox-text" onPointerDown={(event) => event.stopPropagation()}>{lightbox.content}</article>}
      <div className="lightbox-caption"><strong>{lightbox.title}</strong><span>{t(lightbox.kind === "material" ? "素材" : "结果")}</span></div>
    </div>}

    {editDialog && <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-label={t("局部编辑")} onPointerDown={() => setEditDialog(null)}>
      <form className="edit-dialog" onPointerDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); if (!editPrompt.trim()) return; queueOperation("local-edit", editDialog, editPrompt.trim()); setEditDialog(null); }}>
        <div className="edit-preview"><img src={editDialog.src} alt={editDialog.title} /></div>
        <div className="edit-copy"><span className="eyebrow">LOCAL EDIT</span><h2>{t("想修改哪里？")}</h2><p>{t("描述区域和预期效果，agent 会通过 WeShop 生成新结果，原图不会被覆盖。")}</p><textarea autoFocus value={editPrompt} onChange={(event) => setEditPrompt(event.target.value)} placeholder={t("例如：把左上角的天空改成日落，保持人物和构图不变")} rows={4} /><div className="dialog-actions"><button type="button" onClick={() => setEditDialog(null)}>{t("取消")}</button><button className="submit-edit" type="submit" disabled={!editPrompt.trim()}><Sparkle size={16} />{t("提交编辑")}</button></div></div>
      </form>
    </div>}

    {textDialogOpen && <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-label={t("添加文字")} onPointerDown={() => setTextDialogOpen(false)}><form className="text-dialog" onPointerDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); addTextCard(); }}><span className="eyebrow">TEXT MATERIAL</span><h2>{t("添加文字到画布")}</h2><textarea autoFocus value={newText} onChange={(event) => setNewText(event.target.value)} placeholder={t("写下提示词、说明、脚本或任何需要保留的文字…")} rows={7} /><div className="dialog-actions"><button type="button" onClick={() => setTextDialogOpen(false)}>{t("取消")}</button><button className="submit-edit" type="submit" disabled={!newText.trim()}><TextT size={16} />{t("添加文字")}</button></div></form></div>}

    {apiDialogOpen && <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-label={t("配置 WeShop API Key")} onPointerDown={() => setApiDialogOpen(false)}><form className="api-key-dialog" onPointerDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); if (apiKeyDraft.trim()) void saveApiKey(apiKeyDraft.trim()); }}><div className="api-key-icon"><Key size={22} /></div><span className="eyebrow">WESHOP OPENAPI</span><h2>{t("连接 WeShop")}</h2><p>{t("密钥只保存在这台电脑的 Harness 主机中，不会写入画布、对话或浏览器存储。")}</p>{apiConfig?.configured && <div className="api-key-status"><CheckCircle size={16} weight="fill" /><span>{t("当前已配置")} · {t(apiConfig.source === "canvas" ? "画布私密存储" : apiConfig.source === "plugin" ? "插件设置" : "环境变量")}</span></div>}<label><span>API Key</span><input autoFocus type="password" autoComplete="off" value={apiKeyDraft} onChange={(event) => setApiKeyDraft(event.target.value)} placeholder={t(apiConfig?.configured ? "输入新密钥以替换当前配置" : "粘贴 WeShop API Key")} /></label><a href="https://www.weshop.ai/apiKey" target="_blank" rel="noreferrer">{t("获取 WeShop API Key ↗")}</a><div className="dialog-actions">{apiConfig?.source === "canvas" && <button type="button" className="clear-api-key" disabled={apiSaving} onClick={() => void saveApiKey("")}>{t("清除画布密钥")}</button>}<span /><button type="button" onClick={() => setApiDialogOpen(false)}>{t("取消")}</button><button className="submit-edit" type="submit" disabled={!apiKeyDraft.trim() || apiSaving}>{t(apiSaving ? "保存中…" : "安全保存")}</button></div></form></div>}

    {toast && <div className="toast"><span className="toast-dot" />{toast}<small>{t("在 DeepSeek 对话中继续即可执行")}</small></div>}

    {!embedded && <button className="weshop-exit" onClick={onExit} title="返回 DeepSeek Harness"><CaretDown size={0} />← Back to DSH</button>}    <input ref={fileRef} type="file" accept="image/*,video/*,audio/*,text/plain" multiple hidden onChange={importImages} />
  </div>;
}
