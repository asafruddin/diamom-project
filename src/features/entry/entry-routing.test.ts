import assert from "node:assert";
import test from "node:test";
import { getInitialDiaMomRoute } from "./entry-routing";

test("getInitialDiaMomRoute", async (t) => {
  await t.test("routes first-time users to onboarding intro", () => {
    assert.strictEqual(
      getInitialDiaMomRoute({
        hasAcceptedDisclaimer: false,
        hasCompletedSafetyScreening: false,
      }),
      "/onboarding/intro",
    );
  });

  await t.test(
    "routes users missing safety screening to onboarding intro",
    () => {
      assert.strictEqual(
        getInitialDiaMomRoute({
          hasAcceptedDisclaimer: true,
          hasCompletedSafetyScreening: false,
        }),
        "/onboarding/intro",
      );
    },
  );

  await t.test("routes users missing disclaimer to onboarding intro", () => {
    assert.strictEqual(
      getInitialDiaMomRoute({
        hasAcceptedDisclaimer: false,
        hasCompletedSafetyScreening: true,
      }),
      "/onboarding/intro",
    );
  });

  await t.test(
    "routes returning users with disclaimer and screening complete to home",
    () => {
      assert.strictEqual(
        getInitialDiaMomRoute({
          hasAcceptedDisclaimer: true,
          hasCompletedSafetyScreening: true,
        }),
        "/(tabs)/home",
      );
    },
  );
});
