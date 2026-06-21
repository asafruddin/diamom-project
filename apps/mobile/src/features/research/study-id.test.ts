import assert from "node:assert";
import test from "node:test";

import { generateStudyId } from "./study-id";

test("generateStudyId returns DiaMom research study IDs", () => {
  const studyId = generateStudyId();

  assert.match(studyId, /^DM-[A-Z0-9]+-[A-Z0-9]+$/);
});
