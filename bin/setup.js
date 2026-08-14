#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const packageName = "weshop-dsh-plugin";
const legacyPackages = ["@weshop/dsh-weshop-2-0", "@weshopai/dsh-weshop-2-0"];
const command = process.argv[2] || "setup";

if (["-h", "--help", "help"].includes(command)) {
  console.log(`WeShop for DeepSeek Harness\n\nUsage:\n  npx ${packageName} setup\n\nStart Harness once before setup, then restart it when setup completes.`);
  process.exit(0);
}

if (command !== "setup") {
  console.error(`Unknown command: ${command}`);
  process.exit(1);
}

const dshHome = process.env.DSH_HOME || join(homedir(), ".dsh");
const profileDirectory = join(dshHome, "profiles", "web");
const manifestPath = join(profileDirectory, "package.json");
if (!existsSync(manifestPath)) {
  console.error("Harness Web profile not found. Start Harness once first: npx @deepseek-ai/dsh web");
  process.exit(1);
}

try {
  JSON.parse(readFileSync(manifestPath, "utf8"));
} catch {
  console.error(`Cannot read Harness profile manifest: ${manifestPath}`);
  process.exit(1);
}

const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const install = spawnSync(pnpm, ["add", `${packageName}@latest`], { cwd: profileDirectory, stdio: "inherit" });
if (install.error || install.status !== 0) {
  console.error("Could not install the plugin. Ensure pnpm is available, then run the command again.");
  process.exit(install.status || 1);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
} catch {
  console.error(`Cannot read Harness profile manifest after installation: ${manifestPath}`);
  process.exit(1);
}

const bundles = manifest.dsh?.profile?.bundles;
if (!Array.isArray(bundles)) {
  console.error("Harness profile has no dsh.profile.bundles array. No configuration was changed.");
  process.exit(1);
}
manifest.dsh.profile.bundles = [...bundles.filter((bundle) => !legacyPackages.includes(bundle) && bundle !== packageName), packageName];
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const installedLegacy = legacyPackages.filter((name) => manifest.dependencies?.[name]);
if (installedLegacy.length) {
  spawnSync(pnpm, ["remove", ...installedLegacy], { cwd: profileDirectory, stdio: "inherit" });
}

console.log("\nWeShop for DeepSeek Harness is ready. Restart Harness to use the plugin.");
