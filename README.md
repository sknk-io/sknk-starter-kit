<p align="center">
  <img
    src="https://github.com/user-attachments/assets/5e020b3c-6d4e-4a1c-a15d-1d627afcdb0f"
    alt="sknk-logo"
    width="200"
  />
</p>
<br />

# SKNK Starter Kit

`sknk-starter-kit` is a skills-first monorepo for building games on SKNK.

The repo gives developers and agents a predictable workspace shape:

- `apps/contracts` as the contracts placeholder and bootstrap target
- `apps/web` for the web shell and game frontend

The actual game creation workflow is driven by the external `builder-skills` package, not by hard-coded repo opinions.

## Workflow

Install the SKNK builder skills into your agent environment:

```sh
npx skills add sknk-io/builder-skills
```

Then drive development in this order:

1. `sknk-game-specification`
2. `sknk-contract-creation`
3. `sknk-frontend-creation`

That split is intentional:

- `sknk-game-specification` shapes the concept and checks SKNK fit
- `sknk-contract-creation` updates `apps/contracts` and emits handoff artifacts
- `sknk-frontend-creation` refines `apps/web` from those contract outputs

## Repo Layout

```text
apps/
  contracts/   Placeholder until `yarn init:contracts` initializes it
  web/         Minimal Next.js shell for frontend refinement
game-overview.md
AGENTS.md
```

## Quick Start

### Prerequisites

- Node.js 20+
- Yarn
- Foundry

### 1. Install JavaScript dependencies

```sh
yarn install
```

### 2. Install Solidity dependencies

```sh
yarn init:contracts
yarn contracts:install
```

`apps/contracts` exists in the repo before initialization, but it is not a real Foundry workspace until `yarn init:contracts` writes `foundry.toml`, `src/`, `test/`, and the rest of the imported baseline into place.

### 3. Run contract checks

```sh
yarn contracts:test
yarn contracts:fmt
```

### 4. Run the web shell

```sh
cp apps/web/.env.example apps/web/.env.local
yarn dev:web
```

### 5. Start building with skills

Use the starter repo as the target workspace and let the installed skills evolve it in order:

1. shape the game with `sknk-game-specification`
2. implement or reshape the contract in `apps/contracts` with `sknk-contract-creation`
3. refine the frontend in `apps/web` with `sknk-frontend-creation`

Example prompts:

```text
Use sknk-game-specification to turn this idea into a SKNK-buildable game brief:
<describe the game loop, win condition, player actions, and any randomness or session flow>
```

```text
Use sknk-contract-creation to implement the reviewed game brief in apps/contracts.
Preserve the starter-kit paths and refresh game-overview.md plus the frontend handoff files.
```

```text
Use sknk-frontend-creation to build the apps/web experience from game-overview.md,
apps/contracts/frontend-handoff/, and the latest apps/contracts/out artifacts.
```

After bootstrapping, `apps/contracts` is a normal local workspace. Commit it in your own project once it has been initialized and modified.

## Contract-to-Frontend Handoff

The downstream skills rely on these repo paths:

- `game-overview.md`
- `apps/contracts/frontend-handoff/`
- `apps/contracts/out/...`

`sknk-contract-creation` is expected to refresh `game-overview.md` and emit machine-readable handoff JSON after contract validation succeeds.

### Optional companion skills

The `sknk-frontend-creation` skill uses PixiJS for scene-first game visuals. For stronger Pixi-specific implementation guidance, also install the official PixiJS skills:

```bash
npx skills add https://github.com/pixijs/pixijs-skills
```

## Notes

- `builder-skills` is intentionally not vendored into this repo.
- `apps/contracts` starts as a placeholder and is initialized from a pinned `sknk-foundry-example` ref via `yarn init:contracts`.
- `apps/web` is intentionally minimal so the frontend skill can refine it in place.
