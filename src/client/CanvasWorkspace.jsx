import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowsInSimple, CornersOut, DownloadSimple, ImageSquare, MagicWand,
  CaretDown, MagnifyingGlassPlus, Minus, MusicNotes, PencilSimple, Plus,
  Sparkle, SquaresFour, TextT, Trash, UploadSimple, VideoCamera, X,
} from "@phosphor-icons/react";

const STORAGE_KEY = "weshop-2-0-dsh:spaces:v1";
const blankCanvas = (index = 1) => ({ id: `canvas-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title: index === 1 ? "Untitled space" : `Untitled space ${index}`, items: [], view: { x: 0, y: 0, scale: .72 } });
function restoreCanvases() {
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (saved?.length) return saved; } catch { /* Start clean. */ }
  return [blankCanvas()];
}

export function WeshopWorkspace({ onExit, embedded = false }) {
  const [canvases, setCanvases] = useState(restoreCanvases);
  const [activeCanvasId, setActiveCanvasId] = useState(canvases[0].id);
  const activeInitial = canvases.find((canvas) => canvas.id === activeCanvasId) || canvases[0];
  const [items, setItems] = useState(activeInitial.items);
  const [view, setView] = useState(activeInitial.view);
  const [selected, setSelected] = useState(null);
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
  const actionCursor = useRef(Date.now());

  useEffect(() => {
    setCanvases((all) => all.map((canvas) => canvas.id === activeCanvasId ? { ...canvas, title, items, view } : canvas));
  }, [activeCanvasId, items, title, view]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(canvases)); }, [canvases]);

  const canvasState = useMemo(() => {
    const describeItem = ({ src, localPath, ...item }) => ({
      ...item,
      asset: item.mediaType === "text"
        ? { transport: "inline-text", content: item.content || "", readableByAgent: true }
        : src?.startsWith("data:")
          ? { transport: "browser-data-url", readableByAgent: false }
          : { transport: "local-url", url: src ? new URL(src, window.location.origin).href : null, ...(localPath ? { localPath } : {}), readableByAgent: true },
    });
    const activeItem = items.find((item) => item.id === selected);
    return {
      version: 3,
      canvasId: activeCanvasId,
      title,
      updatedAt: new Date().toISOString(),
      viewport: view,
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
  }, [activeCanvasId, canvases, items, selected, title, view]);

  useEffect(() => {
    const timer = setTimeout(() => fetch("/api/weshop/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(canvasState),
    }).catch(() => undefined), 80);
    return () => clearTimeout(timer);
  }, [canvasState]);

  useEffect(() => {
    const applyActions = async () => {
      try {
        const response = await fetch(`/api/weshop/actions?after=${actionCursor.current}`);
        const data = await response.json();
        for (const action of data.actions || []) {
          actionCursor.current = Math.max(actionCursor.current, action.sequence || 0);
          if (action.type !== "add-asset" || (!action.payload?.url && !action.payload?.content)) continue;
          const payload = action.payload;
          const append = (aspect = payload.aspect || 1.5) => setItems((all) => {
            if (all.some((item) => item.id === payload.id)) return all;
            const index = all.length;
            return [...all, {
              id: payload.id,
              kind: "result",
              mediaType: payload.mediaType || "image",
              ...(payload.url ? { src: payload.url } : {}),
              ...(payload.content ? { content: payload.content } : {}),
              ...(payload.localPath ? { localPath: payload.localPath } : {}),
              title: payload.title || "Generated result",
              provenance: payload.provenance || { method: "agent-generation" },
              createdAt: payload.createdAt || new Date().toISOString(),
              x: (180 - view.x) / view.scale + (index % 3) * 34,
              y: (210 - view.y) / view.scale + (index % 4) * 30,
              width: payload.width || 460,
              aspect,
            }];
          });
          if ((payload.mediaType || "image") === "image") {
            const image = new Image();
            image.onload = () => append(image.naturalWidth / image.naturalHeight);
            image.src = payload.url;
          } else if (payload.mediaType === "video") {
            const video = document.createElement("video");
            video.onloadedmetadata = () => append(video.videoWidth / video.videoHeight || 16 / 9);
            video.src = payload.url;
          } else append(payload.mediaType === "audio" ? 2.6 : 1.35);
        }
      } catch { /* The local canvas bridge may still be starting. */ }
    };
    const timer = setInterval(applyActions, 1000);
    return () => clearInterval(timer);
  }, [view]);

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

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 3200);
  };

  const openCanvas = (canvas) => {
    setActiveCanvasId(canvas.id);
    setTitle(canvas.title);
    setItems(canvas.items || []);
    setView(canvas.view || { x: 0, y: 0, scale: .72 });
    setSelected(null);
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

  const beginPan = (event) => {
    if (event.button !== 0 || event.target.closest("[data-result]")) return;
    setSelected(null);
    gesture.current = { type: "pan", startX: event.clientX, startY: event.clientY, view };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const beginDrag = (event, item) => {
    event.stopPropagation();
    setSelected(item.id);
    gesture.current = { type: "item", id: item.id, startX: event.clientX, startY: event.clientY, x: item.x, y: item.y };
    stageRef.current.setPointerCapture(event.pointerId);
  };

  const beginResize = (event, item) => {
    event.stopPropagation();
    setSelected(item.id);
    gesture.current = { type: "resize", id: item.id, startX: event.clientX, width: item.width };
    stageRef.current.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    const current = gesture.current;
    if (!current) return;
    if (current.type === "pan") {
      setView({ ...current.view, x: current.view.x + event.clientX - current.startX, y: current.view.y + event.clientY - current.startY });
      return;
    }
    const dx = (event.clientX - current.startX) / view.scale;
    if (current.type === "resize") {
      const width = Math.min(1200, Math.max(120, current.width + dx));
      setItems((all) => all.map((item) => item.id === current.id ? { ...item, width } : item));
      return;
    }
    const dy = (event.clientY - current.startY) / view.scale;
    setItems((all) => all.map((item) => item.id === current.id ? { ...item, x: current.x + dx, y: current.y + dy } : item));
  };

  const arrange = () => {
    setItems((all) => all.map((item, index) => ({ ...item, x: 140 + (index % 3) * 470, y: 300 + Math.floor(index / 3) * 340 })));
    setView({ x: 0, y: 0, scale: .72 });
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
          setItems((all) => [...all, {
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
    setItems((all) => [...all, { id: `material-text-${Date.now()}`, kind: "material", mediaType: "text", title: newText.trim().split("\n")[0].slice(0, 48) || "Text", content: newText.trim(), provenance: { method: "canvas-text", source: "User text" }, createdAt: new Date().toISOString(), x: (180 - view.x) / view.scale + all.length * 28, y: (190 - view.y) / view.scale + all.length * 24, width: 360, aspect: 1.35 }]);
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
      notify(type === "reverse-prompt" ? "已提交反推提示词任务" : type === "upscale" ? "已提交高清放大任务" : "已提交局部编辑任务");
    } catch { notify("任务提交失败，请确认本地画布服务正在运行"); }
  };

  const removeSelected = () => {
    if (!selected) return;
    setItems((all) => all.filter((item) => item.id !== selected));
    setSelected(null);
  };

  useEffect(() => {
    const onKey = (event) => {
      if ((event.key === "Backspace" || event.key === "Delete") && !event.target.closest("input")) removeSelected();
      if (event.key === "0" && !event.target.closest("input")) fitAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return <div className={`pure-canvas-shell${embedded ? " is-embedded" : ""}`}>
    <header className="topbar">
      <div className="brand-mark"><SquaresFour weight="fill" size={16} /></div>
      <div className="canvas-switcher">
        <input className="space-title" value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Space title" />
        <button className="switcher-trigger" onClick={() => setCanvasMenuOpen((open) => !open)} aria-label="管理画布" aria-expanded={canvasMenuOpen}><CaretDown size={13} /></button>
        {canvasMenuOpen && <div className="canvas-menu">
          <div className="canvas-menu-label">CANVASES</div>
          {canvases.map((canvas) => <button key={canvas.id} className={canvas.id === activeCanvasId ? "is-active" : ""} onClick={() => openCanvas(canvas)}><span>{canvas.id === activeCanvasId ? title : canvas.title}</span><small>{canvas.id === activeCanvasId ? items.length : canvas.items.length}</small></button>)}
          <div className="canvas-menu-actions"><button onClick={createCanvas}><Plus size={14} />新建画布</button><button className="delete-canvas" onClick={deleteCanvas}><Trash size={14} />删除当前</button></div>
        </div>}
      </div>
      <span className="saved-state">Saved locally</span>
      <div className="topbar-actions">
        <button className="quiet-button" onClick={arrange}><SquaresFour size={17} /> Arrange</button>
        <div className="add-menu-wrap"><button className="primary-button" onClick={() => setAddMenuOpen((open) => !open)}><UploadSimple size={17} /> Add <CaretDown size={11} /></button>{addMenuOpen && <div className="add-menu"><button onClick={() => { fileRef.current.click(); setAddMenuOpen(false); }}><UploadSimple size={16} /><span><strong>上传文件</strong><small>图片、视频、音频、TXT</small></span></button><button onClick={() => { setTextDialogOpen(true); setAddMenuOpen(false); }}><TextT size={16} /><span><strong>添加文字</strong><small>直接写入画布</small></span></button></div>}</div>
      </div>
    </header>

    <main ref={stageRef} className={`canvas ${dropActive ? "is-drop-active" : ""}`} onWheel={onWheel} onPointerDown={(event) => { setContextMenu(null); beginPan(event); }} onPointerMove={onPointerMove} onPointerUp={() => { gesture.current = null; }} onPointerCancel={() => { gesture.current = null; }} onContextMenu={(event) => { if (!selectedItem || event.target.closest("[data-result]")) return; event.preventDefault(); setContextMenu({ item: selectedItem, x: Math.min(event.clientX, window.innerWidth - 224), y: Math.min(event.clientY, window.innerHeight - 278) }); }} onDragEnter={(event) => { event.preventDefault(); setDropActive(true); }} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "copy"; }} onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDropActive(false); }} onDrop={onDrop}>
      <div className="world" style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
        {items.map((item) => <article
          data-result
          key={item.id}
          className={`result-card ${selected === item.id ? "is-selected" : ""}`}
          style={{ transform: `translate(${item.x}px, ${item.y}px)`, width: item.width }}
          onPointerDown={(event) => beginDrag(event, item)}
          onContextMenu={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setSelected(item.id);
            setContextMenu({ item, x: Math.min(event.clientX, window.innerWidth - 224), y: Math.min(event.clientY, window.innerHeight - 278) });
          }}
          onDoubleClick={() => {
            const rect = stageRef.current.getBoundingClientRect();
            const scale = Math.min(1.35, (rect.width * .62) / item.width);
            setView({ scale, x: rect.width / 2 - (item.x + item.width / 2) * scale, y: rect.height / 2 - (item.y + item.width / item.aspect / 2) * scale });
          }}
        >
          {(item.mediaType || "image") === "image" && <img src={item.src} alt={item.title} draggable="false" />}
          {item.mediaType === "video" && <video src={item.src} controls preload="metadata" onPointerDown={(event) => event.stopPropagation()} />}
          {item.mediaType === "audio" && <div className="audio-card"><MusicNotes size={30} weight="duotone" /><strong>{item.title}</strong><audio src={item.src} controls onPointerDown={(event) => event.stopPropagation()} /></div>}
          {item.mediaType === "text" && <div className="text-card"><TextT size={19} /><p>{item.content}</p></div>}
          <span className={`kind-chip ${item.kind}`}>{item.mediaType || "image"} · {item.kind}</span>
          {selected === item.id && <button className="resize-handle" aria-label={`Resize ${item.title}`} onPointerDown={(event) => beginResize(event, item)} />}
        </article>)}
      </div>

      {!items.length && <button className="empty-state" onClick={() => setAddMenuOpen(true)}><ImageSquare size={26} /><strong>Add your first material</strong><span>支持图片、视频、音频和文字，生成结果会自动出现。</span></button>}
      {dropActive && <div className="drop-overlay"><UploadSimple size={30} /><strong>拖到这里添加素材</strong><span>图片、视频、音频和 TXT</span></div>}
      {selectedItem && <div className="selection-actions">{selectedItem.src && <a href={selectedItem.src} download={selectedItem.title} aria-label="Download selected"><DownloadSimple size={17} /></a>}<button onClick={removeSelected} aria-label="Delete selected"><Trash size={17} /></button></div>}
      <div className="canvas-controls"><button onClick={() => zoomAt(view.scale / 1.18, innerWidth / 2, innerHeight / 2)} aria-label="Zoom out"><Minus size={16} /></button><span>{Math.round(view.scale * 100)}%</span><button onClick={() => zoomAt(view.scale * 1.18, innerWidth / 2, innerHeight / 2)} aria-label="Zoom in"><Plus size={16} /></button><i /><button onClick={fitAll} aria-label="Fit all"><ArrowsInSimple size={17} /></button><button onClick={() => setView({ x: 0, y: 0, scale: .72 })} aria-label="Reset view"><CornersOut size={17} /></button></div>
    </main>

    {progress?.stage && progress.stage !== "idle" && <aside className={`agent-progress stage-${progress.stage}`}>
      <div className="progress-head"><span className="progress-pulse" /><strong>{progress.label || "WeShop 正在处理"}</strong><small>{elapsed ? `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}` : progress.updatedAt ? new Date(progress.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</small></div>
      {progress.summary && <p>{progress.summary}</p>}
      <div className="progress-track"><span style={{ width: `${Math.max(3, Math.min(100, progress.percent ?? ({ interpreting: 8, researching: 14, planning: 22, "prompt-ready": 32, generating: 58, publishing: 92, complete: 100, error: 100 }[progress.stage] || 3)))}%` }} /></div>
      <div className="progress-meta">{progress.model && <span>模型 <b>{progress.model}</b></span>}{progress.promptStatus && <span>Prompt <b>{progress.promptStatus}</b></span>}{progress.outputPlan && <span>输出 <b>{progress.outputPlan}</b></span>}</div>
    </aside>}

    {contextMenu && <div className="context-menu" style={{ left: contextMenu.x, top: contextMenu.y }} onPointerDown={(event) => event.stopPropagation()}>
      <div className="context-heading"><span>{contextMenu.item.kind === "material" ? "素材" : "结果"}</span><strong>{contextMenu.item.title}</strong></div>
      {(contextMenu.item.mediaType || "image") === "image" && <><button onClick={() => queueOperation("reverse-prompt", contextMenu.item)}><Sparkle size={17} /><span><strong>反推提示词</strong><small>分析画面并生成可复用提示词</small></span></button><button onClick={() => queueOperation("upscale", contextMenu.item)}><MagicWand size={17} /><span><strong>高清放大</strong><small>通过 WeShop 增强清晰度</small></span></button></>}
      <button onClick={() => { setLightbox(contextMenu.item); setContextMenu(null); }}><MagnifyingGlassPlus size={17} /><span><strong>查看大图</strong><small>在画布上方预览原图</small></span></button>
      {(contextMenu.item.mediaType || "image") === "image" && <button onClick={() => { setEditDialog(contextMenu.item); setEditPrompt(""); setContextMenu(null); }}><PencilSimple size={17} /><span><strong>局部编辑</strong><small>描述需要修改的区域和内容</small></span></button>}
    </div>}

    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`查看 ${lightbox.title}`} onPointerDown={() => setLightbox(null)}>
      <button className="modal-close" onClick={() => setLightbox(null)} aria-label="关闭"><X size={19} /></button>
      {(lightbox.mediaType || "image") === "image" && <img src={lightbox.src} alt={lightbox.title} onPointerDown={(event) => event.stopPropagation()} />}
      {lightbox.mediaType === "video" && <video className="lightbox-video" src={lightbox.src} controls autoPlay onPointerDown={(event) => event.stopPropagation()} />}
      {lightbox.mediaType === "audio" && <div className="lightbox-audio" onPointerDown={(event) => event.stopPropagation()}><MusicNotes size={54} weight="duotone" /><strong>{lightbox.title}</strong><audio src={lightbox.src} controls autoPlay /></div>}
      {lightbox.mediaType === "text" && <article className="lightbox-text" onPointerDown={(event) => event.stopPropagation()}>{lightbox.content}</article>}
      <div className="lightbox-caption"><strong>{lightbox.title}</strong><span>{lightbox.kind === "material" ? "素材" : "结果"}</span></div>
    </div>}

    {editDialog && <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-label="局部编辑" onPointerDown={() => setEditDialog(null)}>
      <form className="edit-dialog" onPointerDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); if (!editPrompt.trim()) return; queueOperation("local-edit", editDialog, editPrompt.trim()); setEditDialog(null); }}>
        <div className="edit-preview"><img src={editDialog.src} alt={editDialog.title} /></div>
        <div className="edit-copy"><span className="eyebrow">LOCAL EDIT</span><h2>想修改哪里？</h2><p>描述区域和预期效果，agent 会通过 WeShop 生成新结果，原图不会被覆盖。</p><textarea autoFocus value={editPrompt} onChange={(event) => setEditPrompt(event.target.value)} placeholder="例如：把左上角的天空改成日落，保持人物和构图不变" rows={4} /><div className="dialog-actions"><button type="button" onClick={() => setEditDialog(null)}>取消</button><button className="submit-edit" type="submit" disabled={!editPrompt.trim()}><Sparkle size={16} />提交编辑</button></div></div>
      </form>
    </div>}

    {textDialogOpen && <div className="dialog-backdrop" role="dialog" aria-modal="true" aria-label="添加文字" onPointerDown={() => setTextDialogOpen(false)}><form className="text-dialog" onPointerDown={(event) => event.stopPropagation()} onSubmit={(event) => { event.preventDefault(); addTextCard(); }}><span className="eyebrow">TEXT MATERIAL</span><h2>添加文字到画布</h2><textarea autoFocus value={newText} onChange={(event) => setNewText(event.target.value)} placeholder="写下提示词、说明、脚本或任何需要保留的文字…" rows={7} /><div className="dialog-actions"><button type="button" onClick={() => setTextDialogOpen(false)}>取消</button><button className="submit-edit" type="submit" disabled={!newText.trim()}><TextT size={16} />添加文字</button></div></form></div>}

    {toast && <div className="toast"><span className="toast-dot" />{toast}<small>在 DeepSeek 对话中继续即可执行</small></div>}

    {!embedded && <button className="weshop-exit" onClick={onExit} title="返回 DeepSeek Harness"><CaretDown size={0} />← Back to DSH</button>}    <input ref={fileRef} type="file" accept="image/*,video/*,audio/*,text/plain" multiple hidden onChange={importImages} />
  </div>;
}
