window.__ModuleLoader__.load({
	id: "@weshop/dsh-weshop-2-0",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region \0rolldown/runtime.js
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __copyProps = (to, from, except, desc) => {
			if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
				key = keys[i];
				if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
					get: ((k) => from[k]).bind(null, key),
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
				});
			}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
			value: mod,
			enumerable: true
		}) : target, mod));
		//#endregion
		let react = require("react");
		react = __toESM(react, 1);
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/ArrowCounterClockwise.es.js
		const e$18 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/ArrowUp.es.js
		const a$8 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208.49,120.49a12,12,0,0,1-17,0L140,69V216a12,12,0,0,1-24,0V69L64.49,120.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0l72,72A12,12,0,0,1,208.49,120.49Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M200,112H56l72-72Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M205.66,106.34l-72-72a8,8,0,0,0-11.32,0l-72,72A8,8,0,0,0,56,120h64v96a8,8,0,0,0,16,0V120h64a8,8,0,0,0,5.66-13.66ZM75.31,104,128,51.31,180.69,104Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M204.24,116.24a6,6,0,0,1-8.48,0L134,54.49V216a6,6,0,0,1-12,0V54.49L60.24,116.24a6,6,0,0,1-8.48-8.48l72-72a6,6,0,0,1,8.48,0l72,72A6,6,0,0,1,204.24,116.24Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M202.83,114.83a4,4,0,0,1-5.66,0L132,49.66V216a4,4,0,0,1-8,0V49.66L58.83,114.83a4,4,0,0,1-5.66-5.66l72-72a4,4,0,0,1,5.66,0l72,72A4,4,0,0,1,202.83,114.83Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/ArrowsInSimple.es.js
		const e$17 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216.49,56.48,177,96h19a12,12,0,0,1,0,24H148a12,12,0,0,1-12-12V60a12,12,0,0,1,24,0V79l39.51-39.52a12,12,0,0,1,17,17ZM108,136H60a12,12,0,0,0,0,24H79L39.51,199.51a12,12,0,0,0,17,17L96,177v19a12,12,0,0,0,24,0V148A12,12,0,0,0,108,136Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M213.66,53.66,163.31,104H192a8,8,0,0,1,0,16H144a8,8,0,0,1-8-8V64a8,8,0,0,1,16,0V92.69l50.34-50.35a8,8,0,0,1,11.32,11.32ZM112,136H64a8,8,0,0,0,0,16H92.69L42.34,202.34a8,8,0,0,0,11.32,11.32L104,163.31V192a8,8,0,0,0,16,0V144A8,8,0,0,0,112,136Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M120,144v48a8,8,0,0,1-13.66,5.66L88,179.31,53.66,213.66a8,8,0,0,1-11.32-11.32L76.69,168,58.34,149.66A8,8,0,0,1,64,136h48A8,8,0,0,1,120,144ZM213.66,42.34a8,8,0,0,0-11.32,0L168,76.69,149.66,58.34A8,8,0,0,0,136,64v48a8,8,0,0,0,8,8h48a8,8,0,0,0,5.66-13.66L179.31,88l34.35-34.34A8,8,0,0,0,213.66,42.34Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M212.24,52.24,158.48,106H192a6,6,0,0,1,0,12H144a6,6,0,0,1-6-6V64a6,6,0,0,1,12,0V97.52l53.76-53.76a6,6,0,0,1,8.48,8.48ZM112,138H64a6,6,0,0,0,0,12H97.52L43.76,203.76a6,6,0,1,0,8.48,8.48L106,158.48V192a6,6,0,0,0,12,0V144A6,6,0,0,0,112,138Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M213.66,53.66,163.31,104H192a8,8,0,0,1,0,16H144a8,8,0,0,1-8-8V64a8,8,0,0,1,16,0V92.69l50.34-50.35a8,8,0,0,1,11.32,11.32ZM112,136H64a8,8,0,0,0,0,16H92.69L42.34,202.34a8,8,0,0,0,11.32,11.32L104,163.31V192a8,8,0,0,0,16,0V144A8,8,0,0,0,112,136Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M210.83,50.83,153.66,108H192a4,4,0,0,1,0,8H144a4,4,0,0,1-4-4V64a4,4,0,0,1,8,0v38.34l57.17-57.17a4,4,0,1,1,5.66,5.66ZM112,140H64a4,4,0,0,0,0,8h38.34L45.17,205.17a4,4,0,0,0,5.66,5.66L108,153.66V192a4,4,0,0,0,8,0V144A4,4,0,0,0,112,140Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/CaretDown.es.js
		const t$1 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M208,96l-80,80L48,96Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/CornersOut.es.js
		const e$16 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M220,48V88a12,12,0,0,1-24,0V60H168a12,12,0,0,1,0-24h40A12,12,0,0,1,220,48ZM88,196H60V168a12,12,0,0,0-24,0v40a12,12,0,0,0,12,12H88a12,12,0,0,0,0-24Zm120-40a12,12,0,0,0-12,12v28H168a12,12,0,0,0,0,24h40a12,12,0,0,0,12-12V168A12,12,0,0,0,208,156ZM88,36H48A12,12,0,0,0,36,48V88a12,12,0,0,0,24,0V60H88a12,12,0,0,0,0-24Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M208,48V208H48V48Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M216,48V88a8,8,0,0,1-16,0V56H168a8,8,0,0,1,0-16h40A8,8,0,0,1,216,48ZM88,200H56V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H88a8,8,0,0,0,0-16Zm120-40a8,8,0,0,0-8,8v32H168a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,208,160ZM88,40H48a8,8,0,0,0-8,8V88a8,8,0,0,0,16,0V56H88a8,8,0,0,0,0-16Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M93.66,202.34A8,8,0,0,1,88,216H48a8,8,0,0,1-8-8V168a8,8,0,0,1,13.66-5.66ZM88,40H48a8,8,0,0,0-8,8V88a8,8,0,0,0,13.66,5.66l40-40A8,8,0,0,0,88,40ZM211.06,160.61a8,8,0,0,0-8.72,1.73l-40,40A8,8,0,0,0,168,216h40a8,8,0,0,0,8-8V168A8,8,0,0,0,211.06,160.61ZM208,40H168a8,8,0,0,0-5.66,13.66l40,40A8,8,0,0,0,216,88V48A8,8,0,0,0,208,40Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M214,48V88a6,6,0,0,1-12,0V54H168a6,6,0,0,1,0-12h40A6,6,0,0,1,214,48ZM88,202H54V168a6,6,0,0,0-12,0v40a6,6,0,0,0,6,6H88a6,6,0,0,0,0-12Zm120-40a6,6,0,0,0-6,6v34H168a6,6,0,0,0,0,12h40a6,6,0,0,0,6-6V168A6,6,0,0,0,208,162ZM88,42H48a6,6,0,0,0-6,6V88a6,6,0,0,0,12,0V54H88a6,6,0,0,0,0-12Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,48V88a8,8,0,0,1-16,0V56H168a8,8,0,0,1,0-16h40A8,8,0,0,1,216,48ZM88,200H56V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H88a8,8,0,0,0,0-16Zm120-40a8,8,0,0,0-8,8v32H168a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,208,160ZM88,40H48a8,8,0,0,0-8,8V88a8,8,0,0,0,16,0V56H88a8,8,0,0,0,0-16Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M212,48V88a4,4,0,0,1-8,0V52H168a4,4,0,0,1,0-8h40A4,4,0,0,1,212,48ZM88,204H52V168a4,4,0,0,0-8,0v40a4,4,0,0,0,4,4H88a4,4,0,0,0,0-8Zm120-40a4,4,0,0,0-4,4v36H168a4,4,0,0,0,0,8h40a4,4,0,0,0,4-4V168A4,4,0,0,0,208,164ZM88,44H48a4,4,0,0,0-4,4V88a4,4,0,0,0,8,0V52H88a4,4,0,0,0,0-8Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/DownloadSimple.es.js
		const e$15 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0Zm-108.49,8.49a12,12,0,0,0,17,0l40-40a12,12,0,0,0-17-17L140,115V32a12,12,0,0,0-24,0v83L96.49,95.51a12,12,0,0,0-17,17Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M216,48V208H40V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,168,96H136V32a8,8,0,0,0-16,0V96H88a8,8,0,0,0-5.66,13.66Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M222,144v64a6,6,0,0,1-6,6H40a6,6,0,0,1-6-6V144a6,6,0,0,1,12,0v58H210V144a6,6,0,0,1,12,0Zm-98.24,4.24a6,6,0,0,0,8.48,0l40-40a6,6,0,0,0-8.48-8.48L134,129.51V32a6,6,0,0,0-12,0v97.51L92.24,99.76a6,6,0,0,0-8.48,8.48Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V32a8,8,0,0,0-16,0v92.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M220,144v64a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V144a4,4,0,0,1,8,0v60H212V144a4,4,0,0,1,8,0Zm-94.83,2.83a4,4,0,0,0,5.66,0l40-40a4,4,0,1,0-5.66-5.66L132,134.34V32a4,4,0,0,0-8,0V134.34L90.83,101.17a4,4,0,0,0-5.66,5.66Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/ImageSquare.es.js
		const e$14 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm-4,24v63.72L186.14,97.86a20,20,0,0,0-28.28,0L52,203.72V52ZM85.66,204,172,117.66l32,32V204ZM76,96a20,20,0,1,1,20,20A20,20,0,0,1,76,96Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M208,40H48a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8h8.69L166.34,106.34a8,8,0,0,1,11.32,0L216,144.69V48A8,8,0,0,0,208,40ZM96,112a16,16,0,1,1,16-16A16,16,0,0,1,96,112Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM208,208H76l96-96,36,36v60ZM96,120A24,24,0,1,0,72,96,24,24,0,0,0,96,120Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,96,88Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM80,96a16,16,0,1,1,16,16A16,16,0,0,1,80,96Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,34H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V48A14,14,0,0,0,208,34ZM46,208V48a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2v82.2l-28.1-28.1a14,14,0,0,0-19.8,0L54.2,210H48A2,2,0,0,1,46,208Zm162,2H71.17l99.41-99.41a2,2,0,0,1,2.83,0L210,147.17V208A2,2,0,0,1,208,210ZM96,118A22,22,0,1,0,74,96,22,22,0,0,0,96,118Zm0-32A10,10,0,1,1,86,96,10,10,0,0,1,96,86Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM208,208H76l96-96,36,36v60ZM96,120A24,24,0,1,0,72,96,24,24,0,0,0,96,120Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,96,88Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,36H48A12,12,0,0,0,36,48V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V48A12,12,0,0,0,208,36ZM44,208V48a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4v87l-31.51-31.52a12,12,0,0,0-17,0L55,212H48A4,4,0,0,1,44,208Zm164,4H66.34L169.17,109.17a4,4,0,0,1,5.66,0L212,146.34V208A4,4,0,0,1,208,212ZM96,116A20,20,0,1,0,76,96,20,20,0,0,0,96,116Zm0-32A12,12,0,1,1,84,96,12,12,0,0,1,96,84Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/MagicWand.es.js
		const e$13 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M252,152a12,12,0,0,1-12,12H228v12a12,12,0,0,1-24,0V164H192a12,12,0,0,1,0-24h12V128a12,12,0,0,1,24,0v12h12A12,12,0,0,1,252,152ZM56,76H68V88a12,12,0,0,0,24,0V76h12a12,12,0,1,0,0-24H92V40a12,12,0,0,0-24,0V52H56a12,12,0,0,0,0,24ZM184,188h-4v-4a12,12,0,0,0-24,0v4h-4a12,12,0,0,0,0,24h4v4a12,12,0,0,0,24,0v-4h4a12,12,0,0,0,0-24ZM222.14,82.83,82.82,222.14a20,20,0,0,1-28.28,0L33.85,201.46a20,20,0,0,1,0-28.29L173.17,33.86a20,20,0,0,1,28.28,0l20.69,20.68A20,20,0,0,1,222.14,82.83ZM159,112,144,97,53.65,187.31l15,15Zm43.31-43.31-15-15L161,80l15,15Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M176,112,74.34,213.66a8,8,0,0,1-11.31,0L42.34,193a8,8,0,0,1,0-11.31L144,80Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M248,152a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V160H192a8,8,0,0,1,0-16h16V128a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,152ZM56,72H72V88a8,8,0,0,0,16,0V72h16a8,8,0,0,0,0-16H88V40a8,8,0,0,0-16,0V56H56a8,8,0,0,0,0,16ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80ZM208,68.69,187.31,48l-32,32L176,100.69Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M246,152a6,6,0,0,1-6,6H222v18a6,6,0,0,1-12,0V158H192a6,6,0,0,1,0-12h18V128a6,6,0,0,1,12,0v18h18A6,6,0,0,1,246,152ZM56,70H74V88a6,6,0,0,0,12,0V70h18a6,6,0,0,0,0-12H86V40a6,6,0,0,0-12,0V58H56a6,6,0,0,0,0,12ZM184,194H174V184a6,6,0,0,0-12,0v10H152a6,6,0,0,0,0,12h10v10a6,6,0,0,0,12,0V206h10a6,6,0,0,0,0-12ZM217.9,78.59,78.58,217.9a14,14,0,0,1-19.8,0L38.09,197.21a14,14,0,0,1,0-19.8L177.41,38.1a14,14,0,0,1,19.8,0L217.9,58.79A14,14,0,0,1,217.9,78.59ZM167.51,112,144,88.49,46.58,185.9a2,2,0,0,0,0,2.83l20.69,20.68a2,2,0,0,0,2.82,0h0Zm41.9-44.73L188.73,46.59a2,2,0,0,0-2.83,0L152.48,80,176,103.52,209.41,70.1A2,2,0,0,0,209.41,67.27Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M48,64a8,8,0,0,1,8-8H72V40a8,8,0,0,1,16,0V56h16a8,8,0,0,1,0,16H88V88a8,8,0,0,1-16,0V72H56A8,8,0,0,1,48,64ZM184,192h-8v-8a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16Zm56-48H224V128a8,8,0,0,0-16,0v16H192a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V160h16a8,8,0,0,0,0-16ZM219.31,80,80,219.31a16,16,0,0,1-22.62,0L36.68,198.63a16,16,0,0,1,0-22.63L176,36.69a16,16,0,0,1,22.63,0l20.68,20.68A16,16,0,0,1,219.31,80Zm-54.63,32L144,91.31l-96,96L68.68,208ZM208,68.69,187.31,48l-32,32L176,100.69Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M244,152a4,4,0,0,1-4,4H220v20a4,4,0,0,1-8,0V156H192a4,4,0,0,1,0-8h20V128a4,4,0,0,1,8,0v20h20A4,4,0,0,1,244,152ZM56,68H76V88a4,4,0,0,0,8,0V68h20a4,4,0,0,0,0-8H84V40a4,4,0,0,0-8,0V60H56a4,4,0,0,0,0,8ZM184,196H172V184a4,4,0,0,0-8,0v12H152a4,4,0,0,0,0,8h12v12a4,4,0,0,0,8,0V204h12a4,4,0,0,0,0-8ZM216.48,77.17,77.17,216.49a12,12,0,0,1-17,0L39.51,195.8a12,12,0,0,1,0-17L178.83,39.51a12,12,0,0,1,17,0L216.48,60.2A12,12,0,0,1,216.48,77.17ZM170.34,112,144,85.66,45.17,184.49a4,4,0,0,0,0,5.65l20.68,20.69a4,4,0,0,0,5.66,0Zm40.49-46.14L190.14,45.17a4,4,0,0,0-5.66,0L149.65,80,176,106.34l34.83-34.83A4,4,0,0,0,210.83,65.86Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/MagnifyingGlassPlus.es.js
		const e$12 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M156,112a12,12,0,0,1-12,12H124v20a12,12,0,0,1-24,0V124H80a12,12,0,0,1,0-24h20V80a12,12,0,0,1,24,0v20h20A12,12,0,0,1,156,112Zm76.49,120.49a12,12,0,0,1-17,0L168,185a92.12,92.12,0,1,1,17-17l47.54,47.53A12,12,0,0,1,232.49,232.49ZM112,180a68,68,0,1,0-68-68A68.08,68.08,0,0,0,112,180Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M192,112a80,80,0,1,1-80-80A80,80,0,0,1,192,112Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Zm112,0a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M229.66,218.34,179.6,168.28a88.21,88.21,0,1,0-11.32,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM144,120H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24a8,8,0,0,1,0,16Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M150,112a6,6,0,0,1-6,6H118v26a6,6,0,0,1-12,0V118H80a6,6,0,0,1,0-12h26V80a6,6,0,0,1,12,0v26h26A6,6,0,0,1,150,112Zm78.24,116.24a6,6,0,0,1-8.48,0l-51.38-51.38a86.15,86.15,0,1,1,8.48-8.48l51.38,51.38A6,6,0,0,1,228.24,228.24ZM112,186a74,74,0,1,0-74-74A74.09,74.09,0,0,0,112,186Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M152,112a8,8,0,0,1-8,8H120v24a8,8,0,0,1-16,0V120H80a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0v24h24A8,8,0,0,1,152,112Zm77.66,117.66a8,8,0,0,1-11.32,0l-50.06-50.07a88.11,88.11,0,1,1,11.31-11.31l50.07,50.06A8,8,0,0,1,229.66,229.66ZM112,184a72,72,0,1,0-72-72A72.08,72.08,0,0,0,112,184Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M148,112a4,4,0,0,1-4,4H116v28a4,4,0,0,1-8,0V116H80a4,4,0,0,1,0-8h28V80a4,4,0,0,1,8,0v28h28A4,4,0,0,1,148,112Zm78.83,114.83a4,4,0,0,1-5.66,0l-52.7-52.7a84.1,84.1,0,1,1,5.66-5.66l52.7,52.7A4,4,0,0,1,226.83,226.83ZM112,188a76,76,0,1,0-76-76A76.08,76.08,0,0,0,112,188Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/Minus.es.js
		const a$7 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/MusicNotes.es.js
		const a$6 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M215.38,14.54a12,12,0,0,0-10.29-2.18l-128,32A12,12,0,0,0,68,56V159.35A40,40,0,1,0,92,196V113.37l104-26v40A40,40,0,1,0,220,164V24A12,12,0,0,0,215.38,14.54ZM52,212a16,16,0,1,1,16-16A16,16,0,0,1,52,212ZM92,88.63V65.37l104-26V62.63ZM180,180a16,16,0,1,1,16-16A16,16,0,0,1,180,180Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M208,164a28,28,0,1,1-28-28A28,28,0,0,1,208,164ZM52,168a28,28,0,1,0,28,28A28,28,0,0,0,52,168Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M212.92,17.71a7.89,7.89,0,0,0-6.86-1.46l-128,32A8,8,0,0,0,72,56V166.1A36,36,0,1,0,88,196V102.25l112-28V134.1A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.71Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M211.69,19.27a6,6,0,0,0-5.15-1.09l-128,32A6,6,0,0,0,74,56V170.11A34,34,0,1,0,86,196V108.68l116-29v58.43A34,34,0,1,0,214,164V24A6,6,0,0,0,211.69,19.27ZM52,218a22,22,0,1,1,22-22A22,22,0,0,1,52,218ZM86,96.32V60.68l116-29V67.32ZM180,186a22,22,0,1,1,22-22A22,22,0,0,1,180,186Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M210.46,20.85a4,4,0,0,0-3.43-.73l-128,32A4,4,0,0,0,76,56V174.87A32,32,0,1,0,84,196V107.12l120-30v65.75A32,32,0,1,0,212,164V24A4,4,0,0,0,210.46,20.85ZM52,220a24,24,0,1,1,24-24A24,24,0,0,1,52,220Zm128-32a24,24,0,1,1,24-24A24,24,0,0,1,180,188ZM84,98.88V59.12l120-30V68.88Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/PencilSimple.es.js
		const e$11 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M230.14,70.54,185.46,25.85a20,20,0,0,0-28.29,0L33.86,149.17A19.85,19.85,0,0,0,28,163.31V208a20,20,0,0,0,20,20H92.69a19.86,19.86,0,0,0,14.14-5.86L230.14,98.82a20,20,0,0,0,0-28.28ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM192,108.68,147.31,64l24-24L216,84.68Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M225.9,74.78,181.21,30.09a14,14,0,0,0-19.8,0L38.1,153.41a13.94,13.94,0,0,0-4.1,9.9V208a14,14,0,0,0,14,14H92.69a13.94,13.94,0,0,0,9.9-4.1L225.9,94.58a14,14,0,0,0,0-19.8ZM94.1,209.41a2,2,0,0,1-1.41.59H48a2,2,0,0,1-2-2V163.31a2,2,0,0,1,.59-1.41L136,72.48,183.51,120ZM217.41,86.1,192,111.51,144.49,64,169.9,38.58a2,2,0,0,1,2.83,0l44.68,44.69a2,2,0,0,1,0,2.83Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224.49,76.2,179.8,31.51a12,12,0,0,0-17,0L133.17,61.17h0L39.52,154.83A11.9,11.9,0,0,0,36,163.31V208a12,12,0,0,0,12,12H92.69a12,12,0,0,0,8.48-3.51L224.48,93.17a12,12,0,0,0,0-17Zm-129,134.63A4,4,0,0,1,92.69,212H48a4,4,0,0,1-4-4V163.31a4,4,0,0,1,1.17-2.83L136,69.65,186.34,120ZM218.83,87.51,192,114.34,141.66,64l26.82-26.83a4,4,0,0,1,5.66,0l44.69,44.68a4,4,0,0,1,0,5.66Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/Plus.es.js
		const a$5 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H134v82a6,6,0,0,1-12,0V134H40a6,6,0,0,1,0-12h82V40a6,6,0,0,1,12,0v82h82A6,6,0,0,1,222,128Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H132v84a4,4,0,0,1-8,0V132H40a4,4,0,0,1,0-8h84V40a4,4,0,0,1,8,0v84h84A4,4,0,0,1,220,128Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/Sparkle.es.js
		const l$2 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M199,125.31l-49.88-18.39L130.69,57a19.92,19.92,0,0,0-37.38,0L74.92,106.92,25,125.31a19.92,19.92,0,0,0,0,37.38l49.88,18.39L93.31,231a19.92,19.92,0,0,0,37.38,0l18.39-49.88L199,162.69a19.92,19.92,0,0,0,0-37.38Zm-63.38,35.16a12,12,0,0,0-7.11,7.11L112,212.28l-16.47-44.7a12,12,0,0,0-7.11-7.11L43.72,144l44.7-16.47a12,12,0,0,0,7.11-7.11L112,75.72l16.47,44.7a12,12,0,0,0,7.11,7.11L180.28,144ZM140,40a12,12,0,0,1,12-12h12V16a12,12,0,0,1,24,0V28h12a12,12,0,0,1,0,24H188V64a12,12,0,0,1-24,0V52H152A12,12,0,0,1,140,40ZM252,88a12,12,0,0,1-12,12h-4v4a12,12,0,0,1-24,0v-4h-4a12,12,0,0,1,0-24h4V72a12,12,0,0,1,24,0v4h4A12,12,0,0,1,252,88Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M194.82,151.43l-55.09,20.3-20.3,55.09a7.92,7.92,0,0,1-14.86,0l-20.3-55.09-55.09-20.3a7.92,7.92,0,0,1,0-14.86l55.09-20.3,20.3-55.09a7.92,7.92,0,0,1,14.86,0l20.3,55.09,55.09,20.3A7.92,7.92,0,0,1,194.82,151.43Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M196.89,130.94,144.4,111.6,125.06,59.11a13.92,13.92,0,0,0-26.12,0L79.6,111.6,27.11,130.94a13.92,13.92,0,0,0,0,26.12L79.6,176.4l19.34,52.49a13.92,13.92,0,0,0,26.12,0L144.4,176.4l52.49-19.34a13.92,13.92,0,0,0,0-26.12Zm-4.15,14.86-55.08,20.3a6,6,0,0,0-3.56,3.56l-20.3,55.08a1.92,1.92,0,0,1-3.6,0L89.9,169.66a6,6,0,0,0-3.56-3.56L31.26,145.8a1.92,1.92,0,0,1,0-3.6l55.08-20.3a6,6,0,0,0,3.56-3.56l20.3-55.08a1.92,1.92,0,0,1,3.6,0l20.3,55.08a6,6,0,0,0,3.56,3.56l55.08,20.3a1.92,1.92,0,0,1,0,3.6ZM146,40a6,6,0,0,1,6-6h18V16a6,6,0,0,1,12,0V34h18a6,6,0,0,1,0,12H182V64a6,6,0,0,1-12,0V46H152A6,6,0,0,1,146,40ZM246,88a6,6,0,0,1-6,6H230v10a6,6,0,0,1-12,0V94H208a6,6,0,0,1,0-12h10V72a6,6,0,0,1,12,0V82h10A6,6,0,0,1,246,88Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M196.2,132.81l-53.36-19.65L123.19,59.8a11.93,11.93,0,0,0-22.38,0L81.16,113.16,27.8,132.81a11.93,11.93,0,0,0,0,22.38l53.36,19.65,19.65,53.36a11.93,11.93,0,0,0,22.38,0l19.65-53.36,53.36-19.65a11.93,11.93,0,0,0,0-22.38Zm-2.77,14.87L138.35,168a4,4,0,0,0-2.37,2.37l-20.3,55.08a3.92,3.92,0,0,1-7.36,0L88,170.35A4,4,0,0,0,85.65,168l-55.08-20.3a3.92,3.92,0,0,1,0-7.36L85.65,120A4,4,0,0,0,88,117.65l20.3-55.08a3.92,3.92,0,0,1,7.36,0L136,117.65a4,4,0,0,0,2.37,2.37l55.08,20.3a3.92,3.92,0,0,1,0,7.36ZM148,40a4,4,0,0,1,4-4h20V16a4,4,0,0,1,8,0V36h20a4,4,0,0,1,0,8H180V64a4,4,0,0,1-8,0V44H152A4,4,0,0,1,148,40Zm96,48a4,4,0,0,1-4,4H228v12a4,4,0,0,1-8,0V92H208a4,4,0,0,1,0-8h12V72a4,4,0,0,1,8,0V84h12A4,4,0,0,1,244,88Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/SquaresFour.es.js
		const e$10 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M100,36H56A20,20,0,0,0,36,56v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,100,36ZM96,96H60V60H96ZM200,36H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,60H160V60h36Zm-96,40H56a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,100,136Zm-4,60H60V160H96Zm104-60H156a20,20,0,0,0-20,20v44a20,20,0,0,0,20,20h44a20,20,0,0,0,20-20V156A20,20,0,0,0,200,136Zm-4,60H160V160h36Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M112,56v48a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h48A8,8,0,0,1,112,56Zm88-8H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48Zm-96,96H56a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,104,144Zm96,0H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,200,144Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M200,136H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48ZM104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M120,56v48a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40h48A16,16,0,0,1,120,56Zm80-16H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-96,96H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm96,0H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M104,42H56A14,14,0,0,0,42,56v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V56A14,14,0,0,0,104,42Zm2,62a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2Zm94-62H152a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,62a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2Zm-98,34H56a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V152A14,14,0,0,0,104,138Zm2,62a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V152a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2Zm94-62H152a14,14,0,0,0-14,14v48a14,14,0,0,0,14,14h48a14,14,0,0,0,14-14V152A14,14,0,0,0,200,138Zm2,62a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V152a2,2,0,0,1,2-2h48a2,2,0,0,1,2,2Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M104,44H56A12,12,0,0,0,44,56v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V56A12,12,0,0,0,104,44Zm4,60a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4Zm92-60H152a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,60a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4ZM104,140H56a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V152A12,12,0,0,0,104,140Zm4,60a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V152a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4Zm92-60H152a12,12,0,0,0-12,12v48a12,12,0,0,0,12,12h48a12,12,0,0,0,12-12V152A12,12,0,0,0,200,140Zm4,60a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V152a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/Stop.es.js
		const a$4 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M200,36H56A20,20,0,0,0,36,56V200a20,20,0,0,0,20,20H200a20,20,0,0,0,20-20V56A20,20,0,0,0,200,36Zm-4,160H60V60H196Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M208,56V200a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,158a2,2,0,0,1-2,2H56a2,2,0,0,1-2-2V56a2,2,0,0,1,2-2H200a2,2,0,0,1,2,2Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,160H56V56H200V200Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M200,44H56A12,12,0,0,0,44,56V200a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V56A12,12,0,0,0,200,44Zm4,156a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V56a4,4,0,0,1,4-4H200a4,4,0,0,1,4,4Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/TextT.es.js
		const e$9 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M212,56V88a12,12,0,0,1-24,0V68H140V188h20a12,12,0,0,1,0,24H96a12,12,0,0,1,0-24h20V68H68V88a12,12,0,0,1-24,0V56A12,12,0,0,1,56,44H200A12,12,0,0,1,212,56Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M200,56V184a16,16,0,0,1-16,16H72a16,16,0,0,1-16-16V56Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,96a8,8,0,0,1-16,0V88H136v88h12a8,8,0,0,1,0,16H108a8,8,0,0,1,0-16h12V88H88v8a8,8,0,0,1-16,0V80a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M206,56V88a6,6,0,0,1-12,0V62H134V194h26a6,6,0,0,1,0,12H96a6,6,0,0,1,0-12h26V62H62V88a6,6,0,0,1-12,0V56a6,6,0,0,1,6-6H200A6,6,0,0,1,206,56Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M204,56V88a4,4,0,0,1-8,0V60H132V196h28a4,4,0,0,1,0,8H96a4,4,0,0,1,0-8h28V60H60V88a4,4,0,0,1-8,0V56a4,4,0,0,1,4-4H200A4,4,0,0,1,204,56Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/Trash.es.js
		const e$8 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,50H174V40a22,22,0,0,0-22-22H104A22,22,0,0,0,82,40V50H40a6,6,0,0,0,0,12H50V208a14,14,0,0,0,14,14H192a14,14,0,0,0,14-14V62h10a6,6,0,0,0,0-12ZM94,40a10,10,0,0,1,10-10h48a10,10,0,0,1,10,10V50H94ZM194,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V62H194ZM110,104v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Zm48,0v64a6,6,0,0,1-12,0V104a6,6,0,0,1,12,0Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M216,52H172V40a20,20,0,0,0-20-20H104A20,20,0,0,0,84,40V52H40a4,4,0,0,0,0,8H52V208a12,12,0,0,0,12,12H192a12,12,0,0,0,12-12V60h12a4,4,0,0,0,0-8ZM92,40a12,12,0,0,1,12-12h48a12,12,0,0,1,12,12V52H92ZM196,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V60H196ZM108,104v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Zm48,0v64a4,4,0,0,1-8,0V104a4,4,0,0,1,8,0Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/UploadSimple.es.js
		const e$7 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M216,48V208H40V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM88,80h32v64a8,8,0,0,0,16,0V80h32a8,8,0,0,0,5.66-13.66l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,88,80Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M222,144v64a6,6,0,0,1-6,6H40a6,6,0,0,1-6-6V144a6,6,0,0,1,12,0v58H210V144a6,6,0,0,1,12,0ZM92.24,76.24,122,46.49V144a6,6,0,0,0,12,0V46.49l29.76,29.75a6,6,0,0,0,8.48-8.48l-40-40a6,6,0,0,0-8.48,0l-40,40a6,6,0,0,0,8.48,8.48Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0ZM93.66,77.66,120,51.31V144a8,8,0,0,0,16,0V51.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,77.66Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M220,144v64a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V144a4,4,0,0,1,8,0v60H212V144a4,4,0,0,1,8,0ZM90.83,74.83,124,41.66V144a4,4,0,0,0,8,0V41.66l33.17,33.17a4,4,0,1,0,5.66-5.66l-40-40a4,4,0,0,0-5.66,0l-40,40a4,4,0,0,0,5.66,5.66Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/defs/X.es.js
		const a$3 = /* @__PURE__ */ new Map([
			["bold", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" }))],
			["duotone", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", {
				d: "M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z",
				opacity: "0.2"
			}), /* @__PURE__ */ react.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))],
			["fill", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))],
			["light", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z" }))],
			["regular", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" }))],
			["thin", /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement("path", { d: "M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z" }))]
		]);
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/lib/context.es.js
		const o$4 = (0, react.createContext)({
			color: "currentColor",
			size: "1em",
			weight: "regular",
			mirrored: !1
		});
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/lib/IconBase.es.js
		const p = react.forwardRef((s, a) => {
			const { alt: n, color: r, size: t, weight: o, mirrored: c, children: i, weights: m, ...x } = s, { color: d = "currentColor", size: l, weight: f = "regular", mirrored: g = !1, ...w } = react.useContext(o$4);
			return /* @__PURE__ */ react.createElement("svg", {
				ref: a,
				xmlns: "http://www.w3.org/2000/svg",
				width: t != null ? t : l,
				height: t != null ? t : l,
				fill: r != null ? r : d,
				viewBox: "0 0 256 256",
				transform: c || g ? "scale(-1, 1)" : void 0,
				...w,
				...x
			}, !!n && /* @__PURE__ */ react.createElement("title", null, n), i, m.get(o != null ? o : f));
		});
		p.displayName = "IconBase";
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/ArrowCounterClockwise.es.js
		const r$5 = react.forwardRef((e, t) => /* @__PURE__ */ react.createElement(p, {
			ref: t,
			...e,
			weights: e$18
		}));
		r$5.displayName = "ArrowCounterClockwiseIcon";
		const i$1 = r$5;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/ArrowUp.es.js
		const r$4 = react.forwardRef((e, t) => /* @__PURE__ */ react.createElement(p, {
			ref: t,
			...e,
			weights: a$8
		}));
		r$4.displayName = "ArrowUpIcon";
		const s$3 = r$4;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/ArrowsInSimple.es.js
		const r$3 = react.forwardRef((e, m) => /* @__PURE__ */ react.createElement(p, {
			ref: m,
			...e,
			weights: e$17
		}));
		r$3.displayName = "ArrowsInSimpleIcon";
		const i = r$3;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/CaretDown.es.js
		const e$6 = react.forwardRef((r, t) => /* @__PURE__ */ react.createElement(p, {
			ref: t,
			...r,
			weights: t$1
		}));
		e$6.displayName = "CaretDownIcon";
		const s$2 = e$6;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/CornersOut.es.js
		const r$2 = react.forwardRef((e, t) => /* @__PURE__ */ react.createElement(p, {
			ref: t,
			...e,
			weights: e$16
		}));
		r$2.displayName = "CornersOutIcon";
		const c = r$2;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/DownloadSimple.es.js
		const e$5 = react.forwardRef((a, m) => /* @__PURE__ */ react.createElement(p, {
			ref: m,
			...a,
			weights: e$15
		}));
		e$5.displayName = "DownloadSimpleIcon";
		const l$1 = e$5;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/ImageSquare.es.js
		const a$2 = react.forwardRef((o, r) => /* @__PURE__ */ react.createElement(p, {
			ref: r,
			...o,
			weights: e$14
		}));
		a$2.displayName = "ImageSquareIcon";
		const I = a$2;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/MagicWand.es.js
		const o$3 = react.forwardRef((c, e) => /* @__PURE__ */ react.createElement(p, {
			ref: e,
			...c,
			weights: e$13
		}));
		o$3.displayName = "MagicWandIcon";
		const m$2 = o$3;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/MagnifyingGlassPlus.es.js
		const a$1 = react.forwardRef((o, n) => /* @__PURE__ */ react.createElement(p, {
			ref: n,
			...o,
			weights: e$12
		}));
		a$1.displayName = "MagnifyingGlassPlusIcon";
		const f = a$1;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/Minus.es.js
		const e$4 = react.forwardRef((r, s) => /* @__PURE__ */ react.createElement(p, {
			ref: s,
			...r,
			weights: a$7
		}));
		e$4.displayName = "MinusIcon";
		const m$1 = e$4;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/MusicNotes.es.js
		const e$3 = react.forwardRef((s, t) => /* @__PURE__ */ react.createElement(p, {
			ref: t,
			...s,
			weights: a$6
		}));
		e$3.displayName = "MusicNotesIcon";
		const m = e$3;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/PencilSimple.es.js
		const o$2 = react.forwardRef((i, m) => /* @__PURE__ */ react.createElement(p, {
			ref: m,
			...i,
			weights: e$11
		}));
		o$2.displayName = "PencilSimpleIcon";
		const a = o$2;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/Plus.es.js
		const e$2 = react.forwardRef((r, s) => /* @__PURE__ */ react.createElement(p, {
			ref: s,
			...r,
			weights: a$5
		}));
		e$2.displayName = "PlusIcon";
		const n$4 = e$2;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/Sparkle.es.js
		const o$1 = react.forwardRef((r, a) => /* @__PURE__ */ react.createElement(p, {
			ref: a,
			...r,
			weights: l$2
		}));
		o$1.displayName = "SparkleIcon";
		const s$1 = o$1;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/SquaresFour.es.js
		const r$1 = react.forwardRef((e, a) => /* @__PURE__ */ react.createElement(p, {
			ref: a,
			...e,
			weights: e$10
		}));
		r$1.displayName = "SquaresFourIcon";
		const n$3 = r$1;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/Stop.es.js
		const t = react.forwardRef((e, r) => /* @__PURE__ */ react.createElement(p, {
			ref: r,
			...e,
			weights: a$4
		}));
		t.displayName = "StopIcon";
		const s = t;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/TextT.es.js
		const o = react.forwardRef((t, r) => /* @__PURE__ */ react.createElement(p, {
			ref: r,
			...t,
			weights: e$9
		}));
		o.displayName = "TextTIcon";
		const n$2 = o;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/Trash.es.js
		const r = react.forwardRef((a, e) => /* @__PURE__ */ react.createElement(p, {
			ref: e,
			...a,
			weights: e$8
		}));
		r.displayName = "TrashIcon";
		const n$1 = r;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/UploadSimple.es.js
		const e$1 = react.forwardRef((a, m) => /* @__PURE__ */ react.createElement(p, {
			ref: m,
			...a,
			weights: e$7
		}));
		e$1.displayName = "UploadSimpleIcon";
		const l = e$1;
		//#endregion
		//#region node_modules/.pnpm/@phosphor-icons+react@2.1.10_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@phosphor-icons/react/dist/csr/X.es.js
		const e = react.forwardRef((r, t) => /* @__PURE__ */ react.createElement(p, {
			ref: t,
			...r,
			weights: a$3
		}));
		e.displayName = "XIcon";
		const n = e;
		//#endregion
		//#region src/client/styles.js
		/**
		* Ported weshop 2.0 (v0.6.0) styles, scoped under .weshop-root so they never
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

.canvas { position: absolute; inset: 68px 0 0; overflow: hidden; touch-action: none; cursor: grab; background: #f8f8f5; }
.canvas:active { cursor: grabbing; }
.canvas.is-drop-active { cursor: copy; }
.world { position: absolute; inset: 0; width: 3000px; height: 2200px; transform-origin: 0 0; will-change: transform; }
.result-card { position: absolute; overflow: hidden; border-radius: 5px; background: #e8e8e3; box-shadow: 0 1px 2px rgba(22,23,20,.08), 0 12px 38px rgba(22,23,20,.08); cursor: move; user-select: none; transition: box-shadow .18s ease; }
.result-card.is-selected { box-shadow: 0 0 0 3px #f7f7f4, 0 0 0 5px #222320, 0 18px 48px rgba(22,23,20,.16); }
.result-card img { width: 100%; display: block; pointer-events: none; }
.result-card > video { width: 100%; display: block; background: #171816; }
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

.canvas-controls, .selection-actions { position: fixed; z-index: 30; display: flex; flex-direction: row; align-items: center; padding: 5px; border: 1px solid rgba(32,33,31,.1); border-radius: 12px; background: rgba(255,255,252,.94); box-shadow: 0 8px 30px rgba(28,29,26,.1); backdrop-filter: blur(16px); }
.canvas-controls { right: 18px; bottom: 18px; }
.canvas-controls button, .selection-actions button, .selection-actions a { width: 31px; height: 31px; display: grid; place-items: center; border: 0; border-radius: 8px; color: #444540; background: transparent; cursor: pointer; }
.canvas-controls button:hover, .selection-actions button:hover, .selection-actions a:hover { background: #efefe9; }
.canvas-controls span { width: 51px; text-align: center; color: #777873; font-size: 11px; }
.canvas-controls i { width: 1px; height: 18px; margin: 0 3px; background: #deded8; }
.selection-actions { left: 50%; bottom: 20px; transform: translateX(-50%); gap: 2px; }
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
.dialog-actions .submit-edit { display: inline-flex; align-items: center; gap: 6px; color: white; background: #244d3e; }
.dialog-actions .submit-edit:disabled { opacity: .38; cursor: default; }

.toast { position: fixed; z-index: 100; left: 50%; bottom: 22px; transform: translateX(-50%); min-width: 310px; display: grid; grid-template-columns: 12px 1fr; align-items: center; column-gap: 7px; padding: 12px 15px; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: white; background: rgba(31,35,32,.94); box-shadow: 0 12px 35px rgba(20,22,19,.22); font-size: 11px; backdrop-filter: blur(16px); }
.toast small { grid-column: 2; margin-top: 2px; color: #aeb7b1; font-size: 9px; }
.toast-dot { width: 7px; height: 7px; border-radius: 50%; background: #75c99c; box-shadow: 0 0 0 4px rgba(117,201,156,.12); }

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
.weshop-split .canvas-controls, .weshop-split .selection-actions { position: absolute; }
.weshop-split .canvas-controls { right: 12px; bottom: 12px; }
.weshop-split .selection-actions { left: 50%; bottom: 14px; }
.weshop-split .agent-progress { position: absolute; right: 12px; top: 62px; }

/* ── canvas studio: full canvas plus the live Harness session ───────────── */
.weshop-studio { display: grid; grid-template-columns: minmax(0, 1fr) clamp(350px, 29vw, 460px); background: #eeeee9; }
.weshop-canvas-pane { position: relative; min-width: 0; height: 100%; overflow: hidden; border-right: 1px solid rgba(31,32,30,.1); }
.canvas-chat { min-width: 0; height: 100%; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; color: #272824; background: #fbfbf8; }
.canvas-chat-head { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 13px 16px 12px 18px; border-bottom: 1px solid #e8e8e2; }
.canvas-chat-head > div { min-width: 0; display: grid; gap: 4px; }
.canvas-chat-head span { color: #77867d; font-size: 8px; font-weight: 750; letter-spacing: .14em; }
.canvas-chat-head strong { overflow: hidden; font: 650 13px/1.2 "Manrope", system-ui, sans-serif; text-overflow: ellipsis; white-space: nowrap; }
.canvas-chat-head button { width: 32px; height: 32px; flex: none; display: grid; place-items: center; padding: 0; border: 0; border-radius: 9px; color: #676862; background: #efefe9; cursor: pointer; }
.canvas-chat-head button:hover { color: #242522; background: #e5e6df; }
.canvas-chat-feed { overflow: auto; padding: 22px 18px 28px; scroll-behavior: smooth; }
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
.canvas-chat-compose { padding: 12px 14px 14px; border-top: 1px solid #e5e6df; background: rgba(251,251,248,.94); backdrop-filter: blur(18px); }
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
  .weshop-canvas-pane { border-right: 0; border-bottom: 1px solid rgba(31,32,30,.1); }
  .canvas-chat-head { min-height: 50px; padding-block: 8px; }
  .canvas-chat-feed { padding-block: 14px; }
  .canvas-chat-empty { min-height: 12vh; }
}

@media (prefers-reduced-motion: reduce) { .weshop-root * { transition: none !important; } }
`;
		let injected = false;
		function injectWeshopStyles() {
			if (injected || typeof document === "undefined") return;
			injected = true;
			const tag = document.createElement("style");
			tag.dataset.plugin = "@weshop/dsh-weshop-2-0";
			tag.dataset.pluginCss = "@weshop/dsh-weshop-2-0/styles";
			tag.textContent = CSS;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/CanvasWorkspace.jsx
		const STORAGE_KEY = "weshop-2-0-dsh:spaces:v1";
		const blankCanvas = (index = 1) => ({
			id: `canvas-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
			title: index === 1 ? "Untitled space" : `Untitled space ${index}`,
			items: [],
			view: {
				x: 0,
				y: 0,
				scale: .72
			}
		});
		function restoreCanvases() {
			try {
				const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
				if (saved?.length) return saved;
			} catch {}
			return [blankCanvas()];
		}
		function WeshopWorkspace({ onExit, embedded = false, initialActionCursor = Date.now() }) {
			const [canvases, setCanvases] = (0, react.useState)(restoreCanvases);
			const [activeCanvasId, setActiveCanvasId] = (0, react.useState)(canvases[0].id);
			const activeInitial = canvases.find((canvas) => canvas.id === activeCanvasId) || canvases[0];
			const [items, setItems] = (0, react.useState)(activeInitial.items);
			const [view, setView] = (0, react.useState)(activeInitial.view);
			const [selected, setSelected] = (0, react.useState)(null);
			const [title, setTitle] = (0, react.useState)(activeInitial.title);
			const [canvasMenuOpen, setCanvasMenuOpen] = (0, react.useState)(false);
			const [contextMenu, setContextMenu] = (0, react.useState)(null);
			const [lightbox, setLightbox] = (0, react.useState)(null);
			const [editDialog, setEditDialog] = (0, react.useState)(null);
			const [editPrompt, setEditPrompt] = (0, react.useState)("");
			const [dropActive, setDropActive] = (0, react.useState)(false);
			const [toast, setToast] = (0, react.useState)(null);
			const [progress, setProgress] = (0, react.useState)(null);
			const [addMenuOpen, setAddMenuOpen] = (0, react.useState)(false);
			const [textDialogOpen, setTextDialogOpen] = (0, react.useState)(false);
			const [newText, setNewText] = (0, react.useState)("");
			const [elapsed, setElapsed] = (0, react.useState)(0);
			const stageRef = (0, react.useRef)(null);
			const gesture = (0, react.useRef)(null);
			const fileRef = (0, react.useRef)(null);
			const actionCursor = (0, react.useRef)(initialActionCursor);
			const itemsRef = (0, react.useRef)(items);
			const historyRef = (0, react.useRef)([]);
			const [undoDepth, setUndoDepth] = (0, react.useState)(0);
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
				setSelected(null);
				setUndoDepth(historyRef.current.length);
				notify("已返回上一步");
			};
			(0, react.useEffect)(() => {
				setCanvases((all) => all.map((canvas) => canvas.id === activeCanvasId ? {
					...canvas,
					title,
					items,
					view
				} : canvas));
			}, [
				activeCanvasId,
				items,
				title,
				view
			]);
			(0, react.useEffect)(() => {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(canvases));
			}, [canvases]);
			const canvasState = (0, react.useMemo)(() => {
				const describeItem = ({ src, localPath, ...item }) => {
					const resolvedUrl = src ? new URL(src, window.location.origin) : null;
					return {
						...item,
						asset: item.mediaType === "text" ? {
							transport: "inline-text",
							content: item.content || "",
							readableByAgent: true
						} : src?.startsWith("data:") ? {
							transport: "browser-data-url",
							readableByAgent: false
						} : {
							transport: resolvedUrl?.origin === window.location.origin ? "local-url" : "remote-url",
							url: resolvedUrl?.href || null,
							...localPath ? { localPath } : {},
							readableByAgent: true
						}
					};
				};
				const activeItem = items.find((item) => item.id === selected);
				return {
					version: 3,
					canvasId: activeCanvasId,
					title,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
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
						text: items.filter((item) => item.mediaType === "text").length
					},
					canvases: canvases.map((canvas) => ({
						id: canvas.id,
						title: canvas.id === activeCanvasId ? title : canvas.title,
						itemCount: canvas.id === activeCanvasId ? items.length : canvas.items.length,
						active: canvas.id === activeCanvasId
					})),
					items: items.map(describeItem)
				};
			}, [
				activeCanvasId,
				canvases,
				items,
				selected,
				title,
				view
			]);
			(0, react.useEffect)(() => {
				const timer = setTimeout(() => fetch("/api/weshop/state", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(canvasState)
				}).catch(() => void 0), 80);
				return () => clearTimeout(timer);
			}, [canvasState]);
			(0, react.useEffect)(() => {
				const applyActions = async () => {
					try {
						const data = await (await fetch(`/api/weshop/actions?after=${actionCursor.current}`)).json();
						for (const action of data.actions || []) {
							actionCursor.current = Math.max(actionCursor.current, action.sequence || 0);
							if (action.type !== "add-asset" || !action.payload?.url && !action.payload?.content) continue;
							const payload = action.payload;
							const append = (aspect = payload.aspect || 1.5) => replaceItems((all) => {
								if (all.some((item) => item.id === payload.id)) return all;
								const index = all.length;
								return [...all, {
									id: payload.id,
									kind: "result",
									mediaType: payload.mediaType || "image",
									...payload.url ? { src: payload.url } : {},
									...payload.content ? { content: payload.content } : {},
									...payload.localPath ? { localPath: payload.localPath } : {},
									title: payload.title || "Generated result",
									provenance: payload.provenance || { method: "agent-generation" },
									createdAt: payload.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
									x: (180 - view.x) / view.scale + index % 3 * 34,
									y: (210 - view.y) / view.scale + index % 4 * 30,
									width: payload.width || 460,
									aspect
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
					} catch {}
				};
				const timer = setInterval(applyActions, 1e3);
				return () => clearInterval(timer);
			}, [view]);
			(0, react.useEffect)(() => {
				const readProgress = async () => {
					try {
						const response = await fetch("/api/weshop/progress");
						if (response.ok) setProgress(await response.json());
					} catch {}
				};
				readProgress();
				const timer = setInterval(readProgress, 900);
				return () => clearInterval(timer);
			}, []);
			(0, react.useEffect)(() => {
				if (!progress?.startedAt || [
					"complete",
					"error",
					"idle"
				].includes(progress.stage)) {
					setElapsed(0);
					return;
				}
				const update = () => setElapsed(Math.max(0, Math.floor((Date.now() - new Date(progress.startedAt).getTime()) / 1e3)));
				update();
				const timer = setInterval(update, 1e3);
				return () => clearInterval(timer);
			}, [progress?.stage, progress?.startedAt]);
			const selectedItem = (0, react.useMemo)(() => items.find((item) => item.id === selected), [items, selected]);
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
				setView(canvas.view || {
					x: 0,
					y: 0,
					scale: .72
				});
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
					return {
						scale,
						x: px - worldX * scale,
						y: py - worldY * scale
					};
				});
			};
			const onWheel = (event) => {
				event.preventDefault();
				if (event.ctrlKey || event.metaKey) zoomAt(view.scale * Math.exp(-event.deltaY * .004), event.clientX, event.clientY);
				else setView((current) => ({
					...current,
					x: current.x - event.deltaX,
					y: current.y - event.deltaY
				}));
			};
			const beginPan = (event) => {
				if (event.button !== 0 || event.target.closest("[data-result]")) return;
				setSelected(null);
				gesture.current = {
					type: "pan",
					startX: event.clientX,
					startY: event.clientY,
					view
				};
				event.currentTarget.setPointerCapture(event.pointerId);
			};
			const beginDrag = (event, item) => {
				event.stopPropagation();
				setSelected(item.id);
				gesture.current = {
					type: "item",
					id: item.id,
					startX: event.clientX,
					startY: event.clientY,
					x: item.x,
					y: item.y,
					recorded: false
				};
				stageRef.current.setPointerCapture(event.pointerId);
			};
			const beginResize = (event, item) => {
				event.stopPropagation();
				setSelected(item.id);
				gesture.current = {
					type: "resize",
					id: item.id,
					startX: event.clientX,
					width: item.width,
					recorded: false
				};
				stageRef.current.setPointerCapture(event.pointerId);
			};
			const onPointerMove = (event) => {
				const current = gesture.current;
				if (!current) return;
				if (current.type === "pan") {
					setView({
						...current.view,
						x: current.view.x + event.clientX - current.startX,
						y: current.view.y + event.clientY - current.startY
					});
					return;
				}
				const dx = (event.clientX - current.startX) / view.scale;
				if (!current.recorded) {
					recordUndo();
					current.recorded = true;
				}
				if (current.type === "resize") {
					const width = Math.min(1200, Math.max(120, current.width + dx));
					replaceItems((all) => all.map((item) => item.id === current.id ? {
						...item,
						width
					} : item), { record: false });
					return;
				}
				const dy = (event.clientY - current.startY) / view.scale;
				replaceItems((all) => all.map((item) => item.id === current.id ? {
					...item,
					x: current.x + dx,
					y: current.y + dy
				} : item), { record: false });
			};
			const arrange = () => {
				replaceItems((all) => all.map((item, index) => ({
					...item,
					x: 140 + index % 3 * 470,
					y: 300 + Math.floor(index / 3) * 340
				})));
				setView({
					x: 0,
					y: 0,
					scale: .72
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
				setView({
					scale,
					x: (rect.width - (maxX - minX) * scale) / 2 - minX * scale,
					y: (rect.height - (maxY - minY) * scale) / 2 - minY * scale + 20
				});
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
									body: JSON.stringify({
										name: file.name,
										type: file.type,
										dataUrl: reader.result
									})
								});
								if (response.ok) asset = await response.json();
							} catch {}
							replaceItems((all) => [...all, {
								id: `material-${Date.now()}-${index}`,
								kind: "material",
								mediaType,
								...mediaType === "text" ? { content: String(reader.result) } : { src: asset.url },
								...asset.localPath ? { localPath: asset.localPath } : {},
								title: file.name.replace(/\.[^.]+$/, ""),
								provenance: {
									method: "local-upload",
									source: file.name,
									mimeType: file.type,
									bytes: file.size
								},
								createdAt: (/* @__PURE__ */ new Date()).toISOString(),
								x: dropPoint ? (dropPoint.x - view.x) / view.scale + index * 26 : (160 - view.x) / view.scale + all.length * 36,
								y: dropPoint ? (dropPoint.y - view.y) / view.scale + index * 26 : (180 - view.y) / view.scale + all.length * 28,
								width: 420,
								aspect
							}]);
						};
						if (mediaType === "image") {
							const image = new Image();
							image.onload = () => addAsset(image.width / image.height);
							image.src = reader.result;
						} else if (mediaType === "video") {
							const video = document.createElement("video");
							video.onloadedmetadata = () => addAsset(video.videoWidth / video.videoHeight || 16 / 9);
							video.src = reader.result;
						} else addAsset(mediaType === "audio" ? 2.6 : 1.35);
					};
					if (file.type === "text/plain") reader.readAsText(file);
					else reader.readAsDataURL(file);
				});
			};
			const addTextCard = () => {
				if (!newText.trim()) return;
				replaceItems((all) => [...all, {
					id: `material-text-${Date.now()}`,
					kind: "material",
					mediaType: "text",
					title: newText.trim().split("\n")[0].slice(0, 48) || "Text",
					content: newText.trim(),
					provenance: {
						method: "canvas-text",
						source: "User text"
					},
					createdAt: (/* @__PURE__ */ new Date()).toISOString(),
					x: (180 - view.x) / view.scale + all.length * 28,
					y: (190 - view.y) / view.scale + all.length * 24,
					width: 360,
					aspect: 1.35
				}]);
				setNewText("");
				setTextDialogOpen(false);
				setAddMenuOpen(false);
			};
			const importImages = (event) => {
				addFiles(event.target.files);
				event.target.value = "";
			};
			const onDrop = (event) => {
				event.preventDefault();
				setDropActive(false);
				const rect = stageRef.current.getBoundingClientRect();
				addFiles(event.dataTransfer.files, {
					x: event.clientX - rect.left,
					y: event.clientY - rect.top
				});
			};
			const queueOperation = async (type, item, prompt = "") => {
				setContextMenu(null);
				try {
					if (!(await fetch("/api/weshop/requests", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({
							type,
							itemId: item.id,
							prompt
						})
					})).ok) throw new Error("request failed");
					notify(type === "reverse-prompt" ? "已提交反推提示词任务" : type === "upscale" ? "已提交高清放大任务" : "已提交局部编辑任务");
				} catch {
					notify("任务提交失败，请确认本地画布服务正在运行");
				}
			};
			const removeSelected = () => {
				if (!selected) return;
				replaceItems((all) => all.filter((item) => item.id !== selected));
				setSelected(null);
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
					window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1e3);
					notify("已开始下载");
				} catch {
					window.open(selectedItem.src, "_blank", "noopener,noreferrer");
					notify("原图已打开，可从浏览器保存");
				}
			};
			(0, react.useEffect)(() => {
				const onKey = (event) => {
					const editing = (event.target instanceof Element ? event.target : null)?.closest("input, textarea, select, [contenteditable='true'], [role='textbox']") !== null;
					if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z" && !event.shiftKey && !editing) {
						event.preventDefault();
						undo();
						return;
					}
					if ((event.key === "Backspace" || event.key === "Delete") && !editing && !event.metaKey && !event.ctrlKey && !event.altKey) removeSelected();
					if (event.key === "0" && !editing) fitAll();
				};
				window.addEventListener("keydown", onKey);
				return () => window.removeEventListener("keydown", onKey);
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: `pure-canvas-shell${embedded ? " is-embedded" : ""}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: "topbar",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "brand-mark",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$3, {
									weight: "fill",
									size: 16
								})
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "canvas-switcher",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										className: "space-title",
										value: title,
										onChange: (event) => setTitle(event.target.value),
										"aria-label": "Space title"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										className: "switcher-trigger",
										onClick: () => setCanvasMenuOpen((open) => !open),
										"aria-label": "管理画布",
										"aria-expanded": canvasMenuOpen,
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(s$2, { size: 13 })
									}),
									canvasMenuOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "canvas-menu",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "canvas-menu-label",
												children: "CANVASES"
											}),
											canvases.map((canvas) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												className: canvas.id === activeCanvasId ? "is-active" : "",
												onClick: () => openCanvas(canvas),
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: canvas.id === activeCanvasId ? title : canvas.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: canvas.id === activeCanvasId ? items.length : canvas.items.length })]
											}, canvas.id)),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "canvas-menu-actions",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													onClick: createCanvas,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$4, { size: 14 }), "新建画布"]
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
													className: "delete-canvas",
													onClick: deleteCanvas,
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$1, { size: 14 }), "删除当前"]
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: "saved-state",
								children: "Saved locally"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "topbar-actions",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: "quiet-button undo-button",
										onClick: undo,
										disabled: undoDepth === 0,
										title: "返回上一步 (⌘/Ctrl+Z)",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(i$1, { size: 17 }), " 返回上一步"]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: "quiet-button",
										onClick: arrange,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$3, { size: 17 }), " Arrange"]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "add-menu-wrap",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: "primary-button",
											onClick: () => setAddMenuOpen((open) => !open),
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(l, { size: 17 }),
												" Add ",
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(s$2, { size: 11 })
											]
										}), addMenuOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "add-menu",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												onClick: () => {
													fileRef.current.click();
													setAddMenuOpen(false);
												},
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(l, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "上传文件" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "图片、视频、音频、TXT" })] })]
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
												onClick: () => {
													setTextDialogOpen(true);
													setAddMenuOpen(false);
												},
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$2, { size: 16 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "添加文字" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "直接写入画布" })] })]
											})]
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("main", {
						ref: stageRef,
						className: `canvas ${dropActive ? "is-drop-active" : ""}`,
						onWheel,
						onPointerDown: (event) => {
							setContextMenu(null);
							beginPan(event);
						},
						onPointerMove,
						onPointerUp: () => {
							gesture.current = null;
						},
						onPointerCancel: () => {
							gesture.current = null;
						},
						onContextMenu: (event) => {
							if (!selectedItem || event.target.closest("[data-result]")) return;
							event.preventDefault();
							setContextMenu({
								item: selectedItem,
								x: Math.min(event.clientX, window.innerWidth - 224),
								y: Math.min(event.clientY, window.innerHeight - 278)
							});
						},
						onDragEnter: (event) => {
							event.preventDefault();
							setDropActive(true);
						},
						onDragOver: (event) => {
							event.preventDefault();
							event.dataTransfer.dropEffect = "copy";
						},
						onDragLeave: (event) => {
							if (!event.currentTarget.contains(event.relatedTarget)) setDropActive(false);
						},
						onDrop,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "world",
								style: { transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` },
								children: items.map((item) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
									"data-result": true,
									className: `result-card ${selected === item.id ? "is-selected" : ""}`,
									style: {
										transform: `translate(${item.x}px, ${item.y}px)`,
										width: item.width
									},
									onPointerDown: (event) => beginDrag(event, item),
									onContextMenu: (event) => {
										event.preventDefault();
										event.stopPropagation();
										setSelected(item.id);
										setContextMenu({
											item,
											x: Math.min(event.clientX, window.innerWidth - 224),
											y: Math.min(event.clientY, window.innerHeight - 278)
										});
									},
									onDoubleClick: () => {
										const rect = stageRef.current.getBoundingClientRect();
										const scale = Math.min(1.35, rect.width * .62 / item.width);
										setView({
											scale,
											x: rect.width / 2 - (item.x + item.width / 2) * scale,
											y: rect.height / 2 - (item.y + item.width / item.aspect / 2) * scale
										});
									},
									children: [
										(item.mediaType || "image") === "image" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
											src: item.src,
											alt: item.title,
											draggable: "false"
										}),
										item.mediaType === "video" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("video", {
											src: item.src,
											controls: true,
											preload: "metadata",
											onPointerDown: (event) => event.stopPropagation()
										}),
										item.mediaType === "audio" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "audio-card",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)(m, {
													size: 30,
													weight: "duotone"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: item.title }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("audio", {
													src: item.src,
													controls: true,
													onPointerDown: (event) => event.stopPropagation()
												})
											]
										}),
										item.mediaType === "text" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "text-card",
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$2, { size: 19 }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: item.content })]
										}),
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: `kind-chip ${item.kind}`,
											children: [
												item.mediaType || "image",
												" · ",
												item.kind
											]
										}),
										selected === item.id && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "resize-handle",
											"aria-label": `Resize ${item.title}`,
											onPointerDown: (event) => beginResize(event, item)
										})
									]
								}, item.id))
							}),
							!items.length && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								className: "empty-state",
								onClick: () => setAddMenuOpen(true),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(I, { size: 26 }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "Add your first material" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "支持图片、视频、音频和文字，生成结果会自动出现。" })
								]
							}),
							dropActive && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "drop-overlay",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(l, { size: 30 }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "拖到这里添加素材" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "图片、视频、音频和 TXT" })
								]
							}),
							selectedItem && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "selection-actions",
								onPointerDown: (event) => event.stopPropagation(),
								children: [selectedItem.src && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void downloadSelected(),
									"aria-label": "下载所选内容",
									title: "下载",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(l$1, { size: 17 })
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: removeSelected,
									"aria-label": "删除所选内容",
									title: "删除",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$1, { size: 17 })
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "canvas-controls",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										onClick: () => zoomAt(view.scale / 1.18, innerWidth / 2, innerHeight / 2),
										"aria-label": "Zoom out",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(m$1, { size: 16 })
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [Math.round(view.scale * 100), "%"] }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										onClick: () => zoomAt(view.scale * 1.18, innerWidth / 2, innerHeight / 2),
										"aria-label": "Zoom in",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$4, { size: 16 })
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										onClick: fitAll,
										"aria-label": "Fit all",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(i, { size: 17 })
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										onClick: () => setView({
											x: 0,
											y: 0,
											scale: .72
										}),
										"aria-label": "Reset view",
										children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(c, { size: 17 })
									})
								]
							})
						]
					}),
					progress?.stage && progress.stage !== "idle" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
						className: `agent-progress stage-${progress.stage}`,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "progress-head",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "progress-pulse" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: progress.label || "WeShop 正在处理" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: elapsed ? `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}` : progress.updatedAt ? new Date(progress.updatedAt).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									}) : "" })
								]
							}),
							progress.summary && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: progress.summary }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "progress-track",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { style: { width: `${Math.max(3, Math.min(100, progress.percent ?? ({
									interpreting: 8,
									researching: 14,
									planning: 22,
									"prompt-ready": 32,
									generating: 58,
									publishing: 92,
									complete: 100,
									error: 100
								}[progress.stage] || 3)))}%` } })
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "progress-meta",
								children: [
									progress.model && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["模型 ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: progress.model })] }),
									progress.promptStatus && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["Prompt ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: progress.promptStatus })] }),
									progress.outputPlan && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: ["输出 ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: progress.outputPlan })] })
								]
							})
						]
					}),
					contextMenu && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "context-menu",
						style: {
							left: contextMenu.x,
							top: contextMenu.y
						},
						onPointerDown: (event) => event.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "context-heading",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: contextMenu.item.kind === "material" ? "素材" : "结果" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: contextMenu.item.title })]
							}),
							(contextMenu.item.mediaType || "image") === "image" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => queueOperation("reverse-prompt", contextMenu.item),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(s$1, { size: 17 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "反推提示词" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "分析画面并生成可复用提示词" })] })]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => queueOperation("upscale", contextMenu.item),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(m$2, { size: 17 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "高清放大" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "通过 WeShop 增强清晰度" })] })]
							})] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setLightbox(contextMenu.item);
									setContextMenu(null);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(f, { size: 17 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "查看大图" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "在画布上方预览原图" })] })]
							}),
							(contextMenu.item.mediaType || "image") === "image" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setEditDialog(contextMenu.item);
									setEditPrompt("");
									setContextMenu(null);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(a, { size: 17 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "局部编辑" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "描述需要修改的区域和内容" })] })]
							})
						]
					}),
					lightbox && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "lightbox",
						role: "dialog",
						"aria-modal": "true",
						"aria-label": `查看 ${lightbox.title}`,
						onPointerDown: () => setLightbox(null),
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								className: "modal-close",
								onClick: () => setLightbox(null),
								"aria-label": "关闭",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n, { size: 19 })
							}),
							(lightbox.mediaType || "image") === "image" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
								src: lightbox.src,
								alt: lightbox.title,
								onPointerDown: (event) => event.stopPropagation()
							}),
							lightbox.mediaType === "video" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("video", {
								className: "lightbox-video",
								src: lightbox.src,
								controls: true,
								autoPlay: true,
								onPointerDown: (event) => event.stopPropagation()
							}),
							lightbox.mediaType === "audio" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lightbox-audio",
								onPointerDown: (event) => event.stopPropagation(),
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(m, {
										size: 54,
										weight: "duotone"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: lightbox.title }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("audio", {
										src: lightbox.src,
										controls: true,
										autoPlay: true
									})
								]
							}),
							lightbox.mediaType === "text" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("article", {
								className: "lightbox-text",
								onPointerDown: (event) => event.stopPropagation(),
								children: lightbox.content
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "lightbox-caption",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: lightbox.title }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: lightbox.kind === "material" ? "素材" : "结果" })]
							})
						]
					}),
					editDialog && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "dialog-backdrop",
						role: "dialog",
						"aria-modal": "true",
						"aria-label": "局部编辑",
						onPointerDown: () => setEditDialog(null),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
							className: "edit-dialog",
							onPointerDown: (event) => event.stopPropagation(),
							onSubmit: (event) => {
								event.preventDefault();
								if (!editPrompt.trim()) return;
								queueOperation("local-edit", editDialog, editPrompt.trim());
								setEditDialog(null);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "edit-preview",
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
									src: editDialog.src,
									alt: editDialog.title
								})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "edit-copy",
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: "eyebrow",
										children: "LOCAL EDIT"
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "想修改哪里？" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "描述区域和预期效果，agent 会通过 WeShop 生成新结果，原图不会被覆盖。" }),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
										autoFocus: true,
										value: editPrompt,
										onChange: (event) => setEditPrompt(event.target.value),
										placeholder: "例如：把左上角的天空改成日落，保持人物和构图不变",
										rows: 4
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "dialog-actions",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setEditDialog(null),
											children: "取消"
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: "submit-edit",
											type: "submit",
											disabled: !editPrompt.trim(),
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(s$1, { size: 16 }), "提交编辑"]
										})]
									})
								]
							})]
						})
					}),
					textDialogOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "dialog-backdrop",
						role: "dialog",
						"aria-modal": "true",
						"aria-label": "添加文字",
						onPointerDown: () => setTextDialogOpen(false),
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("form", {
							className: "text-dialog",
							onPointerDown: (event) => event.stopPropagation(),
							onSubmit: (event) => {
								event.preventDefault();
								addTextCard();
							},
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: "TEXT MATERIAL"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", { children: "添加文字到画布" }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
									autoFocus: true,
									value: newText,
									onChange: (event) => setNewText(event.target.value),
									placeholder: "写下提示词、说明、脚本或任何需要保留的文字…",
									rows: 7
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "dialog-actions",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setTextDialogOpen(false),
										children: "取消"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
										className: "submit-edit",
										type: "submit",
										disabled: !newText.trim(),
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$2, { size: 16 }), "添加文字"]
									})]
								})
							]
						})
					}),
					toast && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "toast",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "toast-dot" }),
							toast,
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "在 DeepSeek 对话中继续即可执行" })
						]
					}),
					!embedded && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						className: "weshop-exit",
						onClick: onExit,
						title: "返回 DeepSeek Harness",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(s$2, { size: 0 }), "← Back to DSH"]
					}),
					"    ",
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*,video/*,audio/*,text/plain",
						multiple: true,
						hidden: true,
						onChange: importImages
					})
				]
			});
		}
		//#endregion
		//#region src/client/CanvasChat.jsx
		function CanvasQuestion({ wait }) {
			const questions = wait.payload.questions || [];
			const [index, setIndex] = (0, react.useState)(0);
			const [drafts, setDrafts] = (0, react.useState)(() => questions.map(() => ({
				selected: [],
				custom: "",
				skipped: false
			})));
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const question = questions[index];
			const draft = drafts[index];
			if (!question || !draft) return null;
			const update = (next) => {
				setDrafts((current) => current.map((item, itemIndex) => itemIndex === index ? next(item) : item));
				setError("");
			};
			const choose = (label) => update((current) => ({
				...current,
				selected: question.multiSelect ? current.selected.includes(label) ? current.selected.filter((item) => item !== label) : [...current.selected, label] : [label],
				custom: question.multiSelect ? current.custom : "",
				skipped: false
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
							answer: { answers: questions.map((item, itemIndex) => {
								const value = values[itemIndex];
								const custom = value.custom.trim();
								return {
									id: item.id,
									selected: value.skipped || custom && !item.multiSelect ? [] : value.selected,
									...custom ? { custom } : {}
								};
							}) }
						}
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
				else submit();
			};
			const skip = () => {
				const values = drafts.map((item, itemIndex) => itemIndex === index ? {
					selected: [],
					custom: "",
					skipped: true
				} : item);
				setDrafts(values);
				if (index < questions.length - 1) setIndex(index + 1);
				else submit(values);
			};
			const cancel = async () => {
				setBusy(true);
				try {
					const receipt = await wait.respond({
						ok: false,
						error: {
							code: "cancelled",
							message: "the user closed this question request",
							details: {}
						}
					});
					if (!receipt.accepted) throw new Error(`取消未被接受：${receipt.reason}`);
				} catch (reason) {
					setBusy(false);
					setError(reason instanceof Error ? reason.message : String(reason));
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "canvas-question",
				"aria-labelledby": `canvas-question-${question.id}`,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "canvas-question-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: question.header || "需要你的选择" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", {
							id: `canvas-question-${question.id}`,
							children: question.question
						})] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void cancel(),
							disabled: busy,
							"aria-label": "取消问题",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n, { size: 14 })
						})]
					}),
					question.detail && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "canvas-question-detail",
						children: question.detail
					}),
					(question.options || []).length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "canvas-question-options",
						children: question.options.map((option, optionIndex) => {
							const selected = draft.selected.includes(option.label);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								className: selected ? "is-selected" : "",
								onClick: () => choose(option.label),
								disabled: busy,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { children: question.multiSelect ? selected ? "✓" : "" : optionIndex + 1 }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("b", { children: option.label.replace(/\s*[（(](?:推荐|recommended)[）)]\s*$/i, "") }), option.description && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: option.description })] })]
							}, `${option.label}-${optionIndex}`);
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
						value: draft.custom,
						onChange: (event) => update((current) => ({
							...current,
							custom: event.target.value,
							selected: question.multiSelect ? current.selected : [],
							skipped: false
						})),
						placeholder: (question.options || []).length ? "或者输入自己的答案" : "输入你的答案",
						rows: 2,
						disabled: busy
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "canvas-chat-error",
						children: error
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "canvas-question-actions",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [
								index + 1,
								" / ",
								questions.length
							] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: skip,
								disabled: busy,
								children: "跳过"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "is-primary",
								onClick: continueFlow,
								disabled: busy,
								children: index < questions.length - 1 ? "下一题" : "提交"
							})
						]
					})
				]
			});
		}
		function CanvasApproval({ wait }) {
			const [busy, setBusy] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const answer = async (outcome) => {
				setBusy(true);
				setError("");
				try {
					const receipt = await wait.respond({
						ok: true,
						value: {
							sessionId: wait.sessionId,
							approvalId: wait.payload.approvalId,
							outcome
						}
					});
					if (!receipt.accepted) throw new Error(`审批未被接受：${receipt.reason}`);
				} catch (reason) {
					setBusy(false);
					setError(reason instanceof Error ? reason.message : String(reason));
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "canvas-question canvas-approval",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "canvas-question-head",
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "需要授权" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: wait.payload.reason || wait.payload.toolName || "允许执行此操作？" })] })
					}),
					wait.payload.toolName && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
						className: "canvas-question-detail",
						children: ["工具：", wait.payload.toolName]
					}),
					error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: "canvas-chat-error",
						children: error
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "canvas-question-actions",
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void answer("rejected"),
								disabled: busy,
								children: "拒绝"
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: "is-primary",
								onClick: () => void answer("allowed-once"),
								disabled: busy,
								children: "允许一次"
							})
						]
					})
				]
			});
		}
		function textFromContent(content) {
			if (!Array.isArray(content)) return "";
			return content.filter((block) => block?.type === "text").map((block) => block.text).join("\n").trim();
		}
		function chatRows(snapshot) {
			const rows = [];
			for (const key of snapshot?.chat?.order || []) {
				const node = snapshot.chat.nodes.get(key);
				if (!node || node.visibility === "hidden") continue;
				if (node.kind === "user" || node.kind === "steering") {
					const text = textFromContent(node.data?.content);
					if (text) rows.push({
						key,
						role: "user",
						text
					});
					continue;
				}
				if (node.kind === "assistant-step") {
					const blocks = Array.isArray(node.data?.blocks) ? node.data.blocks : [];
					const text = blocks.filter((block) => block?.kind === "text").map((block) => block.text).join("\n").trim();
					const tools = blocks.filter((block) => block?.kind === "tool-call").map((block) => block.name);
					if (text || tools.length > 0 || node.data?.status === "running") rows.push({
						key,
						role: "assistant",
						text,
						tools,
						running: node.data?.status === "running"
					});
				}
			}
			return rows;
		}
		function CanvasChat({ session, sessionTitle, onExit }) {
			const snapshot = (0, react.useSyncExternalStore)((listener) => session.subscribe(listener), () => session.getSnapshot(), () => session.getSnapshot());
			const rows = (0, react.useMemo)(() => chatRows(snapshot), [snapshot]);
			const pendingInteraction = snapshot?.pending?.find((item) => item.kind === "question") || snapshot?.pending?.find((item) => item.kind === "approval");
			const [draft, setDraft] = (0, react.useState)("");
			const [sending, setSending] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)("");
			const [apiConfig, setApiConfig] = (0, react.useState)(null);
			const scrollRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				fetch("/api/weshop/config").then((response) => response.ok ? response.json() : null).then(setApiConfig).catch(() => setApiConfig(null));
			}, []);
			(0, react.useEffect)(() => {
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
					const result = await session.prompt([{
						type: "text",
						text
					}], "queue");
					if (!result.ok) throw new Error(result.error?.message || "消息发送失败");
				} catch (reason) {
					setDraft(text);
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setSending(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("aside", {
				className: "canvas-chat",
				"aria-label": "WeShop conversation",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("header", {
						className: "canvas-chat-head",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "WESHOP SESSION" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: sessionTitle || "当前对话" })] }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onExit,
							"aria-label": "关闭画布",
							title: "返回 Harness",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n, { size: 17 })
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "canvas-chat-feed",
						ref: scrollRef,
						children: [
							apiConfig?.configured === false && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "canvas-api-notice",
								role: "status",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: "需要配置 WeShop API Key" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "打开 DSH 设置 → 插件 → weshop2.0，填写 API Key 后即可生成。也可以在启动 Harness 前设置 WESHOP_API_KEY。" })]
							}),
							rows.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "canvas-chat-empty",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "画布与对话已连接" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: "在这里描述你想生成或修改的内容，消息会同步到当前 Harness 会话。" })]
							}),
							rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
								className: `canvas-chat-message is-${row.role}`,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: row.role === "user" ? "你" : "WeShop" }),
									row.text && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: row.text }),
									row.tools?.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("small", { children: [
										row.running ? "正在执行" : "已调用",
										" · ",
										row.tools.join(" · ")
									] }),
									row.running && !row.text && row.tools?.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { children: "正在思考与创作…" })
								]
							}, row.key))
						]
					}),
					pendingInteraction?.kind === "question" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CanvasQuestion, { wait: pendingInteraction }, pendingInteraction.key) : pendingInteraction?.kind === "approval" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CanvasApproval, { wait: pendingInteraction }, pendingInteraction.key) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("footer", {
						className: "canvas-chat-compose",
						children: [
							error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "canvas-chat-error",
								children: error
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "canvas-chat-input",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
									value: draft,
									onChange: (event) => setDraft(event.target.value),
									onKeyDown: (event) => {
										if (event.key === "Enter" && !event.shiftKey) {
											event.preventDefault();
											send();
										}
									},
									placeholder: "继续和 WeShop 对话…",
									rows: 2,
									disabled: snapshot?.removed
								}), snapshot?.running ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: "canvas-chat-stop",
									onClick: () => void session.cancel(),
									"aria-label": "停止生成",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(s, {
										size: 14,
										weight: "fill"
									})
								}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void send(),
									disabled: !draft.trim() || sending,
									"aria-label": "发送消息",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(s$3, {
										size: 16,
										weight: "bold"
									})
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("small", { children: "Enter 发送 · Shift + Enter 换行" })
						]
					})
				]
			});
		}
		//#endregion
		//#region src/client/index.jsx
		/**
		* Result canvas panel for the weshop-canvas agent mode. Registered into
		* the root `shell.overlay` list (additive — sits beside the shipped entries),
		* as a portable slide-over after a result is published. It deliberately avoids
		* changing Harness-owned layout DOM or CSS, and avoids the `details` column: the
		* AppFrame auto-closes `details` on session switch and only renders it for
		* non-blank sessions, both of which fight a persistent canvas split.
		*/
		function SplitPanel({ onExit, initialActionCursor, session, sessionTitle }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "weshop-root weshop-split weshop-studio",
				style: {
					position: "fixed",
					inset: 0,
					zIndex: 1500,
					pointerEvents: "auto",
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("main", {
					className: "weshop-canvas-pane",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WeshopWorkspace, {
						onExit,
						embedded: true,
						initialActionCursor
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CanvasChat, {
					session,
					sessionTitle,
					onExit
				})]
			});
		}
		/** Sidebar-footer action to reopen the canvas after it was closed. */
		function WeshopOpenAction({ onOpen }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onOpen(),
				title: "Open weshop 2.0 canvas",
				"aria-label": "Open weshop 2.0 canvas",
				style: {
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: 30,
					height: 30,
					border: 0,
					borderRadius: 8,
					color: "var(--dsw-fg-2, #4a4c47)",
					background: "transparent",
					cursor: "pointer"
				},
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(n$3, {
					size: 15,
					weight: "fill"
				})
			});
		}
		/** The agent preset id whose sessions get the conversation + canvas split. */
		const WESHOP_PRESET = "weshop-canvas";
		const inject = [
			"slots",
			"sessions",
			"layout"
		];
		function apply(ctx) {
			injectWeshopStyles();
			let disposePanel = null;
			let disposeAction = null;
			let weshopActive = false;
			let panelSessionId = null;
			let actionCursor = Date.now();
			const openPanel = (initialActionCursor = Date.now()) => {
				if (disposePanel !== null) return;
				const state = ctx.sessions.list.getSnapshot();
				const sessionId = state.current;
				const binding = sessionId === void 0 ? void 0 : ctx.sessions.binding(sessionId);
				if (sessionId === void 0 || binding === void 0) return;
				panelSessionId = sessionId;
				disposePanel = ctx.slots.register({
					name: "shell.overlay",
					id: "weshop-canvas-right-panel",
					order: 10
				}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SplitPanel, {
					initialActionCursor,
					session: binding.session,
					sessionTitle: state.byId[sessionId]?.title,
					onExit: () => {
						if (disposePanel !== null) {
							disposePanel();
							disposePanel = null;
							panelSessionId = null;
						}
					}
				}));
			};
			const sync = () => {
				const state = ctx.sessions.list.getSnapshot();
				const current = state.current === void 0 ? void 0 : state.byId[state.current];
				const weshop = current !== void 0 && current.agentPreset === WESHOP_PRESET;
				const sessionChanged = panelSessionId !== null && panelSessionId !== state.current;
				const reopenForSession = sessionChanged && disposePanel !== null;
				weshopActive = weshop;
				if (sessionChanged && disposePanel !== null) {
					disposePanel();
					disposePanel = null;
					panelSessionId = null;
				}
				if (weshop) {
					if (disposeAction === null) disposeAction = ctx.slots.register({
						name: "sidebar.footer.action",
						id: "weshop-canvas-open",
						order: 10
					}, () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WeshopOpenAction, { onOpen: openPanel }));
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
					for (const action of actions) actionCursor = Math.max(actionCursor, Number(action.sequence) || 0);
					const publishedResults = actions.filter((action) => action.type === "add-asset" && action.payload?.kind === "result");
					if (weshopActive && publishedResults.length > 0) openPanel(Math.min(...publishedResults.map((action) => Number(action.sequence))) - 1);
				} catch {}
			};
			const actionTimer = window.setInterval(watchPublishedResults, 800);
			return () => {
				unsubscribe();
				window.clearInterval(actionTimer);
				if (disposePanel !== null) disposePanel();
				if (disposeAction !== null) disposeAction();
			};
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map