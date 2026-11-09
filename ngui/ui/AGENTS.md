# AGENTS.md

Guidance for AI coding agents working in `ngui/ui` — the FinOps for Cloud
frontend of the optscale monorepo.

## Start here

[`.claude/skills/ngui-ui/SKILL.md`](.claude/skills/ngui-ui/SKILL.md) — this
package's bindings: the `src/` vs `src/themes/finops/` boundary, aliases,
scripts and the checks already red on `main`, shared components and hooks, the
test provider stack, i18n.

**Write in `src/themes/finops/`, never in `src/`** — `src/` is upstream
OptScale, kept byte-identical so upstream syncs stay mechanical.

The Python services and the Playwright suite in `regression-tests/` (see
[`regression-tests/CLAUDE.md`](../../regression-tests/CLAUDE.md)) are out of
this file's scope.
