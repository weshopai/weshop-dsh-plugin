import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
//#region node_modules/.pnpm/@deepseek-ai+cosmokit@1.8.2/node_modules/@deepseek-ai/cosmokit/lib/index.js
/** Return true when a value is `null` or `undefined`. */
function isNullable(value) {
	return value === null || value === void 0;
}
/** Return true for non-array object values. */
function isPlainObject(data) {
	return data && typeof data === "object" && !Array.isArray(data);
}
/** Filter object entries and return a new object. */
function filterKeys(object, filter) {
	return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
}
/** Map object values while preserving the original key set. */
function mapValues(object, transform) {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
}
/** Pick selected keys from an object, optionally including `undefined` values. */
function pick(source, keys, forced) {
	if (!keys) return { ...source };
	const result = {};
	for (const key of keys) if (forced || source[key] !== void 0) result[key] = source[key];
	return result;
}
/** Test values using `instanceof` with a `toStringTag` fallback. */
function is(type, value) {
	if (arguments.length === 1) return (value) => is(type, value);
	return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
}
function isArrayBufferLike(value) {
	return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
}
function isArrayBufferSource(value) {
	return isArrayBufferLike(value) || ArrayBuffer.isView(value);
}
/** Binary source detection and base64/hex conversion helpers. */
var Binary;
(function(Binary) {
	Binary.is = isArrayBufferLike;
	Binary.isSource = isArrayBufferSource;
	function fromSource(source) {
		if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
		else return source;
	}
	Binary.fromSource = fromSource;
	function toBase64(source) {
		source = fromSource(source);
		if (typeof Buffer !== "undefined") return Buffer.from(source).toString("base64");
		let binary = "";
		const bytes = new Uint8Array(source);
		for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
		return btoa(binary);
	}
	Binary.toBase64 = toBase64;
	function fromBase64(source) {
		if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "base64"));
		return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
	}
	Binary.fromBase64 = fromBase64;
	function toHex(source) {
		source = fromSource(source);
		if (typeof Buffer !== "undefined") return Buffer.from(source).toString("hex");
		return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
	}
	Binary.toHex = toHex;
	function fromHex(source) {
		if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "hex"));
		const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
		const buffer = [];
		for (let i = 0; i < hex.length; i += 2) buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
		return Uint8Array.from(buffer).buffer;
	}
	Binary.fromHex = fromHex;
})(Binary || (Binary = {}));
Binary.fromBase64;
Binary.toBase64;
Binary.fromHex;
Binary.toHex;
/** Deep-clone common JavaScript values while preserving prototypes and cycles. */
function clone(source, refs = /* @__PURE__ */ new Map()) {
	if (!source || typeof source !== "object") return source;
	if (is("Date", source)) return new Date(source.valueOf());
	if (is("RegExp", source)) return new RegExp(source.source, source.flags);
	if (isArrayBufferLike(source)) return source.slice(0);
	if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
	const cached = refs.get(source);
	if (cached) return cached;
	if (Array.isArray(source)) {
		const result = [];
		refs.set(source, result);
		source.forEach((value, index) => {
			result[index] = Reflect.apply(clone, null, [value, refs]);
		});
		return result;
	}
	const result = Object.create(Object.getPrototypeOf(source));
	refs.set(source, result);
	for (const key of Reflect.ownKeys(source)) {
		const descriptor = { ...Reflect.getOwnPropertyDescriptor(source, key) };
		if ("value" in descriptor) descriptor.value = Reflect.apply(clone, null, [descriptor.value, refs]);
		Reflect.defineProperty(result, key, descriptor);
	}
	return result;
}
/** Deeply compare arrays, dates, regexps, buffers, and plain object fields. */
function deepEqual(a, b, strict) {
	if (a === b) return true;
	if (!strict && isNullable(a) && isNullable(b)) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a !== "object") return false;
	if (!a || !b) return false;
	function check(test, then) {
		return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
	}
	return check(Array.isArray, (a, b) => a.length === b.length && a.every((item, index) => deepEqual(item, b[index]))) ?? check(is("Date"), (a, b) => a.valueOf() === b.valueOf()) ?? check(is("RegExp"), (a, b) => a.source === b.source && a.flags === b.flags) ?? check(isArrayBufferLike, (a, b) => {
		if (a.byteLength !== b.byteLength) return false;
		const viewA = new Uint8Array(a);
		const viewB = new Uint8Array(b);
		for (let i = 0; i < viewA.length; i++) if (viewA[i] !== viewB[i]) return false;
		return true;
	}) ?? Object.keys({
		...a,
		...b
	}).every((key) => deepEqual(a[key], b[key], strict));
}
/** Time constants plus parsing and formatting helpers. */
var Time;
(function(Time) {
	Time.millisecond = 1;
	Time.second = 1e3;
	Time.minute = Time.second * 60;
	Time.hour = Time.minute * 60;
	Time.day = Time.hour * 24;
	Time.week = Time.day * 7;
	let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
	function setTimezoneOffset(offset) {
		timezoneOffset = offset;
	}
	Time.setTimezoneOffset = setTimezoneOffset;
	function getTimezoneOffset() {
		return timezoneOffset;
	}
	Time.getTimezoneOffset = getTimezoneOffset;
	function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
		if (typeof date === "number") date = new Date(date);
		if (offset === void 0) offset = timezoneOffset;
		return Math.floor((date.valueOf() / Time.minute - offset) / 1440);
	}
	Time.getDateNumber = getDateNumber;
	function fromDateNumber(value, offset) {
		const date = new Date(value * Time.day);
		if (offset === void 0) offset = timezoneOffset;
		return new Date(+date + offset * Time.minute);
	}
	Time.fromDateNumber = fromDateNumber;
	const numeric = /\d+(?:\.\d+)?/.source;
	const timeRegExp = new RegExp(`^${[
		"w(?:eek(?:s)?)?",
		"d(?:ay(?:s)?)?",
		"h(?:our(?:s)?)?",
		"m(?:in(?:ute)?(?:s)?)?",
		"s(?:ec(?:ond)?(?:s)?)?"
	].map((unit) => `(${numeric}${unit})?`).join("")}$`);
	function parseTime(source) {
		const capture = timeRegExp.exec(source);
		if (!capture) return 0;
		return (parseFloat(capture[1]) * Time.week || 0) + (parseFloat(capture[2]) * Time.day || 0) + (parseFloat(capture[3]) * Time.hour || 0) + (parseFloat(capture[4]) * Time.minute || 0) + (parseFloat(capture[5]) * Time.second || 0);
	}
	Time.parseTime = parseTime;
	function parseDate(date) {
		const parsed = parseTime(date);
		if (parsed) date = Date.now() + parsed;
		else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
		else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
		return date ? new Date(date) : /* @__PURE__ */ new Date();
	}
	Time.parseDate = parseDate;
	function format(ms) {
		const abs = Math.abs(ms);
		if (abs >= Time.day - Time.hour / 2) return Math.round(ms / Time.day) + "d";
		else if (abs >= Time.hour - Time.minute / 2) return Math.round(ms / Time.hour) + "h";
		else if (abs >= Time.minute - Time.second / 2) return Math.round(ms / Time.minute) + "m";
		else if (abs >= Time.second) return Math.round(ms / Time.second) + "s";
		return ms + "ms";
	}
	Time.format = format;
	function toDigits(source, length = 2) {
		return source.toString().padStart(length, "0");
	}
	Time.toDigits = toDigits;
	function template(template, time = /* @__PURE__ */ new Date()) {
		return template.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
	}
	Time.template = template;
})(Time || (Time = {}));
//#endregion
//#region node_modules/.pnpm/@deepseek-ai+schemastery@3.18.1/node_modules/@deepseek-ai/schemastery/lib/index.mjs
const kSchema = Symbol.for("schemastery");
const kValidationError = Symbol.for("ValidationError");
globalThis.__schemastery_index__ ??= 0;
globalThis.__schemastery_refs__ = void 0;
var ValidationError = class extends TypeError {
	options;
	name = "ValidationError";
	constructor(message, options) {
		let prefix = "$";
		for (const segment of options.path || []) if (typeof segment === "string") prefix += "." + segment;
		else if (typeof segment === "number") prefix += "[" + segment + "]";
		else if (typeof segment === "symbol") prefix += `[Symbol(${segment.toString()})]`;
		if (prefix.startsWith(".")) prefix = prefix.slice(1);
		super((prefix === "$" ? "" : `${prefix} `) + message);
		this.options = options;
	}
	static is(error) {
		return !!error?.[kValidationError];
	}
};
Object.defineProperty(ValidationError.prototype, kValidationError, { value: true });
const Schema = function(options) {
	const schema = function(data, options = {}) {
		return Schema.resolve(data, schema, options)[0];
	};
	if (options.refs) {
		const refs = mapValues(options.refs, (options) => new Schema(options));
		const getRef = (uid) => refs[uid];
		for (const key in refs) {
			const options = refs[key];
			options.sKey = getRef(options.sKey);
			options.inner = getRef(options.inner);
			options.list = options.list && options.list.map(getRef);
			options.dict = options.dict && mapValues(options.dict, getRef);
		}
		return refs[options.uid];
	}
	Object.assign(schema, options);
	if (typeof schema.callback === "string") try {
		schema.callback = new Function("return " + schema.callback)();
	} catch {}
	Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
	Object.setPrototypeOf(schema, Schema.prototype);
	schema.meta ||= {};
	schema.toString = schema.toString.bind(schema);
	return schema;
};
Schema.prototype = Object.create(Function.prototype);
Schema.prototype[kSchema] = true;
Object.defineProperty(Schema.prototype, "~standard", { get() {
	return {
		version: 1,
		vendor: "schemastery",
		validate: (value) => {
			try {
				return { value: Schema.resolve(value, this, {})[0] };
			} catch (error) {
				if (ValidationError.is(error)) return { issues: [{
					message: error.message,
					path: error.options.path
				}] };
				throw error;
			}
		}
	};
} });
Schema.ValidationError = ValidationError;
Schema.prototype.toJSON = function toJSON() {
	if (globalThis.__schemastery_refs__) {
		globalThis.__schemastery_refs__[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
		return this.uid;
	}
	globalThis.__schemastery_refs__ = { [this.uid]: { ...this } };
	globalThis.__schemastery_refs__[this.uid] = JSON.parse(JSON.stringify({ ...this }));
	const result = {
		uid: this.uid,
		refs: globalThis.__schemastery_refs__
	};
	globalThis.__schemastery_refs__ = void 0;
	return result;
};
Schema.prototype.set = function set(key, value) {
	this.dict[key] = value;
	return this;
};
Schema.prototype.push = function push(value) {
	this.list.push(value);
	return this;
};
function mergeDesc(original, messages) {
	const result = typeof original === "string" ? { "": original } : { ...original };
	for (const locale in messages) {
		const value = messages[locale];
		if (value?.$description || value?.$desc) result[locale] = value.$description || value.$desc;
		else if (typeof value === "string") result[locale] = value;
	}
	return result;
}
function getInner(value) {
	return value?.$value ?? value?.$inner;
}
function extractKeys(data) {
	return filterKeys(data ?? {}, (key) => !key.startsWith("$"));
}
Schema.prototype.i18n = function i18n(messages) {
	const schema = Schema(this);
	const desc = mergeDesc(schema.meta.description, messages);
	if (Object.keys(desc).length) schema.meta.description = desc;
	if (schema.dict) schema.dict = mapValues(schema.dict, (inner, key) => {
		return inner.i18n(mapValues(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
	});
	if (schema.list) schema.list = schema.list.map((inner, index) => {
		return inner.i18n(mapValues(messages, (data = {}) => {
			if (Array.isArray(getInner(data))) return getInner(data)[index];
			if (Array.isArray(data)) return data[index];
			return extractKeys(data);
		}));
	});
	if (schema.inner) schema.inner = schema.inner.i18n(mapValues(messages, (data) => {
		if (getInner(data)) return getInner(data);
		return extractKeys(data);
	}));
	if (schema.sKey) schema.sKey = schema.sKey.i18n(mapValues(messages, (data) => data?.$key));
	return schema;
};
Schema.prototype.extra = function extra(key, value) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		[key]: value
	};
	return schema;
};
for (const key of [
	"required",
	"disabled",
	"collapse",
	"hidden",
	"loose"
]) Object.assign(Schema.prototype, { [key](value = true) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		[key]: value
	};
	return schema;
} });
Schema.prototype.deprecated = function deprecated() {
	const schema = Schema(this);
	schema.meta.badges ||= [];
	schema.meta.badges.push({
		text: "deprecated",
		type: "danger"
	});
	return schema;
};
Schema.prototype.experimental = function experimental() {
	const schema = Schema(this);
	schema.meta.badges ||= [];
	schema.meta.badges.push({
		text: "experimental",
		type: "warning"
	});
	return schema;
};
Schema.prototype.pattern = function pattern(regexp) {
	const schema = Schema(this);
	const pattern = pick(regexp, ["source", "flags"]);
	schema.meta = {
		...schema.meta,
		pattern
	};
	return schema;
};
Schema.prototype.simplify = function simplify(value) {
	if (deepEqual(value, this.meta.default, this.type === "dict")) return null;
	if (isNullable(value)) return value;
	if (this.type === "object" || this.type === "dict") {
		const result = {};
		for (const key in value) {
			const item = (this.type === "object" ? this.dict[key] : this.inner)?.simplify(value[key]);
			if (this.type === "dict" || !isNullable(item)) result[key] = item;
		}
		if (deepEqual(result, this.meta.default, this.type === "dict")) return null;
		return result;
	} else if (this.type === "array" || this.type === "tuple") {
		const result = [];
		value.forEach((value, index) => {
			const schema = this.type === "array" ? this.inner : this.list[index];
			const item = schema ? schema.simplify(value) : value;
			result.push(item);
		});
		return result;
	} else if (this.type === "intersect") {
		const result = {};
		for (const item of this.list) Object.assign(result, item.simplify(value));
		return result;
	} else if (this.type === "union") for (const schema of this.list) try {
		Schema.resolve(value, schema, {});
		return schema.simplify(value);
	} catch {}
	return value;
};
Schema.prototype.toString = function toString(inline) {
	return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
};
Schema.prototype.role = function role(role, extra) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		role,
		extra
	};
	return schema;
};
for (const key of [
	"default",
	"link",
	"comment",
	"description",
	"max",
	"min",
	"step"
]) Object.assign(Schema.prototype, { [key](value) {
	const schema = Schema(this);
	schema.meta = {
		...schema.meta,
		[key]: value
	};
	return schema;
} });
const resolvers = {};
Schema.extend = function extend(type, resolve) {
	resolvers[type] = resolve;
};
Schema.resolve = function resolve(data, schema, options = {}, strict = false) {
	if (!schema) return [data];
	if (options.ignore?.(data, schema)) return [data];
	if (isNullable(data) && schema.type !== "lazy") {
		if (schema.meta.required) throw new ValidationError(`missing required value`, options);
		let current = schema;
		let fallback = schema.meta.default;
		while (current?.type === "intersect" && isNullable(fallback)) {
			current = current.list[0];
			fallback = current?.meta.default;
		}
		if (isNullable(fallback)) return [data];
		data = clone(fallback);
	}
	const callback = resolvers[schema.type];
	if (!callback) throw new ValidationError(`unsupported type "${schema.type}"`, options);
	try {
		return callback(data, schema, options, strict);
	} catch (error) {
		if (!schema.meta.loose) throw error;
		return [schema.meta.default];
	}
};
Schema.from = function from(source) {
	if (isNullable(source)) return Schema.any();
	else if ([
		"string",
		"number",
		"boolean"
	].includes(typeof source)) return Schema.const(source).required();
	else if (source[kSchema]) return source;
	else if (typeof source === "function") switch (source) {
		case String: return Schema.string().required();
		case Number: return Schema.number().required();
		case Boolean: return Schema.boolean().required();
		case Function: return Schema.function().required();
		default: return Schema.is(source).required();
	}
	else throw new TypeError(`cannot infer schema from ${source}`);
};
Schema.lazy = function lazy(builder) {
	const toJSON = () => {
		if (!schema.inner[kSchema]) {
			schema.inner = schema.builder();
			schema.inner.meta = {
				...schema.meta,
				...schema.inner.meta
			};
		}
		return schema.inner.toJSON();
	};
	const schema = new Schema({
		type: "lazy",
		builder,
		inner: { toJSON }
	});
	return schema;
};
Schema.natural = function natural() {
	return Schema.number().step(1).min(0);
};
Schema.percent = function percent() {
	return Schema.number().step(.01).min(0).max(1).role("slider");
};
Schema.date = function date() {
	return Schema.union([Schema.is(Date), Schema.transform(Schema.string().role("datetime"), (value, options) => {
		const date = new Date(value);
		if (isNaN(+date)) throw new ValidationError(`invalid date "${value}"`, options);
		return date;
	}, true)]);
};
Schema.regExp = function regExp(flag = "") {
	return Schema.union([Schema.is(RegExp), Schema.transform(Schema.string().role("regexp", { flag }), (value, options) => {
		try {
			return new RegExp(value, flag);
		} catch (e) {
			throw new ValidationError(e.message, options);
		}
	}, true)]);
};
Schema.arrayBuffer = function arrayBuffer(encoding) {
	return Schema.union([
		Schema.is(ArrayBuffer),
		Schema.is(SharedArrayBuffer),
		Schema.transform(Schema.any(), (value, options) => {
			if (Binary.isSource(value)) return Binary.fromSource(value);
			throw new ValidationError(`expected ArrayBufferSource but got ${value}`, options);
		}, true),
		...encoding ? [Schema.transform(Schema.string(), (value, options) => {
			try {
				return encoding === "base64" ? Binary.fromBase64(value) : Binary.fromHex(value);
			} catch (e) {
				throw new ValidationError(e.message, options);
			}
		}, true)] : []
	]);
};
Schema.extend("lazy", (data, schema, options, strict) => {
	if (!schema.inner[kSchema]) {
		schema.inner = schema.builder();
		schema.inner.meta = {
			...schema.meta,
			...schema.inner.meta
		};
	}
	return Schema.resolve(data, schema.inner, options, strict);
});
Schema.extend("any", (data) => {
	return [data];
});
Schema.extend("never", (data, _, options) => {
	throw new ValidationError(`expected nullable but got ${data}`, options);
});
Schema.extend("const", (data, { value }, options) => {
	if (deepEqual(data, value)) return [value];
	throw new ValidationError(`expected ${value} but got ${data}`, options);
});
function checkWithinRange(data, meta, description, options, skipMin = false) {
	const { max = Infinity, min = -Infinity } = meta;
	if (data > max) throw new ValidationError(`expected ${description} <= ${max} but got ${data}`, options);
	if (data < min && !skipMin) throw new ValidationError(`expected ${description} >= ${min} but got ${data}`, options);
}
Schema.extend("string", (data, { meta }, options) => {
	if (typeof data !== "string") throw new ValidationError(`expected string but got ${data}`, options);
	if (meta.pattern) {
		const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
		if (!regexp.test(data)) throw new ValidationError(`expect string to match regexp ${regexp}`, options);
	}
	checkWithinRange(data.length, meta, "string length", options);
	return [data];
});
function decimalShift(data, digits) {
	const str = data.toString();
	if (str.includes("e")) return data * Math.pow(10, digits);
	const index = str.indexOf(".");
	if (index === -1) return data * Math.pow(10, digits);
	const frac = str.slice(index + 1);
	const integer = str.slice(0, index);
	if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
	return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
}
function isMultipleOf(data, min, step) {
	step = Math.abs(step);
	if (!/^\d+\.\d+$/.test(step.toString())) return (data - min) % step === 0;
	const index = step.toString().indexOf(".");
	const digits = step.toString().slice(index + 1).length;
	return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
}
Schema.extend("number", (data, { meta }, options) => {
	if (typeof data !== "number") throw new ValidationError(`expected number but got ${data}`, options);
	checkWithinRange(data, meta, "number", options);
	const { step } = meta;
	if (step && !isMultipleOf(data, meta.min ?? 0, step)) throw new ValidationError(`expected number multiple of ${step} but got ${data}`, options);
	return [data];
});
Schema.extend("boolean", (data, _, options) => {
	if (typeof data === "boolean") return [data];
	throw new ValidationError(`expected boolean but got ${data}`, options);
});
Schema.extend("bitset", (data, { bits, meta }, options) => {
	let value = 0, keys = [];
	if (typeof data === "number") {
		value = data;
		for (const key in bits) if (data & bits[key]) keys.push(key);
	} else if (Array.isArray(data)) {
		keys = data;
		for (const key of keys) {
			if (typeof key !== "string") throw new ValidationError(`expected string but got ${key}`, options);
			if (key in bits) value |= bits[key];
		}
	} else throw new ValidationError(`expected number or array but got ${data}`, options);
	if (value === meta.default) return [value];
	return [value, keys];
});
Schema.extend("function", (data, _, options) => {
	if (typeof data === "function") return [data];
	throw new ValidationError(`expected function but got ${data}`, options);
});
Schema.extend("is", (data, { constructor }, options) => {
	if (typeof constructor === "function") {
		if (data instanceof constructor) return [data];
		throw new ValidationError(`expected ${constructor.name} but got ${data}`, options);
	} else {
		if (isNullable(data)) throw new ValidationError(`expected ${constructor} but got ${data}`, options);
		let prototype = Object.getPrototypeOf(data);
		while (prototype) {
			if (prototype.constructor?.name === constructor) return [data];
			prototype = Object.getPrototypeOf(prototype);
		}
		throw new ValidationError(`expected ${constructor} but got ${data}`, options);
	}
});
function property(data, key, schema, options) {
	try {
		const [value, adapted] = Schema.resolve(data[key], schema, {
			...options,
			path: [...options.path || [], key]
		});
		if (adapted !== void 0) data[key] = adapted;
		return value;
	} catch (e) {
		if (!options?.autofix) throw e;
		delete data[key];
		return schema.meta.default;
	}
}
Schema.extend("array", (data, { inner, meta }, options) => {
	if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
	checkWithinRange(data.length, meta, "array length", options, !isNullable(inner.meta.default));
	return [data.map((_, index) => property(data, index, inner, options))];
});
Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
	if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
	const result = {};
	for (const key in data) {
		let rKey;
		try {
			rKey = Schema.resolve(key, sKey, options)[0];
		} catch (error) {
			if (strict) continue;
			throw error;
		}
		result[rKey] = property(data, key, inner, options);
		data[rKey] = data[key];
		if (key !== rKey) delete data[key];
	}
	return [result];
});
Schema.extend("tuple", (data, { list }, options, strict) => {
	if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
	const result = list.map((inner, index) => property(data, index, inner, options));
	if (strict) return [result];
	result.push(...data.slice(list.length));
	return [result];
});
function merge(result, data) {
	for (const key in data) {
		if (key in result) continue;
		result[key] = data[key];
	}
}
Schema.extend("object", (data, { dict }, options, strict) => {
	if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
	const result = {};
	for (const key in dict) {
		const value = property(data, key, dict[key], options);
		if (!isNullable(value) || key in data) result[key] = value;
	}
	if (!strict) merge(result, data);
	return [result];
});
Schema.extend("union", (data, { list, toString }, options, strict) => {
	const messages = [];
	for (const inner of list) try {
		return Schema.resolve(data, inner, options, strict);
	} catch (error) {
		messages.push(error);
	}
	throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
});
Schema.extend("intersect", (data, { list, toString }, options, strict) => {
	if (!list.length) return [data];
	let result;
	for (const inner of list) {
		const value = Schema.resolve(data, inner, options, true)[0];
		if (isNullable(value)) continue;
		if (isNullable(result)) result = value;
		else if (typeof result !== typeof value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
		else if (typeof value === "object") merge(result ??= {}, value);
		else if (result !== value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
	}
	if (!strict && isPlainObject(data)) merge(result, data);
	return [result];
});
Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
	const [result, adapted = data] = Schema.resolve(data, inner, options, true);
	if (preserve) return [callback(result)];
	else return [callback(result), callback(adapted)];
});
const formatters = {};
function defineMethod(name, keys, format) {
	formatters[name] = format;
	Object.assign(Schema, { [name](...args) {
		const schema = new Schema({ type: name });
		keys.forEach((key, index) => {
			switch (key) {
				case "sKey":
					schema.sKey = args[index] ?? Schema.string();
					break;
				case "inner":
					schema.inner = Schema.from(args[index]);
					break;
				case "list":
					schema.list = args[index].map(Schema.from);
					break;
				case "dict":
					schema.dict = mapValues(args[index], Schema.from);
					break;
				case "bits":
					schema.bits = {};
					for (const key in args[index]) {
						if (typeof args[index][key] !== "number") continue;
						schema.bits[key] = args[index][key];
					}
					break;
				case "callback": {
					const callback = schema.callback = args[index];
					callback["toJSON"] ||= () => callback.toString();
					break;
				}
				case "constructor": {
					const constructor = schema.constructor = args[index];
					if (typeof constructor === "function") constructor["toJSON"] ||= () => constructor["name"];
					break;
				}
				default: schema[key] = args[index];
			}
		});
		if (name === "object" || name === "dict") schema.meta.default = {};
		else if (name === "array" || name === "tuple") schema.meta.default = [];
		else if (name === "bitset") schema.meta.default = 0;
		return schema;
	} });
}
defineMethod("is", ["constructor"], ({ constructor }) => {
	if (typeof constructor === "function") return constructor.name;
	else return constructor;
});
defineMethod("any", [], () => "any");
defineMethod("never", [], () => "never");
defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
defineMethod("string", [], () => "string");
defineMethod("number", [], () => "number");
defineMethod("boolean", [], () => "boolean");
defineMethod("bitset", ["bits"], () => "bitset");
defineMethod("function", [], () => "function");
defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
defineMethod("object", ["dict"], ({ dict }) => {
	if (Object.keys(dict).length === 0) return "{}";
	return `{ ${Object.entries(dict).map(([key, inner]) => {
		return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
	}).join(", ")} }`;
});
defineMethod("union", ["list"], ({ list }, inline) => {
	const result = list.map(({ toString: format }) => format()).join(" | ");
	return inline ? `(${result})` : result;
});
defineMethod("intersect", ["list"], ({ list }) => {
	return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
});
defineMethod("transform", [
	"inner",
	"callback",
	"preserve"
], ({ inner }, isInner) => inner.toString(isInner));
//#endregion
//#region src/native-tools.js
/**
* Native DeepSeek Harness tools for the WeShop canvas and OpenAPI.
*
* The tools register directly on ctx.tools. No MCP process or JSON-RPC bridge
* is involved, and Cordis disposal unregisters every tool automatically.
*
* Environment:
*   WESHOP_STATE_FILE / WESHOP_ACTIONS_FILE / WESHOP_REQUESTS_FILE /
*   WESHOP_COMPLETIONS_FILE / WESHOP_PROGRESS_FILE / WESHOP_ASSET_DIR
*   WESHOP_API_KEY / WESHOP_BASE_URL / WESHOP_POLL_INTERVAL_MS / WESHOP_POLL_MAX_MS
*/
const stateFile$1 = process.env.WESHOP_STATE_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-state.json");
const actionFile$1 = process.env.WESHOP_ACTIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-actions.jsonl");
const requestFile$1 = process.env.WESHOP_REQUESTS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-requests.jsonl");
const completionFile = process.env.WESHOP_COMPLETIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-request-completions.jsonl");
const progressFile$1 = process.env.WESHOP_PROGRESS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-progress.json");
const WESHOP_BASE_URL = process.env.WESHOP_BASE_URL || "https://openapi.weshop.ai/openapi";
let configuredApiKey = "";
function setConfiguredApiKey(apiKey) {
	configuredApiKey = typeof apiKey === "string" ? apiKey.trim() : "";
}
const WESHOP_POLL_INTERVAL_MS = Number(process.env.WESHOP_POLL_INTERVAL_MS || 3e3);
const WESHOP_POLL_MAX_MS = Number(process.env.WESHOP_POLL_MAX_MS || 6e5);
/** Unified WeShop error envelope; throws with the API message. */
function weshopError(status, body) {
	const error = body?.error || {};
	return new Error(`WeShop API ${status} ${error.code || ""}: ${error.message || JSON.stringify(body).slice(0, 300)}`.trim());
}
async function weshopRequest(pathname, { method = "GET", jsonBody, form } = {}) {
	const apiKey = configuredApiKey || process.env.WESHOP_API_KEY || "";
	if (!apiKey) throw new Error("WeShop API Key is not configured. Open Settings → Plugins → weshop2.0, or set WESHOP_API_KEY before starting Harness.");
	const headers = { Authorization: apiKey };
	let body;
	if (form) body = form;
	else if (jsonBody !== void 0) {
		headers["content-type"] = "application/json";
		body = JSON.stringify(jsonBody);
	}
	const response = await fetch(`${WESHOP_BASE_URL}${pathname}`, {
		method,
		headers,
		body
	});
	const text = await response.text();
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		parsed = {};
	}
	if (!response.ok || parsed.success === false) throw weshopError(response.status, parsed);
	return parsed;
}
/** Upload a local image file; returns a reusable public URL. */
async function weshopUpload(localPath) {
	const { readFile } = await import("node:fs/promises");
	const bytes = await readFile(localPath);
	const type = {
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".webp": "image/webp",
		".gif": "image/gif"
	}[path.extname(localPath).toLowerCase()] || "application/octet-stream";
	const form = new FormData();
	form.append("image", new Blob([bytes], { type }), path.basename(localPath));
	return (await weshopRequest("/agent/assets/images", {
		method: "POST",
		form
	}))?.data?.image;
}
/** Poll one run until a terminal status or the time budget runs out. */
async function weshopPollRun(executionId) {
	const deadline = Date.now() + WESHOP_POLL_MAX_MS;
	for (;;) {
		const data = await weshopRequest(`/agent/runs/${encodeURIComponent(executionId)}`);
		const status = (data?.data?.executions?.at(-1))?.status;
		if (status === "Success" || status === "Failed") return data;
		if (Date.now() + WESHOP_POLL_INTERVAL_MS > deadline) throw new Error(`WeShop run ${executionId} did not finish within ${WESHOP_POLL_MAX_MS}ms (last status: ${status || "unknown"})`);
		await new Promise((resolve) => setTimeout(resolve, WESHOP_POLL_INTERVAL_MS));
	}
}
async function resolveImageReference(value) {
	return /^https?:\/\//.test(value) ? value : weshopUpload(value);
}
/** Create a WeShop run. Local image references are uploaded automatically. */
async function weshopCreateRun(input) {
	const agent = {
		name: input.agent,
		version: input.version || "v1.0"
	};
	const runInput = { ...input.taskName ? { taskName: input.taskName } : {} };
	const params = { ...input.params || {} };
	if (input.originalImage) {
		const url = await resolveImageReference(input.originalImage);
		runInput.originalImage = url;
		params.originalImage = url;
	}
	if (input.referenceImages?.length) {
		const images = await Promise.all(input.referenceImages.map(resolveImageReference));
		runInput.images = images;
		params.images = images;
	}
	return weshopRequest("/agent/runs", {
		method: "POST",
		jsonBody: {
			agent,
			input: runInput,
			params
		}
	});
}
function readState$1() {
	if (!fs.existsSync(stateFile$1)) return {
		version: 1,
		connected: false,
		title: "Untitled space",
		items: [],
		selectedItemIds: [],
		selectedItems: [],
		selectedItemId: null,
		selectedItem: null
	};
	try {
		return {
			connected: true,
			...JSON.parse(fs.readFileSync(stateFile$1, "utf8"))
		};
	} catch {
		return {
			version: 1,
			connected: false,
			error: "Canvas state is unavailable",
			items: [],
			selectedItemIds: [],
			selectedItems: [],
			selectedItemId: null,
			selectedItem: null
		};
	}
}
function writeProgress(progress) {
	let previous = {};
	try {
		if (fs.existsSync(progressFile$1)) previous = JSON.parse(fs.readFileSync(progressFile$1, "utf8"));
	} catch {}
	const value = {
		...progress,
		...progress.startedAt ? {} : previous.startedAt ? { startedAt: previous.startedAt } : {},
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	fs.writeFileSync(progressFile$1, JSON.stringify(value, null, 2));
	return value;
}
function readRequests() {
	if (!fs.existsSync(requestFile$1)) return [];
	const completed = /* @__PURE__ */ new Set();
	if (fs.existsSync(completionFile)) for (const line of fs.readFileSync(completionFile, "utf8").split("\n")) try {
		if (line.trim()) completed.add(JSON.parse(line).requestId);
	} catch {}
	return fs.readFileSync(requestFile$1, "utf8").split("\n").flatMap((line) => {
		try {
			const request = JSON.parse(line);
			return completed.has(request.id) ? [] : [request];
		} catch {
			return [];
		}
	});
}
const toolSchemas = [
	{
		name: "weshop_canvas_get_state",
		description: "Read the complete weshop 2.0 canvas, including every material and result, provenance, position, size, viewport, counts, canvases, and the full multi-selection in selectedItemIds/selectedItems.",
		inputSchema: {
			type: "object",
			properties: {},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_get_selection",
		description: "Read every item currently selected on the weshop 2.0 canvas. Use selectedItemIds/selectedItems for multi-selection; selectedItemId/selectedItem remain as the primary selection for compatibility.",
		inputSchema: {
			type: "object",
			properties: {},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_add_image",
		description: "Low-level canvas image insertion. For every generated, edited, transformed, or upscaled output, use weshop_canvas_publish_result instead.",
		inputSchema: {
			type: "object",
			required: [
				"kind",
				"title",
				"provenance"
			],
			properties: {
				kind: {
					type: "string",
					enum: ["material", "result"]
				},
				title: { type: "string" },
				localPath: {
					type: "string",
					description: "Absolute path to a local image file."
				},
				url: {
					type: "string",
					description: "HTTPS image URL. Prefer this for remote/generated results so the canvas can display it directly."
				},
				width: {
					type: "number",
					minimum: 120,
					maximum: 1200
				},
				provenance: {
					type: "object",
					description: "How the image was created, including method, prompt, sources, agent, executionId, and model when available.",
					additionalProperties: true
				}
			},
			anyOf: [{ required: ["localPath"] }, { required: ["url"] }],
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_publish_result",
		description: "MANDATORY final step for every successful WeShop generation, edit, transformation, or upscale. Publish returned HTTPS URLs directly; do not download remote results first. Automatically inserts the output into the live canvas as kind=result.",
		inputSchema: {
			type: "object",
			required: ["title", "provenance"],
			properties: {
				title: { type: "string" },
				localPath: {
					type: "string",
					description: "Absolute path only for a genuinely local-only generated image."
				},
				url: {
					type: "string",
					description: "Returned HTTPS image URL. Preferred for WeShop generation results."
				},
				width: {
					type: "number",
					minimum: 120,
					maximum: 1200
				},
				provenance: {
					type: "object",
					description: "Complete generation lineage including agent, executionId, prompt/task, and source item IDs.",
					additionalProperties: true
				}
			},
			anyOf: [{ required: ["localPath"] }, { required: ["url"] }],
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_publish_asset",
		description: "Publish any generated result to the live canvas. Prefer returned HTTPS URLs without downloading them first. Supports image, video, audio, and text; mandatory for non-image outputs.",
		inputSchema: {
			type: "object",
			required: [
				"mediaType",
				"title",
				"provenance"
			],
			properties: {
				mediaType: {
					type: "string",
					enum: [
						"image",
						"video",
						"audio",
						"text"
					]
				},
				title: { type: "string" },
				localPath: { type: "string" },
				url: { type: "string" },
				content: {
					type: "string",
					description: "Inline content, required for text when no file or URL is used."
				},
				width: {
					type: "number",
					minimum: 120,
					maximum: 1200
				},
				provenance: {
					type: "object",
					additionalProperties: true
				}
			},
			anyOf: [
				{ required: ["localPath"] },
				{ required: ["url"] },
				{ required: ["content"] }
			],
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_report_progress",
		description: "Report concise, user-visible execution progress to the canvas. Use at meaningful transitions: intent understood, model selected, prompt ready, generating, publishing, complete, or error. Report decisions and status, never hidden chain-of-thought.",
		inputSchema: {
			type: "object",
			required: ["stage", "label"],
			properties: {
				stage: {
					type: "string",
					enum: [
						"interpreting",
						"researching",
						"planning",
						"prompt-ready",
						"generating",
						"publishing",
						"complete",
						"error",
						"idle"
					]
				},
				label: { type: "string" },
				summary: {
					type: "string",
					description: "Short user-facing interpretation or status, not private reasoning."
				},
				model: { type: "string" },
				promptStatus: { type: "string" },
				outputPlan: {
					type: "string",
					description: "For example: 4 independent images × 1 pose."
				},
				percent: {
					type: "number",
					minimum: 0,
					maximum: 100
				},
				startedAt: {
					type: "string",
					description: "ISO timestamp for elapsed-time display. Preserve the same value across one task."
				}
			},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_get_requests",
		description: "Read pending image operations submitted from the canvas context menu. For upscale and local-edit, use the weshop-openapi skill, publish with weshop_canvas_publish_result, then complete the request. For reverse-prompt, analyze the selected image and return the inferred prompt before completing it.",
		inputSchema: {
			type: "object",
			properties: {},
			additionalProperties: false
		}
	},
	{
		name: "weshop_canvas_complete_request",
		description: "Mark a canvas context-menu request complete after its result has been handled. Include a concise summary or the inferred prompt.",
		inputSchema: {
			type: "object",
			required: ["requestId", "summary"],
			properties: {
				requestId: { type: "string" },
				summary: { type: "string" },
				resultItemId: { type: "string" }
			},
			additionalProperties: false
		}
	},
	{
		name: "weshop_generate_run",
		description: "Run a WeShop OpenAPI generation/editing task. MANDATORY: invoke the weshop-openapi Skill during the current user turn before calling this tool, even if it was invoked earlier in the conversation. The API key is handled server-side; never echo it. Use originalImage for legacy single-source agents; use referenceImages for agents such as gpt-image that accept params.images. Local paths upload automatically. After success, publish every output to the canvas.",
		inputSchema: {
			type: "object",
			required: ["agent", "params"],
			properties: {
				agent: {
					type: "string",
					description: "Agent name, e.g. aimodel, aiproduct, aipose, expandimage, removeBG, virtualtryon, seedream, gpt-image, midjourney, kling."
				},
				version: {
					type: "string",
					description: "Agent version; default v1.0."
				},
				originalImage: {
					type: "string",
					description: "Local absolute path (auto-uploaded) or https URL of the source image."
				},
				referenceImages: {
					type: "array",
					description: "Local absolute paths or HTTPS URLs for agents whose API uses input.images/params.images (for example gpt-image, up to 5). Local files upload automatically.",
					items: { type: "string" }
				},
				taskName: {
					type: "string",
					description: "Optional human-readable task label."
				},
				params: {
					type: "object",
					description: "Agent-specific run parameters (maskType, generatedContent, textDescription, batchCount, ...). See the weshop-openapi skill.",
					additionalProperties: true
				},
				wait: {
					type: "boolean",
					description: "Poll to completion and return final result URLs (default true). Set false to return the executionId immediately."
				}
			},
			additionalProperties: false
		}
	},
	{
		name: "weshop_get_run",
		description: "Poll one WeShop run by executionId and return its current or terminal status and result URLs.",
		inputSchema: {
			type: "object",
			required: ["executionId"],
			properties: { executionId: { type: "string" } },
			additionalProperties: false
		}
	}
];
async function executeTool(name, input) {
	const state = readState$1();
	if (name === "weshop_canvas_get_state") return state;
	if (name === "weshop_canvas_get_selection") return {
		connected: state.connected,
		selectedItemIds: state.selectedItemIds || (state.selectedItemId ? [state.selectedItemId] : []),
		selectedItems: state.selectedItems || (state.selectedItem ? [state.selectedItem] : []),
		selectedItemId: state.selectedItemId || null,
		selectedItem: state.selectedItem || null
	};
	if (name === "weshop_canvas_report_progress") return {
		ok: true,
		progress: writeProgress(input)
	};
	if (name === "weshop_canvas_get_requests") return {
		connected: state.connected,
		requests: readRequests()
	};
	if (name === "weshop_canvas_complete_request") {
		if (!readRequests().some((request) => request.id === input.requestId)) throw new Error("Unknown or completed request");
		const completion = {
			requestId: input.requestId,
			summary: input.summary,
			...input.resultItemId ? { resultItemId: input.resultItemId } : {},
			completedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		fs.appendFileSync(completionFile, `${JSON.stringify(completion)}\n`);
		return {
			ok: true,
			...completion
		};
	}
	if ([
		"weshop_canvas_add_image",
		"weshop_canvas_publish_result",
		"weshop_canvas_publish_asset"
	].includes(name)) {
		if (!input.localPath && !input.url && !input.content) throw new Error("localPath, url, or content is required");
		const publishingResult = name !== "weshop_canvas_add_image";
		const action = {
			sequence: Date.now(),
			type: "add-asset",
			payload: {
				id: `${publishingResult ? "result" : input.kind || "result"}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
				kind: publishingResult ? "result" : input.kind || "result",
				mediaType: input.mediaType || "image",
				title: input.title || "Untitled result",
				...input.localPath ? { localPath: input.localPath } : {},
				...input.url ? { url: input.url } : {},
				...input.content ? { content: input.content } : {},
				width: input.width || 460,
				provenance: input.provenance || { method: "agent-generation" },
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		};
		fs.appendFileSync(actionFile$1, `${JSON.stringify(action)}\n`);
		if (publishingResult) writeProgress({
			stage: "complete",
			label: "结果已放入画布",
			summary: input.title || "生成结果已发布",
			model: input.provenance?.agent || input.provenance?.model || "",
			promptStatus: "完成",
			outputPlan: input.provenance?.outputPlan || "",
			percent: 100
		});
		return {
			ok: true,
			queued: true,
			itemId: action.payload.id,
			kind: action.payload.kind
		};
	}
	if (name === "weshop_generate_run") {
		if (!input.agent || !input.params) throw new Error("agent and params are required");
		const executionId = (await weshopCreateRun(input))?.meta?.executionId;
		if (!executionId) throw new Error("WeShop did not return an executionId");
		if (input.wait === false) return {
			ok: true,
			executionId,
			started: true
		};
		return {
			ok: true,
			executionId,
			done: await weshopPollRun(executionId)
		};
	}
	if (name === "weshop_get_run") {
		const executionId = input.executionId;
		if (!executionId) throw new Error("executionId is required");
		return {
			ok: true,
			executionId,
			data: await weshopRequest(`/agent/runs/${encodeURIComponent(executionId)}`)
		};
	}
	throw new Error(`Unknown tool: ${name}`);
}
const output = {
	schema: {},
	render: (_args, value) => [{
		type: "text",
		text: JSON.stringify(value, null, 2)
	}]
};
/** Register every WeShop tool directly on the Cordis tool registry. */
function registerNativeTools(ctx, options = {}) {
	setConfiguredApiKey(options.apiKey);
	for (const schema of toolSchemas) ctx.tools.register({
		name: schema.name,
		description: schema.description,
		parameters: schema.inputSchema,
		output,
		execute: (args) => executeTool(schema.name, args || {})
	});
}
//#endregion
//#region src/index.js
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
*   GET  /api/weshop/actions?after=N  read tool-queued actions (add-asset), copying local assets
*   POST /api/weshop/requests         queue a context-menu request (reverse-prompt/upscale/local-edit)
*   GET  /api/weshop/progress         read the agent progress record
*   POST /api/weshop/assets           upload media (image/video/audio) -> {url, localPath}
*   GET  /api/weshop/assets/<id>      serve an uploaded asset
*   GET  /api/weshop/demo/<file>      serve built-in demo assets
*
* Loaded from a cordis patch row: { name: '<abs path>/server/canvas-host.mjs' }
*/
const name = "weshop2.0";
const inject = [
	"webServer",
	"tools",
	"skills"
];
const Config = Schema.object({ apiKey: Schema.string().role("secret") });
const stateFile = process.env.WESHOP_STATE_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-state.json");
const actionFile = process.env.WESHOP_ACTIONS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-actions.jsonl");
const requestFile = process.env.WESHOP_REQUESTS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-requests.jsonl");
const progressFile = process.env.WESHOP_PROGRESS_FILE || path.join(os.tmpdir(), "weshop-2-0-canvas-progress.json");
const assetDirectory = process.env.WESHOP_ASSET_DIR || path.join(os.tmpdir(), "weshop-2-0-assets");
const demoDirectory = process.env.WESHOP_DEMO_DIR || path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../assets");
const skillDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../skills");
const bundledPresetDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../presets/weshop-canvas");
const dshHome = process.env.DSH_HOME || path.join(os.homedir(), ".dsh");
const privateConfigDirectory = path.join(dshHome, "weshop-2-0");
const apiKeyFile = path.join(privateConfigDirectory, "api-key");
fs.mkdirSync(assetDirectory, { recursive: true });
const bundledSkills = [
	{
		name: "open-weshop-2-0",
		description: "Open, launch, show, or display the embedded WeShop 2.0 canvas workspace."
	},
	{
		name: "inspect-weshop-canvas",
		description: "Read and operate the current WeShop canvas, including generation, editing, publishing, and context-menu requests."
	},
	{
		name: "weshop-openapi",
		description: "Use WeShop OpenAPI for commercial image and video generation, editing, and transformation tasks."
	}
];
function skillBody(name) {
	return fs.readFileSync(path.join(skillDirectory, name, "SKILL.md"), "utf8").replace(/^---\n[\s\S]*?\n---\n/, "");
}
function registerBundledSkills(ctx) {
	for (const skill of bundledSkills) ctx.skills.register({
		...skill,
		invocation: {
			modelInvocable: true,
			userInvocable: true
		},
		provider: "weshop2.0",
		source: "bundled",
		resourceBase: {
			kind: "directory",
			path: path.join(skillDirectory, skill.name)
		},
		content: skillBody(skill.name)
	});
}
function installBundledPreset() {
	const bundledCompositionPath = path.join(bundledPresetDirectory, "agent.cordis.yml");
	const bundledMetadataPath = path.join(bundledPresetDirectory, "preset.yml");
	if (!fs.existsSync(bundledCompositionPath) || !fs.existsSync(bundledMetadataPath)) return;
	const dshHome = process.env.DSH_HOME || path.join(os.homedir(), ".dsh");
	const presetDirectory = path.join(dshHome, ".agent-presets", "weshop-canvas");
	const compositionPath = path.join(presetDirectory, "agent.cordis.yml");
	if (!fs.existsSync(presetDirectory)) {
		fs.mkdirSync(path.dirname(presetDirectory), { recursive: true });
		fs.cpSync(bundledPresetDirectory, presetDirectory, { recursive: true });
		return;
	}
	if (!(fs.existsSync(compositionPath) ? fs.readFileSync(compositionPath, "utf8") : "").includes("mcp__weshop-canvas__")) return;
	const backupPath = `${compositionPath}.legacy-mcp.bak`;
	if (!fs.existsSync(backupPath)) fs.copyFileSync(compositionPath, backupPath);
	fs.copyFileSync(bundledCompositionPath, compositionPath);
	fs.copyFileSync(bundledMetadataPath, path.join(presetDirectory, "preset.yml"));
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
	".txt": "text/plain; charset=utf-8"
};
function readJsonBody(request, limit = 5e6) {
	return new Promise((resolve, reject) => {
		let body = "";
		request.on("data", (chunk) => {
			body += chunk;
			if (body.length > limit) reject(/* @__PURE__ */ new Error("Request body too large"));
		});
		request.on("end", () => {
			try {
				resolve(body ? JSON.parse(body) : {});
			} catch (error) {
				reject(error);
			}
		});
		request.on("error", reject);
	});
}
function json(response, status, value) {
	response.writeHead(status, {
		"content-type": "application/json; charset=utf-8",
		"cache-control": "no-store"
	});
	response.end(JSON.stringify(value));
}
function readState() {
	if (!fs.existsSync(stateFile)) return {
		version: 3,
		title: "Untitled space",
		items: [],
		selectedItemIds: [],
		selectedItems: [],
		selectedItemId: null
	};
	try {
		return JSON.parse(fs.readFileSync(stateFile, "utf8"));
	} catch {
		return {
			version: 3,
			title: "Untitled space",
			items: [],
			selectedItemIds: [],
			selectedItems: [],
			selectedItemId: null
		};
	}
}
function apply(ctx, config = {}) {
	installBundledPreset();
	registerBundledSkills(ctx);
	let canvasApiKey = "";
	try {
		if (fs.existsSync(apiKeyFile)) canvasApiKey = fs.readFileSync(apiKeyFile, "utf8").trim();
	} catch {}
	registerNativeTools(ctx, { apiKey: canvasApiKey || config.apiKey });
	ctx.effect(() => ctx.webServer.register({
		kind: "prefix",
		path: "/api/weshop",
		handler: async (request, response) => {
			const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
			if (pathname === "/api/weshop/config" && request.method === "GET") {
				json(response, 200, {
					configured: Boolean(canvasApiKey || config.apiKey || process.env.WESHOP_API_KEY),
					source: canvasApiKey ? "canvas" : config.apiKey ? "plugin" : process.env.WESHOP_API_KEY ? "environment" : null
				});
				return;
			}
			if (pathname === "/api/weshop/config" && request.method === "POST") {
				try {
					const body = await readJsonBody(request, 1e4);
					const nextKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
					if (nextKey.length > 4096) throw new Error("API key is too long");
					if (nextKey) {
						fs.mkdirSync(privateConfigDirectory, {
							recursive: true,
							mode: 448
						});
						fs.writeFileSync(apiKeyFile, nextKey, {
							encoding: "utf8",
							mode: 384
						});
						fs.chmodSync(apiKeyFile, 384);
						canvasApiKey = nextKey;
					} else {
						if (fs.existsSync(apiKeyFile)) fs.unlinkSync(apiKeyFile);
						canvasApiKey = "";
					}
					setConfiguredApiKey(canvasApiKey || config.apiKey);
					json(response, 200, {
						ok: true,
						configured: Boolean(canvasApiKey || config.apiKey || process.env.WESHOP_API_KEY),
						source: canvasApiKey ? "canvas" : config.apiKey ? "plugin" : process.env.WESHOP_API_KEY ? "environment" : null
					});
				} catch {
					json(response, 400, {
						ok: false,
						error: "invalid API key configuration"
					});
				}
				return;
			}
			if (pathname === "/api/weshop/state" && request.method === "GET") {
				json(response, 200, readState());
				return;
			}
			if (pathname === "/api/weshop/state" && request.method === "POST") {
				try {
					const state = await readJsonBody(request);
					fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
					json(response, 200, { ok: true });
				} catch {
					json(response, 400, {
						ok: false,
						error: "invalid canvas state"
					});
				}
				return;
			}
			if (pathname === "/api/weshop/actions" && request.method === "GET") {
				const after = Number(new URL(request.url ?? "/", "http://127.0.0.1").searchParams.get("after") || 0);
				const actions = [];
				if (fs.existsSync(actionFile)) for (const line of fs.readFileSync(actionFile, "utf8").split("\n")) {
					if (!line.trim()) continue;
					try {
						const action = JSON.parse(line);
						if (action.sequence <= after) continue;
						if (action.type === "add-asset" && action.payload?.localPath && fs.existsSync(action.payload.localPath)) {
							const extension = path.extname(action.payload.localPath).toLowerCase();
							if ([
								".png",
								".jpg",
								".jpeg",
								".webp",
								".gif",
								".mp4",
								".mov",
								".webm",
								".mp3",
								".wav",
								".m4a",
								".ogg",
								".txt"
							].includes(extension)) {
								const id = `${action.sequence}-${Math.random().toString(36).slice(2, 8)}${extension}`;
								const destination = path.join(assetDirectory, id);
								fs.copyFileSync(action.payload.localPath, destination);
								action.payload.url = `/api/weshop/assets/${id}`;
								action.payload.localPath = destination;
							}
						}
						actions.push(action);
					} catch {}
				}
				json(response, 200, { actions });
				return;
			}
			if (pathname === "/api/weshop/requests" && request.method === "POST") {
				try {
					const body = await readJsonBody(request);
					const item = readState().items?.find((candidate) => candidate.id === body.itemId);
					if (!item || ![
						"reverse-prompt",
						"upscale",
						"local-edit"
					].includes(body.type)) throw new Error("invalid request");
					const canvasRequest = {
						id: `request-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
						sequence: Date.now(),
						status: "pending",
						type: body.type,
						prompt: String(body.prompt || ""),
						item,
						createdAt: (/* @__PURE__ */ new Date()).toISOString()
					};
					fs.appendFileSync(requestFile, `${JSON.stringify(canvasRequest)}\n`);
					json(response, 201, {
						ok: true,
						request: canvasRequest
					});
				} catch {
					json(response, 400, {
						ok: false,
						error: "invalid canvas request"
					});
				}
				return;
			}
			if (pathname === "/api/weshop/progress" && request.method === "GET") {
				response.writeHead(200, {
					"content-type": "application/json; charset=utf-8",
					"cache-control": "no-store"
				});
				response.end(fs.existsSync(progressFile) ? fs.readFileSync(progressFile) : "{\"stage\":\"idle\"}");
				return;
			}
			if (pathname === "/api/weshop/assets" && request.method === "POST") {
				try {
					const { name = "asset", type = "application/octet-stream", dataUrl = "" } = await readJsonBody(request, 14e7);
					const encoded = String(dataUrl).split(",", 2)[1];
					if (!encoded || !/^(image|video|audio)\//.test(String(type))) throw new Error("invalid asset");
					const extension = {
						"image/jpeg": ".jpg",
						"image/png": ".png",
						"image/webp": ".webp",
						"image/gif": ".gif",
						"video/mp4": ".mp4",
						"video/quicktime": ".mov",
						"video/webm": ".webm",
						"audio/mpeg": ".mp3",
						"audio/wav": ".wav",
						"audio/mp4": ".m4a",
						"audio/ogg": ".ogg"
					}[type] || ".bin";
					const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${extension}`;
					const localPath = path.join(assetDirectory, id);
					fs.writeFileSync(localPath, Buffer.from(encoded, "base64"));
					json(response, 201, {
						url: `/api/weshop/assets/${id}`,
						localPath,
						originalName: name
					});
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
					"cache-control": "private, max-age=31536000, immutable"
				});
				fs.createReadStream(localPath).pipe(response);
				return;
			}
			if (pathname.startsWith("/api/weshop/demo/") && request.method === "GET") {
				const id = path.basename(pathname);
				const localPath = path.join(demoDirectory, id);
				if (!fs.existsSync(localPath) || !localPath.startsWith(`${demoDirectory}${path.sep}`)) {
					response.writeHead(404).end();
					return;
				}
				response.writeHead(200, {
					"content-type": contentTypes[path.extname(localPath)] || "application/octet-stream",
					"cache-control": "public, max-age=31536000, immutable"
				});
				fs.createReadStream(localPath).pipe(response);
				return;
			}
			response.writeHead(404, { "content-type": "application/json; charset=utf-8" });
			response.end(JSON.stringify({ error: "not found" }));
		}
	}), "weshop-canvas-host: /api/weshop routes");
}
//#endregion
export { Config, apply, inject, name };
