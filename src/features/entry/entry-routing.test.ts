
import test from 'node:test';
import assert from 'node:assert';
import { getInitialDiaMomRoute } from './entry-routing';

test('getInitialDiaMomRoute', async (t) => {
  await t.test('routes first-time users to onboarding intro', () => {
    assert.strictEqual(
      getInitialDiaMomRoute({
        hasCompletedProfile: false,
        hasAcceptedDisclaimer: false,
        hasCompletedSafetyScreening: false,
      }),
      '/onboarding/intro'
    );
  });

  await t.test('routes users missing disclaimer consent to onboarding intro', () => {
    assert.strictEqual(
      getInitialDiaMomRoute({
        hasCompletedProfile: true,
        hasAcceptedDisclaimer: false,
        hasCompletedSafetyScreening: false,
      }),
      '/onboarding/intro'
    );
  });

  await t.test('routes returning users with all onboarding steps to home dashboard', () => {
    assert.strictEqual(
      getInitialDiaMomRoute({
        hasCompletedProfile: true,
        hasAcceptedDisclaimer: true,
        hasCompletedSafetyScreening: true,
      }),
      '/(tabs)/home'
    );
  });
});
