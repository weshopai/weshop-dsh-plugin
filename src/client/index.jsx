import { SquaresFour } from "@phosphor-icons/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { injectWeshopStyles } from "./styles.js";
import { WeshopWorkspace } from "./CanvasWorkspace.jsx";
import { CanvasChat } from "./CanvasChat.jsx";

function useHarnessLocale(locale) {
  const snapshot = useSyncExternalStore(
    (listener) => locale.subscribe(listener),
    () => locale.getSnapshot(),
    () => locale.getSnapshot(),
  );
  return /^zh\b/i.test(snapshot.active) ? "zh-CN" : "en";
}

/**
 * Result canvas panel for the weshop-canvas agent mode. Registered into
 * the root `shell.overlay` list (additive — sits beside the shipped entries),
 * as a portable slide-over after a result is published. It deliberately avoids
 * changing Harness-owned layout DOM or CSS, and avoids the `details` column: the
 * AppFrame auto-closes `details` on session switch and only renders it for
 * non-blank sessions, both of which fight a persistent canvas split.
 */
function SplitPanel({ onExit, initialActionCursor, session, sessionTitle, harnessLocale }) {
  const [selection, setSelection] = useState([]);
  const locale = useHarnessLocale(harnessLocale);
  const setLocale = (next) => harnessLocale.setLocale(next === "zh-CN" ? "zh" : "en");
  // Rendered via a body-level portal, not in place: the host mounts `shell.overlay`
  // registrations inside its own AppFrame `.overlayLayer` (position:absolute, z-index:20),
  // which caps every z-index set here regardless of value. dsh-web-ui's retro-OS skins
  // (xp/ths/qq98/trading/miku) append their title/status bar straight to <body> at
  // z-index 1_000_000, so without the portal they always paint over this canvas.
  return createPortal(
    <div className="weshop-root weshop-split weshop-studio" style={{ position: "fixed", inset: 0, zIndex: 1000001, pointerEvents: "auto", overflow: "hidden" }}>
      <main className="weshop-canvas-pane">
        <WeshopWorkspace onExit={onExit} onSelectionChange={setSelection} locale={locale} onLocaleChange={setLocale} embedded initialActionCursor={initialActionCursor} />
      </main>
      <CanvasChat session={session} sessionTitle={sessionTitle} selection={selection} locale={locale} onExit={onExit} />
    </div>,
    document.body,
  );
}

/** Sidebar-footer action to reopen the canvas after it was closed. */
function WeshopOpenAction({ onOpen, sessions, presetFor }) {
  const state = useSyncExternalStore(
    (listener) => sessions.list.subscribe(listener),
    () => sessions.list.getSnapshot(),
    () => sessions.list.getSnapshot(),
  );
  if (presetFor(state) !== WESHOP_PRESET) return null;
  return (
    <button
      type="button"
      onClick={() => onOpen()}
      data-weshop-canvas-trigger
      title="Open WeShop canvas"
      aria-label="Open WeShop canvas"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, border: 0, borderRadius: 12, color: "#fff", background: "#242723", boxShadow: "0 6px 16px rgba(23, 28, 24, .18)", cursor: "pointer" }}
    >
      <SquaresFour size={21} weight="fill" />
    </button>
  );
}

