import test from 'node:test';
import assert from 'node:assert';
import { isSensitiveKey, redactSensitiveData } from './sensitive-data';

test('Sensitive Data Guardrails', async (t) => {
  await t.test('isSensitiveKey identifies sensitive keys', () => {
    assert.strictEqual(isSensitiveKey('motherName'), true);
    assert.strictEqual(isSensitiveKey('vasBefore'), true);
    assert.strictEqual(isSensitiveKey('emergencyContact'), true);
    assert.strictEqual(isSensitiveKey('pregnancyWeek'), true);
    assert.strictEqual(isSensitiveKey('theme'), false);
    assert.strictEqual(isSensitiveKey('language'), false);
  });

  await t.test('redactSensitiveData redacts only sensitive values', () => {
    const rawData = {
      theme: 'dark',
      motherName: 'Siti',
      vasBefore: 5,
      appVersion: '1.0.0',
    };
    const redacted = redactSensitiveData(rawData);
    assert.deepStrictEqual(redacted, {
      theme: 'dark',
      motherName: '[REDACTED]',
      vasBefore: '[REDACTED]',
      appVersion: '1.0.0',
    });
  });
});
