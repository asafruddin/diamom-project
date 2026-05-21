
export type ApprovalStatus = 'draft' | 'review' | 'approved' | 'rejected';

export interface ContentMetadata {
  id: string;
  version: string;
  reviewer?: string;
  reviewDate?: string;
  approvalStatus: ApprovalStatus;
  isMedicalAdjacent: boolean;
}

/**
 * Validates if the content is ready for release.
 * Unapproved safety or medical-adjacent content is not considered release-ready.
 */
export const isContentReleaseReady = (metadata: ContentMetadata): boolean => {
  if (metadata.isMedicalAdjacent && metadata.approvalStatus !== 'approved') {
    return false;
  }
  // Even if not medical adjacent, it shouldn't be released if explicitly rejected
  if (metadata.approvalStatus === 'rejected') {
      return false;
  }
  return true;
};
