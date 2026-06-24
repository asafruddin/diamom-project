import assert from "node:assert";
import test from "node:test";

import { usePracticeSessionStore } from "./session-store";

test("practice session defaults VAS scores to zero", () => {
  usePracticeSessionStore.getState().resetPracticeSession();

  const state = usePracticeSessionStore.getState();

  assert.strictEqual(state.beforeScore, 0);
  assert.strictEqual(state.afterScore, 0);
});