function CanvasOnboarding({ locale, onDismiss, onTimeout }) {
  const [targetRect, setTargetRect] = useState(null);
  useEffect(() => {
    const updateTarget = () => {
      const target = document.querySelector("[data-weshop-canvas-trigger]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      setTargetRect({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    };
    const frame = window.requestAnimationFrame(updateTarget);
    window.addEventListener("resize", updateTarget);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);
  useEffect(() => {
    const timeout = window.setTimeout(onTimeout, 5200);
    return () => window.clearTimeout(timeout);
  }, [onTimeout]);
  const ringStyle = targetRect ? {
    left: targetRect.left - 10,
    top: targetRect.top - 10,
    width: targetRect.width + 20,
    height: targetRect.height + 20,
  } : { opacity: 0 };
  const copyStyle = targetRect ? { left: Math.min(targetRect.left + targetRect.width + 18, window.innerWidth - 272), bottom: Math.max(18, window.innerHeight - targetRect.top + 12) } : { opacity: 0 };
  const zh = useHarnessLocale(locale) === "zh-CN";
  // Same overlayLayer-escape reasoning as SplitPanel above — portal to <body> so this
  // still floats above body-level chrome like the retro-skin title/status bars.
  return createPortal(
    <div className="weshop-root weshop-canvas-onboarding" aria-live="polite">
      <div className="weshop-onboarding-veil" />
      <div className="weshop-onboarding-ring" style={ringStyle}><SquaresFour size={22} weight="fill" /></div>
      <section className="weshop-onboarding-copy" style={copyStyle}>
        <span>{zh ? "WESHOP 画布" : "WESHOP CANVAS"}</span>
        <strong>{zh ? "从这里打开画布" : "Open your canvas here"}</strong>
        <p>{zh ? "点击即可边聊边看。" : "Click to create and chat side by side."}</p>
        <button type="button" onClick={onDismiss}>{zh ? "我知道了" : "Got it"}</button>
      </section>
    </div>,
    document.body,
  );
}

/** The agent preset id whose sessions get the conversation + canvas split. */
const WESHOP_PRESET = "weshop-canvas";

export const inject = ["slots", "sessions", "layout", "remote", "locale"];

export function apply(ctx) {
  injectWeshopStyles();

  // The WeShop preset keeps the normal conversation visible while work runs.
  // A successful publish action opens the canvas; the footer action allows a
  // manual open. Both contributions disappear outside the WeShop preset.
  let disposePanel = null;
  let disposeAction = null;
  let weshopActive = false;
  let panelSessionId = null;
  let actionCursor = Date.now();
  let disposeCanvasOnboarding = null;
  let resultOpenTimer = null;
  let pendingResultCursor = null;
  // Running/status updates can briefly replace a session summary without its
  // preset. Retain the last host-confirmed preset per session so the canvas
  // action does not flicker out halfway through a turn. Explicit preset-change
  // events below update this cache immediately, so switching back to Standard
  // still removes the action without waiting for a list refresh.
  const presetBySession = new Map();
  const presetFor = (state, sessionId = state.current) => {
    if (sessionId === undefined) return undefined;
    const listed = state.byId[sessionId]?.agentPreset;
    if (listed !== undefined) presetBySession.set(sessionId, listed);
    return listed ?? presetBySession.get(sessionId);
  };
  const hideCanvasOnboarding = () => {
    if (disposeCanvasOnboarding !== null) disposeCanvasOnboarding();
    disposeCanvasOnboarding = null;
  };
  const showCanvasOnboarding = () => {
    if (disposeCanvasOnboarding !== null) return;
    disposeCanvasOnboarding = ctx.slots.register(
      { name: "shell.overlay", id: "weshop-canvas-onboarding", order: 95 },
      () => <CanvasOnboarding locale={ctx.locale} onDismiss={hideCanvasOnboarding} onTimeout={hideCanvasOnboarding} />,
    );
  };

  const openPanel = (initialActionCursor = Date.now()) => {
    if (disposePanel !== null) return;
    const state = ctx.sessions.list.getSnapshot();
    const sessionId = state.current;
    const binding = sessionId === undefined ? undefined : ctx.sessions.binding(sessionId);
    if (sessionId === undefined || binding === undefined || presetFor(state, sessionId) !== WESHOP_PRESET) return;
    hideCanvasOnboarding();
    panelSessionId = sessionId;
    disposePanel = ctx.slots.register(
      { name: "shell.overlay", id: "weshop-canvas-right-panel", order: 10 },
      () => {
        const latest = ctx.sessions.list.getSnapshot();
        if (latest.current !== sessionId || presetFor(latest, sessionId) !== WESHOP_PRESET) return null;
        return <SplitPanel
          initialActionCursor={initialActionCursor}
          session={binding.session}
          sessionTitle={state.byId[sessionId]?.title}
          harnessLocale={ctx.locale}
          onExit={() => {
            if (disposePanel !== null) {
              disposePanel();
              disposePanel = null;
              panelSessionId = null;
            }
          }}
        />;
      },
    );
  };

  const sync = () => {
    const state = ctx.sessions.list.getSnapshot();
    const weshop = presetFor(state) === WESHOP_PRESET;
    const sessionChanged = panelSessionId !== null && panelSessionId !== state.current;
    const reopenForSession = sessionChanged && disposePanel !== null;
    weshopActive = weshop;
    if (sessionChanged && disposePanel !== null) {
      disposePanel();
      disposePanel = null;
      panelSessionId = null;
    }
    if (weshop) {
      if (disposeAction === null) {
        disposeAction = ctx.slots.register(
          { name: "sidebar.footer.action", id: "weshop-canvas-open", order: 10 },
          () => <WeshopOpenAction onOpen={openPanel} sessions={ctx.sessions} presetFor={presetFor} />,
        );
      }
      if (reopenForSession) openPanel();
    } else {
      if (disposePanel !== null) {
        disposePanel();
        disposePanel = null;
        panelSessionId = null;
      }
      if (disposeAction !== null) {
        disposeAction();
        disposeAction = null;
      }
    }
  };

  const unsubscribe = ctx.sessions.list.subscribe(sync);
  const presetSelected = ctx.remote.$on("agent-preset/selected", (sessionId, agentPreset) => {
    const previous = presetBySession.get(sessionId);
    presetBySession.set(sessionId, agentPreset);
    sync();
    if (ctx.sessions.list.getSnapshot().current === sessionId && previous !== agentPreset) {
      if (agentPreset === WESHOP_PRESET) window.setTimeout(showCanvasOnboarding, 0);
    }
  });
  sync();

  const watchPublishedResults = async () => {
    try {
      const response = await fetch(`/api/weshop/actions?after=${actionCursor}`);
      if (!response.ok) return;
      const data = await response.json();
      const actions = Array.isArray(data.actions) ? data.actions : [];
      for (const action of actions) {
        actionCursor = Math.max(actionCursor, Number(action.sequence) || 0);
      }
      const publishedResults = actions.filter((action) => (
        action.type === "add-asset" && action.payload?.kind === "result"
      ));
      if (weshopActive && publishedResults.length > 0) {
        const firstSequence = Math.min(...publishedResults.map((action) => Number(action.sequence))) - 1;
        pendingResultCursor = pendingResultCursor === null ? firstSequence : Math.min(pendingResultCursor, firstSequence);
        if (resultOpenTimer !== null) window.clearTimeout(resultOpenTimer);
        resultOpenTimer = window.setTimeout(() => {
          if (weshopActive && pendingResultCursor !== null) openPanel(pendingResultCursor);
          pendingResultCursor = null;
          resultOpenTimer = null;
        }, 900);
      }
    } catch { /* The Host contribution may still be starting or reloading. */ }
  };
  const actionTimer = window.setInterval(watchPublishedResults, 800);

  return () => {
    unsubscribe();
    presetSelected();
    window.clearInterval(actionTimer);
    if (resultOpenTimer !== null) window.clearTimeout(resultOpenTimer);
    if (disposeCanvasOnboarding !== null) disposeCanvasOnboarding();
    if (disposePanel !== null) disposePanel();
    if (disposeAction !== null) disposeAction();
  };
}
