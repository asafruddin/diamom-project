
import test from 'node:test';
import assert from 'node:assert';
import { isValidPregnancyWeek } from './validation';

test('Pregnancy Validation', async (t) => {
  await t.test('isValidPregnancyWeek validates correctly', () => {
    assert.strictEqual(isValidPregnancyWeek('10'), true);
    assert.strictEqual(isValidPregnancyWeek('42'), true);
    assert.strictEqual(isValidPregnancyWeek('0'), false);
    assert.strictEqual(isValidPregnancyWeek('43'), false);
    assert.strictEqual(isValidPregnancyWeek('abc'), false);
    assert.strictEqual(isValidPregnancyWeek(''), false);
  });
});
