import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type WorkspaceStatus = {
  hasSkills: boolean;
  hasContracts: boolean;
  hasContractDependencies: boolean;
};

const REQUIRED_SKILLS = [
  ".agents/skills/sknk-game-specification/SKILL.md",
  ".agents/skills/sknk-contract-creation/SKILL.md",
  ".agents/skills/sknk-frontend-builder/SKILL.md",
];

export const getWorkspaceStatus = cache((): WorkspaceStatus => {
  const rootDir = findRepoRoot(process.cwd());
  const contractsDir = path.join(rootDir, "apps", "contracts");
  const contractsConfig = path.join(contractsDir, "foundry.toml");
  const contractsDependencies = path.join(contractsDir, "dependencies");

  const hasSkills = REQUIRED_SKILLS.every((relativePath) =>
    fs.existsSync(path.join(rootDir, relativePath)),
  );
  const hasContracts = fs.existsSync(contractsConfig);
  const hasContractDependencies =
    fs.existsSync(contractsDependencies) &&
    fs.statSync(contractsDependencies).isDirectory() &&
    fs.readdirSync(contractsDependencies).length > 0;

  return {
    hasSkills,
    hasContracts,
    hasContractDependencies,
  };
});

function findRepoRoot(startDir: string) {
  let currentDir = startDir;
  const maxParentHops = 3;

  for (let hop = 0; hop <= maxParentHops; hop += 1) {
    const hasAgentsDir = fs.existsSync(path.join(currentDir, ".agents"));
    const hasSkillsLock = fs.existsSync(path.join(currentDir, "skills-lock.json"));

    if (hasAgentsDir || hasSkillsLock) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return startDir;
    }

    currentDir = parentDir;
  }

  return startDir;
}
