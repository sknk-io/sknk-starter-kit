import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contractsDir = path.join(rootDir, "apps", "contracts");
const foundryConfig = path.join(contractsDir, "foundry.toml");

const separatorIndex = process.argv.indexOf("--");
const command = separatorIndex === -1 ? [] : process.argv.slice(separatorIndex + 1);

if (command.length === 0) {
  console.error("No command provided. Usage: node scripts/with-contracts.mjs -- <command> [args...]");
  process.exit(1);
}

if (!fs.existsSync(foundryConfig)) {
  console.error("apps/contracts has not been initialized. Run `yarn init:contracts` first.");
  process.exit(1);
}

const result = spawnSync(command[0], command.slice(1), {
  cwd: contractsDir,
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
