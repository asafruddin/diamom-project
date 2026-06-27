# Edge Case Hunter Review Prompt

Use the `bmad-review-edge-case-hunter` skill with no conversation context. Review the uncommitted diff for only these implementation files, with read access to the repository:

- `apps/mobile/app.json`
- `apps/mobile/app/(tabs)/materials/closing.tsx`
- `apps/mobile/app/(tabs)/materials/movement/[slug].tsx`

The baseline commit is `a746d1e0cf085e5417f5d009d8895b735399a397`. Existing unrelated edits in the same files may appear in the diff; report only unhandled edge cases directly reachable from changed lines. Follow the skill’s JSON-only output format exactly.
