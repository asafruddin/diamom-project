
import test from 'node:test';
import assert from 'node:assert';
import { evaluateSafetyScreening } from './safety-gating';
import { SAFETY_GATING_MESSAGES } from '../../constants/safety';

test('Safety Gating Logic', async (t) => {
  await t.test('blocks when answers are null', () => {
    const result = evaluateSafetyScreening(null);
    assert.strictEqual(result.decision, 'block');
    assert.strictEqual(result.canAccessEducation, true);
  });

  await t.test('blocks when hasRisk is true', () => {
    const result = evaluateSafetyScreening({
      signs: ['bleeding'],
      timestamp: '2026-05-21T00:00:00Z',
      hasRisk: true
    });
    
    assert.strictEqual(result.decision, 'block');
    assert.strictEqual(result.message, SAFETY_GATING_MESSAGES.RISK_FOUND);
    assert.strictEqual(result.canAccessEducation, true);
  });

  await t.test('allows when hasRisk is false', () => {
    const result = evaluateSafetyScreening({
      signs: [],
      timestamp: '2026-05-21T00:00:00Z',
      hasRisk: false
    });
    
    assert.strictEqual(result.decision, 'allow');
    assert.strictEqual(result.message, SAFETY_GATING_MESSAGES.SAFE);
  });
});
