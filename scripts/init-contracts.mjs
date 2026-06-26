import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configPath = path.join(rootDir, "config", "contracts-bootstrap.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const args = new Set(process.argv.slice(2));
const force = args.has("--force");

if (args.size > (force ? 1 : 0)) {
  console.error("Unsupported arguments. Use `yarn init:contracts` or `yarn init:contracts --force`.");
  process.exit(1);
}

const repoUrl = process.env.SKNK_CONTRACTS_BOOTSTRAP_REPO ?? config.repoUrl;
const ref = process.env.SKNK_CONTRACTS_BOOTSTRAP_REF ?? config.ref;
const targetDir = path.join(rootDir, "apps", "contracts");
const foundryConfig = path.join(targetDir, "foundry.toml");
let tempRoot;

try {
  if (fs.existsSync(foundryConfig) && !force) {
    throw new Error("apps/contracts is already initialized. Re-run with `yarn init:contracts --force` to replace it.");
  }

  if (isUnexpectedPlaceholderState(targetDir) && !force) {
    throw new Error("apps/contracts contains unexpected files. Clean it up or re-run with `yarn init:contracts --force`.");
  }

  tempRoot = fs.mkdtempSync(path.join(rootDir, ".tmp-contracts-"));
  const cloneDir = path.join(tempRoot, "upstream");
  const stagedDir = path.join(tempRoot, "contracts");
  const placeholderDir = path.join(tempRoot, "placeholder");

  run("git", ["clone", "--no-checkout", repoUrl, cloneDir], rootDir);
  run("git", ["-C", cloneDir, "checkout", ref], rootDir);

  fs.mkdirSync(stagedDir, { recursive: true });
  fs.mkdirSync(placeholderDir, { recursive: true });

  for (const entry of fs.readdirSync(cloneDir)) {
    if (config.stripPaths.includes(entry)) {
      continue;
    }

    fs.cpSync(path.join(cloneDir, entry), path.join(stagedDir, entry), {
      recursive: true,
      force: true,
    });
  }

  preservePlaceholderFiles(targetDir, placeholderDir);
  fs.cpSync(placeholderDir, stagedDir, { recursive: true, force: true });

  validateStagedContracts(stagedDir);

  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  fs.renameSync(stagedDir, targetDir);

  console.log(`Initialized apps/contracts from ${repoUrl} @ ${ref}`);
  console.log("Commit the generated workspace once it is part of your project.");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  if (tempRoot) {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function isNonEmptyDirectory(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory() && fs.readdirSync(dirPath).length > 0;
}

function isUnexpectedPlaceholderState(dirPath) {
  if (!isNonEmptyDirectory(dirPath)) {
    return false;
  }

  const allowed = new Set(["frontend-handoff", ...config.placeholderFiles]);
  const actual = collectRelativeFiles(dirPath);

  for (const item of actual) {
    if (!allowed.has(item)) {
      return true;
    }
  }

  return false;
}

function preservePlaceholderFiles(sourceDir, destinationDir) {
  for (const relativePath of config.placeholderFiles) {
    const sourcePath = path.join(sourceDir, relativePath);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Missing placeholder file: ${relativePath}`);
    }

    const destinationPath = path.join(destinationDir, relativePath);
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    fs.copyFileSync(sourcePath, destinationPath);
  }
}

function validateStagedContracts(dirPath) {
  const requiredFiles = ["foundry.toml"];
  const requiredDirs = ["src", "test"];
  const missing = [];

  for (const relativePath of requiredFiles) {
    const fullPath = path.join(dirPath, relativePath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
      missing.push(relativePath);
    }
  }

  for (const relativePath of requiredDirs) {
    const fullPath = path.join(dirPath, relativePath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
      missing.push(`${relativePath}/`);
    }
  }

  if (missing.length > 0) {
    throw new Error(`Bootstrapped contracts workspace is incomplete. Missing: ${missing.join(", ")}`);
  }
}

function collectRelativeFiles(dirPath) {
  const collected = [];
  walk(dirPath, "");
  return collected;

  function walk(currentPath, relativePath) {
    for (const entry of fs.readdirSync(currentPath, { withFileTypes: true })) {
      const nextRelative = relativePath ? path.posix.join(relativePath, entry.name) : entry.name;
      const nextPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        collected.push(nextRelative);
        walk(nextPath, nextRelative);
      } else {
        collected.push(nextRelative);
      }
    }
  }
}

function run(command, commandArgs, cwd) {
  const result = spawnSync(command, commandArgs, {
    cwd,
    stdio: "inherit",
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} exited with status ${result.status ?? 1}`);
  }
}
