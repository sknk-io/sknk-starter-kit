import fs from "node:fs";
import path from "node:path";
import { SkillFlow } from "../game/SkillFlow";

export function GameAppShell() {
  const rootDir = process.cwd();
  const contractsConfig = path.join(rootDir, "apps", "contracts", "foundry.toml");
  const requiredSkills = [
    ".agents/skills/sknk-game-specification/SKILL.md",
    ".agents/skills/sknk-contract-creation/SKILL.md",
    ".agents/skills/sknk-frontend-builder/SKILL.md",
  ];
  const hasSkills = requiredSkills.every((relativePath) => fs.existsSync(path.join(rootDir, relativePath)));
  const hasContracts = fs.existsSync(contractsConfig);

  return (
    <main className="workspace">
      <div className="workspace__frame">
        <header className="toolbar">
          <div>
            <h1>Starter workspace</h1>
            <p>Use this page to complete the bootstrap before you ask the skills to build the game.</p>
          </div>
          <div className="toolbar__meta">apps/web</div>
        </header>

        <section className="section">
          <h2>Start</h2>
          <p>Complete these steps in order. Once the skills are installed and the contracts workspace is initialized, the repo is ready for the normal SKNK workflow.</p>
          <div className="command-list">
            <div className="command-list__row">
              <div className="command-list__label">Install skills</div>
              <code>npx skills add sknk-io/builder-skills</code>
            </div>
            <div className="command-list__row">
              <div className="command-list__label">Initialize contracts</div>
              <code>yarn init:contracts</code>
            </div>
            <div className="command-list__row">
              <div className="command-list__label">Install contract deps</div>
              <code>yarn contracts:install</code>
            </div>
            <div className="command-list__row">
              <div className="command-list__label">Run verification</div>
              <code>yarn verify</code>
            </div>
          </div>
        </section>

        <section className="section-grid">
          <SkillFlow />

          <section className="section">
            <h2>Checklist</h2>
            <ul className="checklist">
              <li>
                <span className="checklist__marker" aria-hidden="true">
                  {hasSkills ? "Yes" : "No"}
                </span>
                <div>
                  <div className="checklist__title">Skills installed at project level</div>
                  {hasSkills ? (
                    <p>All three SKNK builder skills are available under <code>.agents/skills</code>.</p>
                  ) : (
                    <p>Run <code>npx skills add sknk-io/builder-skills</code> so the three SKNK skills are available in <code>.agents</code>.</p>
                  )}
                </div>
              </li>
              <li>
                <span className="checklist__marker" aria-hidden="true">
                  {hasContracts ? "Yes" : "No"}
                </span>
                <div>
                  <div className="checklist__title">Contracts workspace initialized</div>
                  {hasContracts ? (
                    <p><code>apps/contracts</code> contains the initialized Foundry workspace.</p>
                  ) : (
                    <p>Run <code>yarn init:contracts</code> so <code>apps/contracts</code> is populated with the template contract repo.</p>
                  )}
                </div>
              </li>
            </ul>
          </section>
        </section>
      </div>
    </main>
  );
}
