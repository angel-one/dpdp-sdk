import type { IConsentPurpose, IConsentStaticText } from '../../../types';
export declare function getDetailTitle(purpose: IConsentPurpose): string;
export declare function getStaticTextEntries(staticText: IConsentStaticText): {
    key: string;
    text: string;
}[];
