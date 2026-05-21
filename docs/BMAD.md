# BMAD Integration

BMAD is installed for this project with the official `bmad-method` installer.

## Installed Setup

- Version: `6.7.1`
- Tool integration: Codex
- Generated skills: `.agents/skills`
- BMAD runtime/config: `_bmad`
- Project knowledge: `docs`
- Planning artifacts: `docs/planning-artifacts`
- Implementation artifacts: `docs/implementation-artifacts`
- Communication language: English
- Document output language: English

The existing DiaMom documents are now part of BMAD project knowledge:

- `docs/PRD.md`
- `docs/ARCHITECTURE.md`

## Recommended DiaMom Workflow

1. Start with `bmad-help` to ask BMAD what it detects and what should happen next.
2. Use `bmad-validate-prd` against `docs/PRD.md` before generating epics.
3. Use `bmad-create-architecture` or `bmad-check-implementation-readiness` to tighten the Expo architecture before implementation.
4. Use `bmad-create-epics-and-stories` to produce planning artifacts under `docs/planning-artifacts`.
5. Use `bmad-sprint-planning` to create sprint tracking under `docs/implementation-artifacts`.
6. Use `bmad-create-story`, `bmad-dev-story`, and `bmad-code-review` during implementation.

BMAD works best when each major skill is run in a fresh context window, especially planning, architecture, story creation, development, and review.

## Updating BMAD

For a stable update:

```bash
pnpm dlx bmad-method install
```

For a non-interactive refresh of this setup:

```bash
pnpm dlx bmad-method install --yes --action update --modules bmm
```

If you later add other AI tools, list supported targets with:

```bash
pnpm dlx bmad-method install --list-tools
```
