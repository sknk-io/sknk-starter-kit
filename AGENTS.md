# AGENTS.md

This repository is a skills-first starter workspace for building games on SKNK.

## Source of truth

Use the external `builder-skills` package to drive development in this repo:

```sh
npx skills add sknk-io/builder-skills
```

The expected stage order is:

1. `sknk-game-specification`
2. `sknk-contract-creation`
3. `sknk-frontend-creation`

Do not treat this repo as a framework that decides the final game for the user. The repo provides shape and bootstrap logic; the skills own the development flow.

## Workspace layout

```text
apps/
  contracts/   Placeholder until `yarn init:contracts` initializes it
  web/         Next.js frontend shell
game-overview.md
```

## Responsibilities

- `apps/contracts` is the contracts target path. It becomes the real workspace after bootstrap.
- `apps/web` is the workspace that `sknk-frontend-creation` should inspect and refine.
- `game-overview.md` is the repo-root handoff document emitted by contract work.
- `apps/contracts/frontend-handoff/` is reserved for machine-readable frontend bridge files.

## Guardrails

- Keep `builder-skills` external; do not vendor or submodule it into this repo.
- Preserve the `apps/contracts` and `apps/web` paths unless the user explicitly requests a workspace reorg.
- If `apps/contracts/foundry.toml` is missing, direct the user to run `yarn init:contracts` before contract or frontend work continues.
- Keep `game-overview.md` at repo root because downstream skills expect that path.
- Treat `apps/contracts/out/...` as the ABI source for frontend work after Foundry builds run.
- The generated `apps/contracts` workspace is expected to be committed normally after initialization.

## When working in this repo

- Route product shaping to `sknk-game-specification`.
- Route contract implementation to `sknk-contract-creation`.
- Route frontend implementation to `sknk-frontend-creation`.
- Avoid adding repo-owned behavior that conflicts with those skill boundaries.
