import { SquaresFour } from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";
import { injectWeshopStyles } from "./styles.js";
import { WeshopWorkspace } from "./CanvasWorkspace.jsx";
import { CanvasChat } from "./CanvasChat.jsx";
import { initialLocale, saveLocale } from "./i18n.js";

/**
 * Result canvas panel for the weshop-canvas agent mode. Registered into
 * the root `shell.overlay` list (additive — sits beside the shipped entries),
 * as a portable slide-over after a result is published. It deliberately avoids
 * changing Harness-owned layout DOM or CSS, and avoids the `details` column: the
 * AppFrame auto-closes `details` on session switch and only renders it for
 * non-blank sessions, both of which fight a persistent canvas split.
 */
function SplitPanel({ onExit, initialActionCursor, session, sessionTitle }) {
  const [selection, setSelection] = useState([]);
  const [locale, setLocaleState] = useState(initialLocale);
  const setLocale = (next) => { saveLocale(next); setLocaleState(next); };
  return (
    <div className="weshop-root weshop-split weshop-studio" style={{ position: "fixed", inset: 0, zIndex: 1500, pointerEvents: "auto", overflow: "hidden" }}>
      <main className="weshop-canvas-pane">
        <WeshopWorkspace onExit={onExit} onSelectionChange={setSelection} locale={locale} onLocaleChange={setLocale} embedded initialActionCursor={initialActionCursor} />
      </main>
      <CanvasChat session={session} sessionTitle={sessionTitle} selection={selection} locale={locale} onExit={onExit} />
    </div>
  );
}

/** Sidebar-footer action to reopen the canvas after it was closed. */
function WeshopOpenAction({ onOpen, sessions }) {
  const state = useSyncExternalStore(
    (listener) => sessions.list.subscribe(listener),
    () => sessions.list.getSnapshot(),
    () => sessions.list.getSnapshot(),
  );
  const current = state.current === undefined ? undefined : state.byId[state.current];
  if (current?.agentPreset !== WESHOP_PRESET) return null;
  return (
    <button
      type="button"
      onClick={() => onOpen()}
      title="Open weshop 2.0 canvas"
      aria-label="Open weshop 2.0 canvas"
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, border: 0, borderRadius: 8, color: "var(--dsw-fg-2, #4a4c47)", background: "transparent", cursor: "pointer" }}
    >
      <SquaresFour size={15} weight="fill" />
    </button>
  );
}

/** The agent preset id whose sessions get the conversation + canvas split. */
const WESHOP_PRESET = "weshop-canvas";

export const inject = ["slots", "sessions", "layout"];

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

  const openPanel = (initialActionCursor = Date.now()) => {
    if (disposePanel !== null) return;
    const state = ctx.sessions.list.getSnapshot();
    const sessionId = state.current;
    const current = sessionId === undefined ? undefined : state.byId[sessionId];
    const binding = sessionId === undefined ? undefined : ctx.sessions.binding(sessionId);
    if (sessionId === undefined || binding === undefined || current?.agentPreset !== WESHOP_PRESET) return;
    panelSessionId = sessionId;
    disposePanel = ctx.slots.register(
      { name: "shell.overlay", id: "weshop-canvas-right-panel", order: 10 },
      () => {
        const latest = ctx.sessions.list.getSnapshot();
        if (latest.current !== sessionId || latest.byId[sessionId]?.agentPreset !== WESHOP_PRESET) return null;
        return <SplitPanel
          initialActionCursor={initialActionCursor}
          session={binding.session}
          sessionTitle={state.byId[sessionId]?.title}
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
    const current = state.current === undefined ? undefined : state.byId[state.current];
    const weshop = current !== undefined && current.agentPreset === WESHOP_PRESET;
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
          () => <WeshopOpenAction onOpen={openPanel} sessions={ctx.sessions} />,
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
        openPanel(Math.min(...publishedResults.map((action) => Number(action.sequence))) - 1);
      }
    } catch { /* The Host contribution may still be starting or reloading. */ }
  };
  const actionTimer = window.setInterval(watchPublishedResults, 800);

  return () => {
    unsubscribe();
    window.clearInterval(actionTimer);
    if (disposePanel !== null) disposePanel();
    if (disposeAction !== null) disposeAction();
  };
}
