import type { IConsentPurpose, IConsentStaticText } from '../../../types';
export declare const DETAIL_CONFIRM_LABEL_MANDATORY = "GOT IT";
export declare const DETAIL_CONFIRM_LABEL_OPTIONAL = "I ACCEPT";
export declare function getDetailConfirmLabel(purpose: IConsentPurpose): "GOT IT" | "I ACCEPT";
export declare function getDetailTitle(purpose: IConsentPurpose): string;
export declare function getStaticTextEntries(staticText: IConsentStaticText): {
    key: string;
    text: string;
}[];
