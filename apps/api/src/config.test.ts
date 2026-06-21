import assert from "node:assert/strict";
import test from "node:test";

import { parseApiConfig } from "./config.js";

test("parseApiConfig requires deployment secrets", () => {
  assert.throws(
    () => parseApiConfig({}),
    /DATABASE_URL/,
  );
  assert.throws(
    () =>
      parseApiConfig({
        DATABASE_URL: "postgres://example",
      }),
    /RESEARCHER_JWT_SECRET/,
  );
});

test("parseApiConfig applies local server defaults", () => {
  const config = parseApiConfig({
    DATABASE_URL: "postgres://example",
    RESEARCHER_JWT_SECRET: "test-secret",
  });

  assert.equal(config.API_HOST, "0.0.0.0");
  assert.equal(config.API_PORT, 4000);
});
