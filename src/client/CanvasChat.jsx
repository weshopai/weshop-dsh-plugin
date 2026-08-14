import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp, Stop, X } from "@phosphor-icons/react";

function CanvasQuestion({ wait }) {
  const questions = wait.payload.questions || [];
  const [index, setIndex] = useState(0);
  const [drafts, setDrafts] = useState(() => questions.map(() => ({ selected: [], custom: "", skipped: false })));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const question = questions[index];
  const draft = drafts[index];

  if (!question || !draft) return null;

  const update = (next) => {
    setDrafts((current) => current.map((item, itemIndex) => itemIndex === index ? next(item) : item));
    setError("");
  };
  const choose = (label) => update((current) => ({
    ...current,
    selected: question.multiSelect
      ? current.selected.includes(label)
        ? current.selected.filter((item) => item !== label)
        : [...current.selected, label]
      : [label],
    custom: question.multiSelect ? current.custom : "",
    skipped: false,
  }));
  const completed = (value) => value.skipped || value.selected.length > 0 || value.custom.trim() !== "";
  const submit = async (values = drafts) => {
    const missing = values.findIndex((value) => !completed(value));
    if (missing >= 0) {
      setIndex(missing);
      setError("请选择一个选项或输入回答");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const receipt = await wait.respond({
        ok: true,
        value: {
          sessionId: wait.sessionId,
          answer: {
            answers: questions.map((item, itemIndex) => {
              const value = values[itemIndex];
              const custom = value.custom.trim();
              return {
                id: item.id,
                selected: value.skipped || (custom && !item.multiSelect) ? [] : value.selected,
                ...(custom ? { custom } : {}),
              };
            }),
          },
        },
      });
      if (!receipt.accepted) throw new Error(`回答未被接受：${receipt.reason}`);
    } catch (reason) {
      setBusy(false);
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  };
  const continueFlow = () => {
    if (!completed(draft)) {
      setError("请选择一个选项或输入回答");
      return;
    }
    if (index < questions.length - 1) setIndex(index + 1);
    else void submit();
  };
  const skip = () => {
    const values = drafts.map((item, itemIndex) => itemIndex === index
      ? { selected: [], custom: "", skipped: true }
      : item);
    setDrafts(values);
    if (index < questions.length - 1) setIndex(index + 1);
    else void submit(values);
  };
  const cancel = async () => {
    setBusy(true);
    try {
      const receipt = await wait.respond({ ok: false, error: { code: "cancelled", message: "the user closed this question request", details: {} } });
      if (!receipt.accepted) throw new Error(`取消未被接受：${receipt.reason}`);
    } catch (reason) {
      setBusy(false);
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  };

  return (
    <section className="canvas-question" aria-labelledby={`canvas-question-${question.id}`}>
      <div className="canvas-question-head">
        <div>
          <span>{question.header || "需要你的选择"}</span>
          <strong id={`canvas-question-${question.id}`}>{question.question}</strong>
        </div>
        <button type="button" onClick={() => void cancel()} disabled={busy} aria-label="取消问题"><X size={14} /></button>
      </div>
      {question.detail && <p className="canvas-question-detail">{question.detail}</p>}
      {(question.options || []).length > 0 && (
        <div className="canvas-question-options">
          {question.options.map((option, optionIndex) => {
            const selected = draft.selected.includes(option.label);
            return (
              <button type="button" key={`${option.label}-${optionIndex}`} className={selected ? "is-selected" : ""} onClick={() => choose(option.label)} disabled={busy}>
                <i>{question.multiSelect ? (selected ? "✓" : "") : optionIndex + 1}</i>
                <span><b>{option.label.replace(/\s*[（(](?:推荐|recommended)[）)]\s*$/i, "")}</b>{option.description && <small>{option.description}</small>}</span>
              </button>
            );
          })}
        </div>
      )}
      <textarea
        value={draft.custom}
        onChange={(event) => update((current) => ({ ...current, custom: event.target.value, selected: question.multiSelect ? current.selected : [], skipped: false }))}
        placeholder={(question.options || []).length ? "或者输入自己的答案" : "输入你的答案"}
        rows={2}
        disabled={busy}
      />
      {error && <div className="canvas-chat-error">{error}</div>}
      <div className="canvas-question-actions">
        <span>{index + 1} / {questions.length}</span>
        <button type="button" onClick={skip} disabled={busy}>跳过</button>
        <button type="button" className="is-primary" onClick={continueFlow} disabled={busy}>{index < questions.length - 1 ? "下一题" : "提交"}</button>
      </div>
    </section>
  );
}

function CanvasApproval({ wait }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const answer = async (outcome) => {
    setBusy(true);
    setError("");
    try {
      const receipt = await wait.respond({ ok: true, value: { sessionId: wait.sessionId, approvalId: wait.payload.approvalId, outcome } });
      if (!receipt.accepted) throw new Error(`审批未被接受：${receipt.reason}`);
    } catch (reason) {
      setBusy(false);
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  };
  return (
    <section className="canvas-question canvas-approval">
      <div className="canvas-question-head"><div><span>需要授权</span><strong>{wait.payload.reason || wait.payload.toolName || "允许执行此操作？"}</strong></div></div>
      {wait.payload.toolName && <p className="canvas-question-detail">工具：{wait.payload.toolName}</p>}
      {error && <div className="canvas-chat-error">{error}</div>}
      <div className="canvas-question-actions"><span /><button type="button" onClick={() => void answer("rejected")} disabled={busy}>拒绝</button><button type="button" className="is-primary" onClick={() => void answer("allowed-once")} disabled={busy}>允许一次</button></div>
    </section>
  );
}

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
  const pendingInteraction = snapshot?.pending?.find((item) => item.kind === "question")
    || snapshot?.pending?.find((item) => item.kind === "approval");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [apiConfig, setApiConfig] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("/api/weshop/config")
      .then((response) => response.ok ? response.json() : null)
      .then(setApiConfig)
      .catch(() => setApiConfig(null));
  }, []);

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
        {apiConfig?.configured === false && (
          <div className="canvas-api-notice" role="status">
            <strong>需要配置 WeShop API Key</strong>
            <p>打开 DSH 设置 → 插件 → weshop2.0，填写 API Key 后即可生成。也可以在启动 Harness 前设置 WESHOP_API_KEY。</p>
          </div>
        )}
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

      {pendingInteraction?.kind === "question" ? (
        <CanvasQuestion key={pendingInteraction.key} wait={pendingInteraction} />
      ) : pendingInteraction?.kind === "approval" ? (
        <CanvasApproval key={pendingInteraction.key} wait={pendingInteraction} />
      ) : <footer className="canvas-chat-compose">
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
      </footer>}
    </aside>
  );
}
