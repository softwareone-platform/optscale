# AGENTS.md

Guidance for AI coding agents working in `ngui/ui` — the FinOps for Cloud
frontend of the optscale monorepo.

## Start here

[`.claude/skills/ngui-ui/SKILL.md`](.claude/skills/ngui-ui/SKILL.md) — this
package's bindings: the `src/` vs `src/themes/finops/` boundary, aliases,
scripts and the checks already red on `main`, shared components and hooks, the
test provider stack, i18n.

**A feature goes in `src/`; `src/themes/finops/` holds only this product's
look and copy** — style files, locales, overrides of upstream files. `src/` is
upstream OptScale plus this fork's features: add to upstream's files, don't
reshape them.

The Python services and the Playwright suite in `regression-tests/` (see
[`regression-tests/CLAUDE.md`](../../regression-tests/CLAUDE.md)) are out of
this file's scope.
