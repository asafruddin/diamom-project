import assert from "node:assert";
import test from "node:test";

import { VAS_ILLUSTRATIONS } from "./vas-content";

test("VAS illustrations expose all required assets", () => {
  assert.ok(VAS_ILLUSTRATIONS.before, "before illustration should be defined");
  assert.ok(VAS_ILLUSTRATIONS.after, "after illustration should be defined");
  assert.ok(
    VAS_ILLUSTRATIONS.laborDanceSession,
    "labor dance session illustration should be defined",
  );
});
