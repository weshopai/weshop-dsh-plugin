import { useSyncExternalStore } from "react";
import { SquaresFour } from "@phosphor-icons/react";
import { injectWeshopStyles } from "./styles.js";
import { WeshopWorkspace } from "./CanvasWorkspace.jsx";

/**
 * Shared canvas visibility controller: the overlay and the sidebar-footer
 * reopen action cooperate through it.
 */
function createVisibility(initial) {
  let open = initial;
  const listeners = new Set();
  return {
    isOpen: () => open,
    open: () => { if (!open) { open = true; listeners.forEach((l) => l()); } },
    close: () => { if (open) { open = false; listeners.forEach((l) => l()); } },
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
  };
}

/** Full-screen canvas layer in the 'shell.overlay' list slot (additive, above the app). */
function CanvasOverlay({ visibility }) {
  const open = useSyncExternalStore(visibility.subscribe, visibility.isOpen);
  // Kept mounted while hidden so canvas state survives a toggle back.
  return (
    <div className="weshop-root" style={{ position: "fixed", inset: 0, zIndex: 2000, pointerEvents: "auto", overflow: "hidden", display: open ? undefined : "none" }}>
      <WeshopWorkspace onExit={() => visibility.close()} />
    </div>
  );
}

/**
 * Right-side canvas panel for the weshop-canvas agent mode. Registered into
 * the root `shell.overlay` list (additive — sits beside the shipped entries),
 * covering only the right half of the frame so the conversation stays visible
 * and usable on the left. This deliberately avoids the `details` column: the
 * AppFrame auto-closes `details` on session switch and only renders it for
 * non-blank sessions, both of which fight a persistent canvas split.
 */
function SplitPanel({ onExit }) {
  return (
    <div className="weshop-root weshop-split" style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(54vw, 880px)", zIndex: 1500, pointerEvents: "auto", overflow: "hidden" }}>
      <WeshopWorkspace onExit={onExit} embedded />
    </div>
  );
}

/** Sidebar-footer action to reopen the canvas after it was closed. */
function WeshopOpenAction({ visibility }) {
  return (
    <button
      type="button"
      onClick={() => visibility.open()}
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
  const visibility = createVisibility(true);

  // In the weshop-canvas mode the canvas lives in a right-side panel beside
  // the conversation. Register/dispose that panel as the active session's
  // preset changes. shell.overlay is a root list slot: additive, no
  // auto-close, no blank-session gate — stable across session switches.
  let disposePanel = null;
  const sync = () => {
    const state = ctx.sessions.list.getSnapshot();
    const current = state.current === undefined ? undefined : state.byId[state.current];
    const weshop = current !== undefined && current.agentPreset === WESHOP_PRESET;
    if (weshop) {
      visibility.close();
      if (disposePanel === null) {
        disposePanel = ctx.slots.register(
          { name: "shell.overlay", id: "weshop-canvas-right-panel", order: 10 },
          (props) => React.createElement(SplitPanel, {
            onExit: () => { if (disposePanel !== null) { disposePanel(); disposePanel = null; } },
          }),
        );
      }
    } else if (disposePanel !== null) {
      disposePanel();
      disposePanel = null;
      if (!visibility.isOpen()) visibility.open();
    }
  };

  const unsubscribe = ctx.sessions.list.subscribe(sync);
  sync();

  ctx.slots.inject("shell.overlay", () => ctx.slots.register(
    { name: "shell.overlay", id: "weshop-canvas", inject: () => ({ visibility }) },
    CanvasOverlay,
  ));
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register(
    { name: "sidebar.footer.action", id: "weshop-canvas-open", inject: () => ({ visibility }) },
    WeshopOpenAction,
  ));

  return () => { unsubscribe(); if (disposePanel !== null) disposePanel(); };
}
