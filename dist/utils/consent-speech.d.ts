import type { IConsentData, IConsentPurpose, IConsentStaticText } from '../types';
/** Plain-text narration for the L1 list view. */
export declare function buildListSpeechText(data: IConsentData): string;
/** Plain-text narration for the L2 detail view. */
export declare function buildDetailSpeechText(purpose: IConsentPurpose, staticText: IConsentStaticText): string;
