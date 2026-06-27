# Acceptance Auditor Review Prompt

Act as an acceptance auditor with no conversation context. Review the uncommitted implementation diff against:

- `spec-update-splash-and-relocate-vas-cta.md`
- `../project-context.md`
- `../planning-artifacts/product-foundation.md`

Inspect only the implementation changes in:

- `../../apps/mobile/app.json`
- `../../apps/mobile/app/(tabs)/materials/closing.tsx`
- `../../apps/mobile/app/(tabs)/materials/movement/[slug].tsx`

The baseline commit is `a746d1e0cf085e5417f5d009d8895b735399a397`. Existing unrelated edits in the same files are explicitly preserved by the spec. Report concrete violations of acceptance criteria, boundaries, project rules, or context principles. For each finding, include severity, location, violated requirement, and a minimal correction. Return `[]` if there are no findings.
