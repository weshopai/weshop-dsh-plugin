const PLUGIN_ID = "@weshop/dsh-weshop-2-0";

const nodeConfig = {
  name: `${PLUGIN_ID}/node`,
  entry: { index: "src/index.js" },
  outDir: "lib",
  format: "esm",
  platform: "node",
  target: "es2022",
  clean: false,
  dts: false,
  sourcemap: false,
  outputOptions: { entryFileNames: "index.js" },
};

const clientConfig = {
  name: `${PLUGIN_ID}/client`,
  entry: { client: "src/client/index.jsx" },
  outDir: "lib",
  format: "cjs",
  platform: "browser",
  target: "es2022",
  clean: false,
  dts: false,
  sourcemap: true,
  external: ["react", "react/jsx-runtime"],
  noExternal: () => true,
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  jsx: { runtime: "automatic" },
  outputOptions: {
    entryFileNames: "client.js",
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(PLUGIN_ID)}, factory: (require) => {`,
    footer: "return module.exports; } });",
    intro: "var module = { exports: {} }; var exports = module.exports;",
  },
};

export default [nodeConfig, clientConfig];
