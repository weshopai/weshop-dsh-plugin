import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp, Stop, X } from "@phosphor-icons/react";

function textFromContent(content) {
  if (!Array.isArray(content)) return "";
  return content
    .filter((block) => block?.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

function chatRows(snapshot) {
  const rows = [];
  for (const key of snapshot?.chat?.order || []) {
    const node = snapshot.chat.nodes.get(key);
    if (!node || node.visibility === "hidden") continue;
    if (node.kind === "user" || node.kind === "steering") {
      const text = textFromContent(node.data?.content);
      if (text) rows.push({ key, role: "user", text });
      continue;
    }
    if (node.kind === "assistant-step") {
      const blocks = Array.isArray(node.data?.blocks) ? node.data.blocks : [];
      const text = blocks
        .filter((block) => block?.kind === "text")
        .map((block) => block.text)
        .join("\n")
        .trim();
      const tools = blocks.filter((block) => block?.kind === "tool-call").map((block) => block.name);
      if (text || tools.length > 0 || node.data?.status === "running") {
        rows.push({ key, role: "assistant", text, tools, running: node.data?.status === "running" });
      }
    }
  }
  return rows;
}

export function CanvasChat({ session, sessionTitle, onExit }) {
  const snapshot = useSyncExternalStore(
    (listener) => session.subscribe(listener),
    () => session.getSnapshot(),
    () => session.getSnapshot(),
  );
  const rows = useMemo(() => chatRows(snapshot), [snapshot]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [rows.length, snapshot?.running]);

  const send = async () => {
    const text = draft.trim();
    if (!text || sending || snapshot?.removed) return;
    setSending(true);
    setError("");
    setDraft("");
    try {
      const result = await session.prompt([{ type: "text", text }], "queue");
      if (!result.ok) throw new Error(result.error?.message || "消息发送失败");
    } catch (reason) {
      setDraft(text);
      setError(reason instanceof Error ? reason.message : String(reason));
    } finally {
      setSending(false);
    }
  };

  return (
    <aside className="canvas-chat" aria-label="WeShop conversation">
      <header className="canvas-chat-head">
        <div>
          <span>WESHOP SESSION</span>
          <strong>{sessionTitle || "当前对话"}</strong>
        </div>
        <button type="button" onClick={onExit} aria-label="关闭画布" title="返回 Harness">
          <X size={17} />
        </button>
      </header>

      <div className="canvas-chat-feed" ref={scrollRef}>
        {rows.length === 0 && (
          <div className="canvas-chat-empty">
            <span>画布与对话已连接</span>
            <p>在这里描述你想生成或修改的内容，消息会同步到当前 Harness 会话。</p>
          </div>
        )}
        {rows.map((row) => (
          <article key={row.key} className={`canvas-chat-message is-${row.role}`}>
            <span>{row.role === "user" ? "你" : "WeShop"}</span>
            {row.text && <p>{row.text}</p>}
            {row.tools?.length > 0 && (
              <small>{row.running ? "正在执行" : "已调用"} · {row.tools.join(" · ")}</small>
            )}
            {row.running && !row.text && row.tools?.length === 0 && <i>正在思考与创作…</i>}
          </article>
        ))}
      </div>

      <footer className="canvas-chat-compose">
        {error && <div className="canvas-chat-error">{error}</div>}
        <div className="canvas-chat-input">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send();
              }
            }}
            placeholder="继续和 WeShop 对话…"
            rows={2}
            disabled={snapshot?.removed}
          />
          {snapshot?.running ? (
            <button type="button" className="canvas-chat-stop" onClick={() => void session.cancel()} aria-label="停止生成">
              <Stop size={14} weight="fill" />
            </button>
          ) : (
            <button type="button" onClick={() => void send()} disabled={!draft.trim() || sending} aria-label="发送消息">
              <ArrowUp size={16} weight="bold" />
            </button>
          )}
        </div>
        <small>Enter 发送 · Shift + Enter 换行</small>
      </footer>
    </aside>
  );
}
