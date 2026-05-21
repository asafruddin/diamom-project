
import test from 'node:test';
import assert from 'node:assert';
import { isContentReleaseReady, ContentMetadata } from './content-governance';

test('Content Governance', async (t) => {
  await t.test('unapproved medical-adjacent content is not release-ready', () => {
    const draftContent: ContentMetadata = {
      id: 'disclaimer-1',
      version: '1.0.0',
      approvalStatus: 'draft',
      isMedicalAdjacent: true
    };
    assert.strictEqual(isContentReleaseReady(draftContent), false);
  });

  await t.test('approved medical-adjacent content is release-ready', () => {
    const approvedContent: ContentMetadata = {
      id: 'disclaimer-1',
      version: '1.0.0',
      reviewer: 'Dr. Jane',
      reviewDate: '2026-05-21',
      approvalStatus: 'approved',
      isMedicalAdjacent: true
    };
    assert.strictEqual(isContentReleaseReady(approvedContent), true);
  });

  await t.test('rejected non-medical content is not release-ready', () => {
      const rejectedContent: ContentMetadata = {
        id: 'ui-copy-1',
        version: '1.0.0',
        approvalStatus: 'rejected',
        isMedicalAdjacent: false
      };
      assert.strictEqual(isContentReleaseReady(rejectedContent), false);
  });
  
  await t.test('draft non-medical content can be considered release-ready (MVP leniency)', () => {
      const draftUIContent: ContentMetadata = {
        id: 'ui-copy-1',
        version: '1.0.0',
        approvalStatus: 'draft',
        isMedicalAdjacent: false
      };
      assert.strictEqual(isContentReleaseReady(draftUIContent), true);
  });
});
