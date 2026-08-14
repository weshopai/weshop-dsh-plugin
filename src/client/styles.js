/**
 * WeShop for DeepSeek Harness styles, scoped under .weshop-root so they never
 * leak into the DSH shell. The Google Fonts @import is dropped (DSH page
 * CSP); DM Sans / Manrope fall back to system fonts.
 */
const CSS = `
.weshop-root { font-family: "DM Sans", system-ui, -apple-system, sans-serif; color: #222322; background: #f7f7f4; font-synthesis: none; }
.weshop-root *, .weshop-root *::before, .weshop-root *::after { box-sizing: border-box; }
.weshop-root button, .weshop-root input { font: inherit; }
.weshop-root button { color: inherit; }

.pure-canvas-shell { position: relative; width: 100%; height: 100%; background: #f7f7f4; }
.topbar { position: absolute; z-index: 70; inset: 0 0 auto; height: 68px; display: flex; flex-direction: row; align-items: center; gap: 11px; padding: 0 18px; background: rgba(250,250,247,.9); border-bottom: 1px solid rgba(31,32,30,.08); backdrop-filter: blur(18px); }
.brand-mark { width: 30px; height: 30px; display: grid; place-items: center; flex: none; border-radius: 50%; color: white; background: #20211f; }
.canvas-switcher { position: relative; display: flex; align-items: center; }
.space-title { width: 190px; padding: 4px 2px 4px 6px; border: 0; outline: 0; background: transparent; font: 600 15px/1 "Manrope", system-ui, sans-serif; }
.switcher-trigger { width: 25px; height: 25px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 7px; color: #777872; background: transparent; cursor: pointer; }
.switcher-trigger:hover, .switcher-trigger[aria-expanded="true"] { color: #292a27; background: #eaeae5; }
.canvas-menu { position: absolute; z-index: 90; left: 0; top: 36px; width: 248px; padding: 7px; border: 1px solid rgba(28,29,27,.12); border-radius: 14px; background: rgba(255,255,252,.98); box-shadow: 0 18px 54px rgba(22,23,20,.17); backdrop-filter: blur(20px); animation: menu-in .13s ease-out; }
.canvas-menu-label { padding: 7px 9px 6px; color: #96978f; font-size: 8px; font-weight: 700; letter-spacing: .13em; }
.canvas-menu > button { width: 100%; height: 36px; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 9px; border: 0; border-radius: 8px; text-align: left; background: transparent; cursor: pointer; }
.canvas-menu > button:hover { background: #f0f1ec; }
.canvas-menu > button.is-active { background: #e8eee9; }
.canvas-menu > button span { overflow: hidden; font-size: 11px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.canvas-menu > button small { min-width: 20px; padding: 3px 5px; border-radius: 99px; color: #85867e; background: #ededE7; text-align: center; font-size: 8px; }
.canvas-menu-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-top: 6px; padding-top: 7px; border-top: 1px solid #e8e8e2; }
.canvas-menu-actions button { height: 32px; display: inline-flex; align-items: center; justify-content: center; gap: 5px; border: 0; border-radius: 8px; background: #eeeee8; font-size: 9px; cursor: pointer; }
.canvas-menu-actions button:hover { background: #e4e5de; }
.canvas-menu-actions .delete-canvas { color: #9a443e; background: #f6ece9; }
.saved-state { flex: none; color: #9a9b96; font-size: 10px; white-space: nowrap; }
.topbar-actions { margin-left: auto; display: flex; flex-direction: row; align-items: center; gap: 8px; }
.add-menu-wrap { position: relative; }
.add-menu { position: absolute; z-index: 90; right: 0; top: 43px; width: 210px; padding: 7px; border: 1px solid rgba(28,29,27,.12); border-radius: 13px; background: rgba(255,255,252,.98); box-shadow: 0 18px 54px rgba(22,23,20,.17); backdrop-filter: blur(20px); }
.add-menu button { width: 100%; display: grid; grid-template-columns: 24px 1fr; align-items: center; gap: 5px; padding: 9px; border: 0; border-radius: 8px; text-align: left; background: transparent; cursor: pointer; }
.add-menu button:hover { background: #f0f1ec; }
.add-menu button span { display: grid; gap: 2px; }
.add-menu button strong { font-size: 10px; }
.add-menu button small { color: #8b8c86; font-size: 8px; }
.quiet-button, .primary-button { height: 36px; border: 0; border-radius: 10px; display: inline-flex; flex-direction: row; align-items: center; justify-content: center; gap: 7px; cursor: pointer; transition: transform .16s ease, background .16s ease; }
.quiet-button { padding: 0 13px; background: #ecece7; }
.weshop-root .primary-button { padding: 0 14px; color: #fff; background: #232421; }
.quiet-button:hover, .primary-button:hover { transform: translateY(-1px); }
.quiet-button:disabled { opacity: .38; transform: none; cursor: default; }
.api-key-button.is-configured { color: #285e48; background: #e5eee8; }
.language-switch { height: 30px; display: inline-flex; align-items: center; }
.language-switch select { height: 30px; padding: 0 7px; border: 1px solid #ddded7; border-radius: 9px; outline: none; color: #5d6059; background: #f4f4ef; font-size: 9px; font-weight: 700; cursor: pointer; }
.language-switch select:focus { border-color: #819389; box-shadow: 0 0 0 3px rgba(71,120,95,.08); }

.canvas { position: absolute; inset: 68px 0 0; overflow: hidden; touch-action: none; background: #f8f8f5; }
.canvas.mode-select { cursor: crosshair; }
.canvas.mode-pan { cursor: grab; }
.canvas.mode-pan:active { cursor: grabbing; }
.canvas.is-drop-active { cursor: copy; }
.world { position: absolute; inset: 0; width: 3000px; height: 2200px; transform-origin: 0 0; will-change: transform; }
.result-card { position: absolute; overflow: hidden; border-radius: 5px; background: #e8e8e3; box-shadow: 0 1px 2px rgba(22,23,20,.08), 0 12px 38px rgba(22,23,20,.08); cursor: move; user-select: none; transition: box-shadow .18s ease; }
.result-card.is-selected { z-index: 10; box-shadow: 0 0 0 3px #f7f7f4, 0 0 0 5px #222320, 0 18px 48px rgba(22,23,20,.16); }
.selection-marquee { position: absolute; z-index: 25; border: 1px solid rgba(35, 97, 72, .9); border-radius: 3px; background: rgba(56, 126, 96, .1); box-shadow: 0 0 0 1px rgba(255,255,255,.7) inset; pointer-events: none; }
.result-card img { width: 100%; display: block; pointer-events: none; }
.result-card > video { width: 100%; display: block; background: #171816; }
.video-drag-handle { position: absolute; z-index: 8; top: 8px; left: 50%; width: 34px; height: 25px; display: flex; align-items: center; justify-content: center; gap: 0; padding: 0 8px; transform: translateX(-50%); overflow: hidden; border: 1px solid rgba(255,255,255,.3); border-radius: 99px; color: rgba(255,255,255,.9); background: rgba(28,30,27,.42); box-shadow: 0 3px 14px rgba(0,0,0,.12); backdrop-filter: blur(14px) saturate(.8); cursor: move; opacity: .58; transition: width .2s cubic-bezier(.2,.8,.2,1), gap .2s ease, opacity .15s ease, background .15s ease; }
.video-drag-handle:hover, .result-card.is-selected .video-drag-handle { width: min(66%, 230px); gap: 6px; opacity: .96; background: rgba(28,30,27,.68); }
.video-drag-handle span { min-width: 0; max-width: 0; overflow: hidden; opacity: 0; font-size: 9px; font-weight: 600; letter-spacing: .01em; text-overflow: ellipsis; white-space: nowrap; transition: max-width .2s ease, opacity .14s ease .04s; }
.video-drag-handle:hover span, .result-card.is-selected .video-drag-handle span { max-width: 180px; opacity: 1; }
.media-video .kind-chip { top: 42px; }
.audio-card { min-height: 160px; display: grid; place-content: center; justify-items: center; gap: 12px; padding: 22px; color: #e7eadf; background: radial-gradient(circle at 25% 20%, #4d6153 0, #29332d 42%, #1e2420 100%); }
.audio-card strong { max-width: 260px; overflow: hidden; font: 600 12px "Manrope", system-ui, sans-serif; text-overflow: ellipsis; white-space: nowrap; }
.audio-card audio { width: min(300px, 100%); height: 34px; }
.text-card { min-height: 265px; display: flex; flex-direction: column; gap: 18px; padding: 28px; color: #30312d; background: linear-gradient(145deg, #fffef8, #f1f0e7); }
.text-card > svg { color: #64776b; }
.text-card p { margin: 0; overflow: hidden; font: 500 18px/1.55 "Manrope", system-ui, sans-serif; white-space: pre-wrap; }
.kind-chip { position: absolute; top: 9px; left: 9px; padding: 5px 8px; border-radius: 99px; color: white; background: rgba(28,29,27,.72); backdrop-filter: blur(10px); font-size: 9px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; opacity: 0; transition: opacity .16s ease; }
.result-card:hover .kind-chip, .result-card.is-selected .kind-chip { opacity: 1; }
.kind-chip.result { background: rgba(39,92,70,.82); }
.resize-handle { position: absolute; right: 5px; bottom: 5px; width: 18px; height: 18px; padding: 0; border: 3px solid #f7f7f4; border-radius: 50%; background: #222320; cursor: nwse-resize; }

.canvas-controls, .canvas-tool-controls, .selection-actions { position: fixed; z-index: 30; display: flex; flex-direction: row; align-items: center; padding: 5px; border: 1px solid rgba(32,33,31,.1); border-radius: 12px; background: rgba(255,255,252,.94); box-shadow: 0 8px 30px rgba(28,29,26,.1); backdrop-filter: blur(16px); }
.canvas-controls { right: 18px; bottom: 18px; }
.canvas-tool-controls { left: 18px; bottom: 18px; gap: 2px; }
.canvas-controls button, .canvas-tool-controls button, .selection-actions button, .selection-actions a { width: 31px; height: 31px; display: grid; place-items: center; border: 0; border-radius: 8px; color: #444540; background: transparent; cursor: pointer; }
.canvas-controls button:hover, .canvas-tool-controls button:hover, .selection-actions button:hover, .selection-actions a:hover { background: #efefe9; }
.canvas-tool-controls button.is-active { color: white; background: #292b27; }
.canvas-controls span { width: 51px; text-align: center; color: #777873; font-size: 11px; }
.canvas-controls i { width: 1px; height: 18px; margin: 0 3px; background: #deded8; }
.selection-actions { left: 50%; bottom: 20px; transform: translateX(-50%); gap: 2px; }
.selection-count { padding: 0 9px; color: #676963; font-size: 10px; font-weight: 650; letter-spacing: .02em; white-space: nowrap; }
.selection-actions a { text-decoration: none; }
.selection-actions button:last-child { color: #a84a42; }

.empty-state { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); width: 300px; display: grid; justify-items: center; gap: 8px; padding: 32px; border: 1px dashed #c8c8c0; border-radius: 16px; color: #73746f; background: rgba(255,255,252,.72); cursor: pointer; }
.empty-state strong { color: #282925; font-family: "Manrope", system-ui, sans-serif; }
.empty-state span { font-size: 12px; text-align: center; line-height: 1.5; }

.drop-overlay { position: absolute; z-index: 45; inset: 18px; display: grid; place-content: center; justify-items: center; gap: 8px; border: 2px dashed #2e6e56; border-radius: 18px; color: #235944; background: rgba(241,248,243,.9); box-shadow: inset 0 0 0 6px rgba(255,255,255,.75); pointer-events: none; backdrop-filter: blur(8px); }
.drop-overlay strong { font: 700 18px/1.2 "Manrope", system-ui, sans-serif; }
.drop-overlay span { color: #688073; font-size: 12px; }

.context-menu { position: fixed; z-index: 80; width: 216px; padding: 7px; border: 1px solid rgba(28,29,27,.12); border-radius: 14px; background: rgba(255,255,252,.97); box-shadow: 0 18px 54px rgba(22,23,20,.19), 0 2px 8px rgba(22,23,20,.08); backdrop-filter: blur(22px); animation: menu-in .13s ease-out; }
.context-heading { display: grid; gap: 3px; padding: 8px 9px 10px; border-bottom: 1px solid #e8e8e2; margin-bottom: 4px; overflow: hidden; }
.context-heading span, .eyebrow { color: #789087; font-size: 8px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
.context-heading strong { overflow: hidden; font-size: 11px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.context-menu button { width: 100%; min-height: 47px; display: grid; grid-template-columns: 22px 1fr; align-items: center; gap: 6px; padding: 7px 8px; border: 0; border-radius: 9px; text-align: left; background: transparent; cursor: pointer; }
.context-menu button:hover { background: #f0f2ed; }
.context-menu button > svg { color: #3f6254; }
.context-menu button span { display: grid; gap: 2px; }
.context-menu button strong { font-size: 11px; font-weight: 600; }
.context-menu button small { color: #898a84; font-size: 9px; line-height: 1.3; }

.lightbox, .dialog-backdrop { position: fixed; z-index: 90; inset: 0; display: grid; place-items: center; padding: 34px; background: rgba(18,19,17,.78); backdrop-filter: blur(16px); animation: veil-in .18s ease-out; }
.lightbox img { max-width: min(88vw, 1500px); max-height: 82vh; border-radius: 7px; box-shadow: 0 30px 90px rgba(0,0,0,.42); }
.lightbox-video { max-width: 88vw; max-height: 82vh; border-radius: 8px; box-shadow: 0 30px 90px rgba(0,0,0,.42); }
.lightbox-audio { width: min(520px, 86vw); display: grid; justify-items: center; gap: 20px; padding: 54px; border-radius: 18px; color: white; background: #26302a; box-shadow: 0 30px 90px rgba(0,0,0,.42); }
.lightbox-audio audio { width: 100%; }
.lightbox-text { width: min(720px, 88vw); max-height: 78vh; overflow: auto; padding: 50px; border-radius: 12px; color: #292a27; background: #fffef8; box-shadow: 0 30px 90px rgba(0,0,0,.42); font: 500 20px/1.7 "Manrope", system-ui, sans-serif; white-space: pre-wrap; }
.modal-close { position: fixed; right: 24px; top: 24px; width: 38px; height: 38px; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.25); border-radius: 50%; color: white; background: rgba(255,255,255,.1); cursor: pointer; }
.lightbox-caption { position: fixed; left: 28px; bottom: 24px; display: flex; align-items: center; gap: 10px; color: white; }
.lightbox-caption strong { font: 600 13px "Manrope", system-ui, sans-serif; }
.lightbox-caption span { padding: 4px 7px; border-radius: 99px; background: rgba(255,255,255,.14); font-size: 8px; text-transform: uppercase; }

.edit-dialog { width: min(760px, 92vw); min-height: 390px; display: grid; grid-template-columns: .86fr 1.14fr; overflow: hidden; border-radius: 18px; background: #fbfbf7; box-shadow: 0 35px 100px rgba(0,0,0,.38); }
.edit-preview { min-height: 390px; background: #242522; }
.edit-preview img { width: 100%; height: 100%; display: block; object-fit: cover; }
.edit-copy { display: flex; flex-direction: column; padding: 38px; }
.edit-copy h2 { margin: 9px 0 8px; font: 700 25px/1.15 "Manrope", system-ui, sans-serif; }
.edit-copy p { margin: 0 0 22px; color: #767771; font-size: 12px; line-height: 1.6; }
.edit-copy textarea { width: 100%; resize: none; padding: 14px; border: 1px solid #dadad3; border-radius: 11px; outline: none; color: #292a27; background: white; font: 12px/1.55 "DM Sans", sans-serif; }
.edit-copy textarea:focus { border-color: #536f62; box-shadow: 0 0 0 3px rgba(83,111,98,.1); }
.dialog-actions { margin-top: auto; padding-top: 22px; display: flex; justify-content: flex-end; gap: 8px; }
.dialog-actions button { height: 36px; padding: 0 14px; border: 0; border-radius: 9px; background: #ecece6; cursor: pointer; }
.api-key-dialog { width: min(430px, calc(100vw - 36px)); padding: 28px; border: 1px solid rgba(31,33,29,.1); border-radius: 20px; color: #30322e; background: #fbfbf7; box-shadow: 0 28px 90px rgba(24,27,23,.22); }
.api-key-dialog h2 { margin: 8px 0 7px; font: 700 24px/1.15 "Manrope", system-ui, sans-serif; }
.api-key-dialog > p { margin: 0 0 18px; color: #71736d; font-size: 12px; line-height: 1.55; }
.api-key-icon { float: right; width: 42px; height: 42px; display: grid; place-items: center; border-radius: 13px; color: #2f654f; background: #e5eee8; }
.api-key-status { display: flex; align-items: center; gap: 7px; margin-bottom: 14px; padding: 10px 11px; border-radius: 10px; color: #2f654f; background: #edf4ef; font-size: 11px; }
.api-key-dialog label { display: grid; gap: 7px; }
.api-key-dialog label > span { color: #5d6059; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.api-key-dialog input { height: 42px; padding: 0 12px; border: 1px solid #d8d9d2; border-radius: 10px; outline: none; color: #292b27; background: white; font: 500 13px/1 monospace; }
.api-key-dialog input:focus { border-color: #4d7664; box-shadow: 0 0 0 3px rgba(77,118,100,.12); }
.api-key-dialog > a { display: inline-block; margin-top: 10px; color: #376b56; font-size: 11px; text-decoration: none; }
.api-key-dialog .dialog-actions { display: flex; align-items: center; gap: 7px; margin-top: 22px; }
.api-key-dialog .dialog-actions > span { flex: 1; }
.api-key-dialog .clear-api-key { color: #984f48; background: #f5eae7; }
.dialog-actions .submit-edit { display: inline-flex; align-items: center; gap: 6px; color: white; background: #244d3e; }
.dialog-actions .submit-edit:disabled { opacity: .38; cursor: default; }

.toast { position: fixed; z-index: 100; left: 50%; bottom: 22px; transform: translateX(-50%); min-width: 310px; display: grid; grid-template-columns: 12px 1fr; align-items: center; column-gap: 7px; padding: 12px 15px; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: white; background: rgba(31,35,32,.94); box-shadow: 0 12px 35px rgba(20,22,19,.22); font-size: 11px; backdrop-filter: blur(16px); }
.toast small { grid-column: 2; margin-top: 2px; color: #aeb7b1; font-size: 9px; }
.toast-dot { width: 7px; height: 7px; border-radius: 50%; background: #75c99c; box-shadow: 0 0 0 4px rgba(117,201,156,.12); }
/* ── first-run canvas shortcut guide ───────────────────────────────────── */
.weshop-canvas-onboarding { position: fixed; z-index: 2100; inset: 0; pointer-events: none; background: transparent; }
.weshop-onboarding-veil { position: absolute; inset: 0; background: rgba(17,20,17,.3); pointer-events: none; animation: veil-in .16s ease-out both; }
.weshop-onboarding-ring { position: fixed; display: grid; place-items: center; border: 2px solid #bff7cb; border-radius: 16px; box-shadow: 0 0 0 6px rgba(97,203,129,.32), 0 9px 24px rgba(0,0,0,.22); pointer-events: none; }
.weshop-onboarding-ring svg { color: #e8ffed; filter: drop-shadow(0 1px 2px rgba(0,0,0,.38)); }
.weshop-onboarding-copy { position: fixed; width: min(250px, calc(100vw - 36px)); display: grid; gap: 3px; padding: 12px 14px; border-left: 2px solid #aaf0bd; color: #f5faf5; background: rgba(28,32,28,.97); box-shadow: 0 10px 28px rgba(0,0,0,.22); pointer-events: auto; animation: weshop-onboarding-copy-in .2s ease-out both; }
.weshop-onboarding-copy > span { color: #a8e9b9; font-size: 8px; font-weight: 750; letter-spacing: .12em; }
.weshop-onboarding-copy strong { font: 650 13px/1.25 "Manrope", system-ui, sans-serif; letter-spacing: -.01em; }
.weshop-onboarding-copy p { margin: 0; color: #c9d2ca; font-size: 9px; line-height: 1.45; }
.weshop-onboarding-copy button { justify-self: start; height: 27px; margin-top: 4px; padding: 0 9px; border: 1px solid rgba(202,238,209,.22); border-radius: 7px; color: #effaf0; background: rgba(255,255,255,.08); cursor: pointer; font-size: 9px; font-weight: 650; }
.weshop-onboarding-copy button:hover { background: rgba(150,226,173,.2); }
@keyframes weshop-onboarding-copy-in { from { opacity: 0; transform: translateX(-5px); } to { opacity: 1; transform: translateX(0); } }

/* Harness owns the appearance preference and projects dark mode on <body>. */
body[data-ds-dark-theme] .weshop-root { color: #edf1ea; background: #171a17; }
body[data-ds-dark-theme] .weshop-studio, body[data-ds-dark-theme] .pure-canvas-shell, body[data-ds-dark-theme] .canvas { background: #171a17; }
body[data-ds-dark-theme] .topbar { background: rgba(29,33,29,.94); border-color: rgba(232,240,231,.1); }
body[data-ds-dark-theme] .brand-mark, body[data-ds-dark-theme] .weshop-root .primary-button { color: #152017; background: #b9e7c4; }
body[data-ds-dark-theme] .space-title { color: #eef3ed; }
body[data-ds-dark-theme] .switcher-trigger { color: #b8c1b6; }
body[data-ds-dark-theme] .switcher-trigger:hover, body[data-ds-dark-theme] .switcher-trigger[aria-expanded="true"], body[data-ds-dark-theme] .quiet-button { color: #e5ece4; background: #303630; }
body[data-ds-dark-theme] .canvas-menu, body[data-ds-dark-theme] .add-menu, body[data-ds-dark-theme] .context-menu { border-color: rgba(235,242,233,.12); background: rgba(35,40,35,.98); box-shadow: 0 18px 54px rgba(0,0,0,.34); }
body[data-ds-dark-theme] .canvas-menu > button, body[data-ds-dark-theme] .add-menu button, body[data-ds-dark-theme] .context-menu button { color: #e7ede6; }
body[data-ds-dark-theme] .canvas-menu > button:hover, body[data-ds-dark-theme] .add-menu button:hover, body[data-ds-dark-theme] .context-menu button:hover { background: #414941; }
body[data-ds-dark-theme] .canvas-menu-label, body[data-ds-dark-theme] .saved-state, body[data-ds-dark-theme] .context-heading span, body[data-ds-dark-theme] .context-menu small { color: #9aa69a; }
body[data-ds-dark-theme] .language-switch select { border-color: #465047; color: #d9e3d8; background: #292f29; }
body[data-ds-dark-theme] .weshop-canvas-pane { border-color: rgba(232,240,231,.1); }
body[data-ds-dark-theme] .canvas-chat { color: #e8eee7; background: #1d211d; }
body[data-ds-dark-theme] .canvas-chat-head, body[data-ds-dark-theme] .canvas-chat-compose { border-color: rgba(232,240,231,.1); background: #202520; }
body[data-ds-dark-theme] .canvas-chat-head strong { color: #eef3ed; }
body[data-ds-dark-theme] .canvas-chat-head button { color: #ccd6cb; background: #303630; }
body[data-ds-dark-theme] .canvas-chat-message p { color: #e8eee7; background: #303630; }
body[data-ds-dark-theme] .canvas-chat-message.is-user p { color: #172018; background: #b9e7c4; }
body[data-ds-dark-theme] .canvas-chat-input { border-color: #485149; background: #151915; box-shadow: none; }
body[data-ds-dark-theme] .canvas-chat-input textarea { color: #edf3ec; }
body[data-ds-dark-theme] .canvas-chat-input textarea::placeholder { color: #899489; }
body[data-ds-dark-theme] .canvas-chat-input button { color: #172018; background: #b9e7c4; }
body[data-ds-dark-theme] .canvas-api-notice { border-color: #766437; color: #f1dfaa; background: #312b1b; }
body[data-ds-dark-theme] .canvas-api-notice p { color: #d7c895; }
body[data-ds-dark-theme] .canvas-controls, body[data-ds-dark-theme] .canvas-tool-controls, body[data-ds-dark-theme] .selection-actions { border-color: rgba(232,240,231,.12); background: rgba(37,42,37,.94); }
body[data-ds-dark-theme] .canvas-controls button, body[data-ds-dark-theme] .canvas-tool-controls button, body[data-ds-dark-theme] .selection-actions button, body[data-ds-dark-theme] .selection-actions a { color: #dce5dc; }
body[data-ds-dark-theme] .canvas-controls button:hover, body[data-ds-dark-theme] .canvas-tool-controls button:hover, body[data-ds-dark-theme] .selection-actions button:hover, body[data-ds-dark-theme] .selection-actions a:hover { background: #424b42; }
body[data-ds-dark-theme] .canvas-tool-controls button.is-active { color: #132217; background: #b9e7c4; box-shadow: inset 0 0 0 1px rgba(255,255,255,.35), 0 2px 7px rgba(93,190,125,.22); }
body[data-ds-dark-theme] .empty-state { border-color: #4d584e; color: #a6b1a5; background: rgba(31,36,31,.82); }
body[data-ds-dark-theme] .empty-state strong { color: #edf3ec; }
body[data-ds-dark-theme] .api-key-dialog, body[data-ds-dark-theme] .text-dialog, body[data-ds-dark-theme] .edit-dialog { color: #e9f0e8; background: #242a24; }
body[data-ds-dark-theme] .api-key-dialog > p, body[data-ds-dark-theme] .edit-copy p { color: #afb9ae; }
body[data-ds-dark-theme] .api-key-dialog input, body[data-ds-dark-theme] .text-dialog textarea, body[data-ds-dark-theme] .edit-copy textarea { border-color: #4a544a; color: #edf3ec; background: #171c17; }
body[data-ds-dark-theme] .dialog-actions button { color: #e6eee5; background: #363e36; }

.agent-progress { position: fixed; z-index: 55; right: 18px; top: 82px; width: 292px; padding: 13px 14px; border: 1px solid rgba(35,45,39,.12); border-radius: 14px; color: #29302c; background: rgba(252,252,248,.95); box-shadow: 0 14px 42px rgba(27,34,29,.12); backdrop-filter: blur(18px); animation: menu-in .18s ease-out; }
.progress-head { display: grid; grid-template-columns: 9px 1fr auto; align-items: center; gap: 7px; }
.progress-head strong { font: 600 11px/1.2 "Manrope", system-ui, sans-serif; }
.progress-head small { color: #999b95; font-size: 8px; }
.progress-pulse { width: 7px; height: 7px; border-radius: 50%; background: #4b8a6c; box-shadow: 0 0 0 4px rgba(75,138,108,.12); animation: progress-pulse 1.5s ease-in-out infinite; }
.stage-complete .progress-pulse { background: #4d9b71; animation: none; }
.stage-error .progress-pulse { background: #b35c50; animation: none; }
.agent-progress p { margin: 9px 0 10px; color: #696d68; font-size: 10px; line-height: 1.5; }
.progress-meta { display: flex; flex-wrap: wrap; gap: 5px; }
.progress-meta span { padding: 5px 7px; border-radius: 7px; color: #7a7e78; background: #eff1ec; font-size: 8px; }
.progress-meta b { color: #3e4943; font-weight: 600; }
.progress-track { height: 4px; margin: 2px 0 10px; overflow: hidden; border-radius: 99px; background: #e6e9e3; }
.progress-track span { height: 100%; display: block; border-radius: inherit; background: linear-gradient(90deg, #47785f, #78ad8d); transition: width .55s ease; }

.text-dialog { width: min(560px, 92vw); padding: 34px; border-radius: 18px; background: #fbfbf7; box-shadow: 0 35px 100px rgba(0,0,0,.38); }
.text-dialog h2 { margin: 9px 0 20px; font: 700 23px/1.2 "Manrope", system-ui, sans-serif; }
.text-dialog textarea { width: 100%; resize: vertical; padding: 16px; border: 1px solid #dadad3; border-radius: 11px; outline: none; background: white; font: 13px/1.6 "DM Sans", sans-serif; }
.text-dialog textarea:focus { border-color: #536f62; box-shadow: 0 0 0 3px rgba(83,111,98,.1); }

.weshop-exit { position: fixed; z-index: 60; left: 14px; bottom: 14px; height: 34px; padding: 0 12px; display: inline-flex; flex-direction: row; align-items: center; gap: 7px; border: 1px solid rgba(32,33,31,.12); border-radius: 10px; color: #3f403c; background: rgba(255,255,252,.92); box-shadow: 0 8px 30px rgba(28,29,26,.1); backdrop-filter: blur(16px); cursor: pointer; font-size: 10px; }
.weshop-exit:hover { background: #ffffff; }

@keyframes menu-in { from { opacity: 0; transform: translateY(-4px) scale(.98); } }
@keyframes veil-in { from { opacity: 0; } }
@keyframes progress-pulse { 50% { opacity: .45; transform: scale(.82); } }

/* ── embedded studio mode ────────────────────────────────────────────────────
   The canvas occupies its studio pane while fixed viewport floats are rebound
   to that pane. The studio's synchronized chat rail owns the exit affordance. */
.weshop-split { min-width: 0; }
.weshop-split .pure-canvas-shell { position: relative; width: 100%; height: 100%; }
.weshop-split .topbar { height: 52px; padding: 0 10px; gap: 7px; }
.weshop-split .canvas { inset: 52px 0 0; }
.weshop-split .brand-mark { width: 26px; height: 26px; }
.weshop-split .space-title { width: 108px; font-size: 13px; }
.weshop-split .saved-state { display: none; }
.weshop-split .quiet-button, .weshop-split .primary-button { height: 30px; padding: 0 10px; font-size: 10px; }
.weshop-split .quiet-button svg, .weshop-split .primary-button svg { width: 14px; height: 14px; }
.weshop-split .weshop-exit { display: none; }
.weshop-split .canvas-controls, .weshop-split .canvas-tool-controls, .weshop-split .selection-actions { position: absolute; }
.weshop-split .canvas-controls { right: 12px; bottom: 12px; }
.weshop-split .canvas-tool-controls { left: 12px; bottom: 12px; }
.weshop-split .selection-actions { left: 50%; bottom: 14px; }
.weshop-split .agent-progress { position: absolute; right: 12px; top: 62px; }

/* ── canvas studio: full canvas plus the live Harness session ───────────── */
.weshop-studio { height: 100%; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) clamp(350px, 29vw, 460px); grid-template-rows: minmax(0, 1fr); background: #eeeee9; }
.weshop-canvas-pane { position: relative; min-width: 0; min-height: 0; height: 100%; overflow: hidden; border-right: 1px solid rgba(31,32,30,.1); }
.canvas-chat { min-width: 0; min-height: 0; height: 100%; overflow: hidden; display: grid; grid-template-rows: 68px minmax(0, 1fr) max-content; color: #272824; background: #fbfbf8; }
.canvas-chat-head { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 13px 16px 12px 18px; border-bottom: 1px solid #e8e8e2; }
.canvas-chat-head > div { min-width: 0; display: grid; gap: 4px; }
.canvas-chat-head span { color: #77867d; font-size: 8px; font-weight: 750; letter-spacing: .14em; }
.canvas-chat-head strong { overflow: hidden; font: 650 13px/1.2 "Manrope", system-ui, sans-serif; text-overflow: ellipsis; white-space: nowrap; }
.canvas-chat-head button { width: 32px; height: 32px; flex: none; display: grid; place-items: center; padding: 0; border: 0; border-radius: 9px; color: #676862; background: #efefe9; cursor: pointer; }
.canvas-chat-head button:hover { color: #242522; background: #e5e6df; }
.canvas-chat-feed { min-height: 0; overflow: auto; overscroll-behavior: contain; padding: 22px 18px 28px; scroll-behavior: smooth; }
.canvas-api-notice { margin: 0 0 18px; padding: 12px 13px; border: 1px solid #decf9f; border-radius: 11px; color: #51482d; background: #fff9e8; }
.canvas-api-notice strong { font: 650 11px "Manrope", system-ui, sans-serif; }
.canvas-api-notice p { margin: 5px 0 0; color: #786d4d; font-size: 9px; line-height: 1.55; }
.canvas-chat-empty { min-height: 54vh; display: grid; place-content: center; justify-items: center; gap: 8px; color: #8b8c86; text-align: center; }
.canvas-chat-empty span { color: #37423c; font: 650 13px "Manrope", system-ui, sans-serif; }
.canvas-chat-empty p { max-width: 270px; margin: 0; font-size: 11px; line-height: 1.65; }
.canvas-chat-message { max-width: 92%; display: grid; gap: 6px; margin: 0 0 18px; animation: chat-rise .18s ease-out; }
.canvas-chat-message > span { color: #91928c; font-size: 8px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.canvas-chat-message p { margin: 0; padding: 11px 13px; border-radius: 5px 14px 14px 14px; color: #343632; background: #eeefe9; font-size: 12px; line-height: 1.58; white-space: pre-wrap; overflow-wrap: anywhere; }
.canvas-chat-message.is-user { margin-left: auto; justify-items: end; }
.canvas-chat-message.is-user p { border-radius: 14px 5px 14px 14px; color: #f5f5f0; background: #292b27; }
.canvas-chat-message small { padding-left: 3px; color: #718078; font-size: 9px; line-height: 1.4; }
.canvas-chat-message i { color: #72756f; font-size: 10px; font-style: normal; animation: progress-pulse 1.5s ease-in-out infinite; }
.canvas-chat-compose { position: relative; z-index: 3; min-height: 0; padding: 12px 14px 14px; border-top: 1px solid #e5e6df; background: rgba(251,251,248,.97); box-shadow: 0 -10px 30px rgba(26,29,26,.04); backdrop-filter: blur(18px); }
.canvas-chat-mentions { display: flex; flex-wrap: wrap; gap: 5px; margin: 0 0 7px; }
.canvas-chat-mentions > span { max-width: 100%; height: 27px; display: inline-flex; align-items: center; gap: 4px; padding: 0 5px 0 8px; overflow: hidden; border: 1px solid #cbd8d0; border-radius: 8px; color: #365c4b; background: #edf4ef; font-size: 9px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.canvas-chat-mentions b { color: #58816e; font-size: 10px; }
.canvas-chat-mentions button { width: 18px; height: 18px; flex: none; display: grid; place-items: center; padding: 0; border: 0; border-radius: 5px; color: #687a70; background: transparent; cursor: pointer; }
.canvas-chat-mentions button:hover { color: #313b35; background: #dce9e1; }
.canvas-chat-input { display: grid; grid-template-columns: minmax(0, 1fr) 34px; align-items: end; gap: 8px; padding: 9px 9px 9px 12px; border: 1px solid #d9dad3; border-radius: 14px; background: white; box-shadow: 0 7px 24px rgba(28,31,27,.06); }
.canvas-chat-input:focus-within { border-color: #819389; box-shadow: 0 0 0 3px rgba(71,120,95,.08); }
.canvas-chat-input textarea { width: 100%; max-height: 132px; resize: none; padding: 2px 0; border: 0; outline: 0; color: #292b27; background: transparent; font: 12px/1.5 "DM Sans", system-ui, sans-serif; }
.canvas-chat-input textarea::placeholder { color: #a3a49e; }
.canvas-chat-input button { width: 34px; height: 34px; display: grid; place-items: center; padding: 0; border: 0; border-radius: 10px; color: white; background: #2b2d29; cursor: pointer; }
.canvas-chat-input button:disabled { opacity: .28; cursor: default; }
.canvas-chat-input .canvas-chat-stop { color: #864c45; background: #f3e9e6; }
.canvas-chat-compose > small { display: block; padding: 7px 3px 0; color: #a0a19b; font-size: 8px; }
.canvas-chat-error { margin: 0 2px 8px; color: #a0443b; font-size: 9px; line-height: 1.4; }
.canvas-question { max-height: min(62vh, 620px); overflow: auto; padding: 16px; border-top: 1px solid #dfe1da; background: #fff; box-shadow: 0 -18px 48px rgba(29,33,29,.08); }
.canvas-question-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.canvas-question-head > div { display: grid; gap: 5px; }
.canvas-question-head span { color: #72857a; font-size: 8px; font-weight: 750; letter-spacing: .12em; text-transform: uppercase; }
.canvas-question-head strong { font: 680 14px/1.4 "Manrope", system-ui, sans-serif; }
.canvas-question-head > button { width: 28px; height: 28px; flex: none; display: grid; place-items: center; padding: 0; border: 0; border-radius: 8px; color: #787a74; background: #f0f0eb; cursor: pointer; }
.canvas-question-detail { max-height: 110px; overflow: auto; margin: -2px 0 12px; padding: 10px 11px; border-radius: 9px; color: #686b66; background: #f4f4ef; font-size: 10px; line-height: 1.55; white-space: pre-wrap; }
.canvas-question-options { display: grid; gap: 6px; margin-bottom: 9px; }
.canvas-question-options > button { width: 100%; display: grid; grid-template-columns: 25px minmax(0, 1fr); align-items: center; gap: 8px; padding: 9px; border: 1px solid #e2e3dc; border-radius: 10px; text-align: left; color: #353733; background: #fafaf7; cursor: pointer; }
.canvas-question-options > button:hover { border-color: #bfc8c1; background: #f5f7f3; }
.canvas-question-options > button.is-selected { border-color: #718d7e; background: #edf3ee; box-shadow: 0 0 0 2px rgba(83,117,98,.08); }
.canvas-question-options i { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 7px; color: #687069; background: #eceee9; font-size: 10px; font-style: normal; }
.canvas-question-options .is-selected i { color: #fff; background: #4d6d5d; }
.canvas-question-options span { min-width: 0; display: grid; gap: 2px; }
.canvas-question-options b { font-size: 11px; font-weight: 650; }
.canvas-question-options small { color: #868983; font-size: 9px; line-height: 1.35; }
.canvas-question > textarea { width: 100%; resize: vertical; padding: 10px 11px; border: 1px solid #dedfd8; border-radius: 10px; outline: 0; color: #30322e; background: #fafaf7; font: 11px/1.5 "DM Sans", system-ui, sans-serif; }
.canvas-question > textarea:focus { border-color: #82978b; box-shadow: 0 0 0 3px rgba(71,120,95,.08); }
.canvas-question-actions { display: flex; align-items: center; justify-content: flex-end; gap: 7px; margin-top: 10px; }
.canvas-question-actions > span { margin-right: auto; color: #999b95; font-size: 9px; }
.canvas-question-actions button { height: 32px; padding: 0 12px; border: 0; border-radius: 9px; color: #535550; background: #eeefe9; font-size: 10px; cursor: pointer; }
.canvas-question-actions button.is-primary { color: white; background: #2d302c; }
.canvas-question-actions button:disabled, .canvas-question-head button:disabled { opacity: .42; cursor: default; }
.canvas-approval { max-height: none; }
@keyframes chat-rise { from { opacity: 0; transform: translateY(5px); } }

@media (max-width: 720px) {
  .saved-state, .quiet-button { display: none; }
  .undo-button { width: 36px; display: inline-flex; padding: 0; font-size: 0; }
  .space-title { width: 130px; }
  .primary-button { width: 38px; padding: 0; font-size: 0; }
  .result-card { max-width: 78vw; }
  .edit-dialog { grid-template-columns: 1fr; max-height: 88vh; overflow: auto; }
  .edit-preview { min-height: 180px; max-height: 240px; }
  .edit-copy { padding: 26px; }
  .weshop-studio { grid-template-columns: 1fr; grid-template-rows: minmax(0, 56vh) minmax(0, 44vh); }
  .canvas-chat { grid-template-rows: 50px minmax(0, 1fr) max-content; }
  .weshop-canvas-pane { border-right: 0; border-bottom: 1px solid rgba(31,32,30,.1); }
  .canvas-chat-head { min-height: 50px; padding-block: 8px; }
  .canvas-chat-feed { padding-block: 14px; }
  .canvas-chat-empty { min-height: 12vh; }
}

@media (prefers-reduced-motion: reduce) { .weshop-root * { transition: none !important; } }
`;

let injected = false;
export function injectWeshopStyles() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const tag = document.createElement("style");
  tag.dataset.plugin = "@weshop/dsh-weshop-2-0";
  tag.dataset.pluginCss = "@weshop/dsh-weshop-2-0/styles";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}
