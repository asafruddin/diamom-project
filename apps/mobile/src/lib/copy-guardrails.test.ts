import test from 'node:test';
import assert from 'node:assert';
import { hasUnsafeMedicalClaim, guardrailLog } from './copy-guardrails';
import { CLAIM_SAFE_COPY } from '../constants/claim-safe-copy';

test('Copy Guardrails - hasUnsafeMedicalClaim', async (t) => {
  await t.test('returns true for text containing unsafe medical claims', () => {
    assert.strictEqual(hasUnsafeMedicalClaim('Aplikasi ini dijamin menyembuhkan nyeri.'), true);
    assert.strictEqual(hasUnsafeMedicalClaim('Ini adalah pengobatan medis.'), true);
    assert.strictEqual(hasUnsafeMedicalClaim('DiaMom menggantikan dokter Anda.'), true);
  });

  await t.test('returns false for text without unsafe medical claims', () => {
    assert.strictEqual(hasUnsafeMedicalClaim('Aplikasi ini membantu memantau kenyamanan Anda.'), false);
    assert.strictEqual(hasUnsafeMedicalClaim(CLAIM_SAFE_COPY.MEDICAL_DISCLAIMER), false);
    assert.strictEqual(hasUnsafeMedicalClaim(CLAIM_SAFE_COPY.VAS_DISCLAIMER), false);
  });
});

test('Copy Guardrails - guardrailLog', async (t) => {
  await t.test('redacts sensitive data fields', () => {
    let loggedArgs: any[] = [];
    const originalLog = console.log;
    console.log = (...args) => {
      loggedArgs = args;
    };

    try {
      (global as any).__DEV__ = true;
      guardrailLog('test_event', {
        id: 1,
        name: 'Jane Doe',
        vasScore: 8,
        contactNumber: '12345',
        safeData: 'safe'
      });

      assert.strictEqual(loggedArgs[0], '[DiaMom Event] test_event');
      assert.deepStrictEqual(loggedArgs[1], {
        id: 1,
        name: '[REDACTED]',
        vasScore: '[REDACTED]',
        contactNumber: '[REDACTED]',
        safeData: 'safe'
      });
    } finally {
      console.log = originalLog;
    }
  });
});
