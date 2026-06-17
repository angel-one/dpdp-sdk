import type { IConsentChannel, IConsentPurpose } from '../../../types';
export declare function getPurposeDetailsId(purposeId: string): string;
export declare function getBadgeVariant(purpose: IConsentPurpose): "mandatory" | "optional";
export declare function getCheckboxLabel(purpose: IConsentPurpose): string;
export declare function getChannelCheckboxLabel(channel: IConsentChannel): string;
