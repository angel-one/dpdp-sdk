import type { DpdpEnv } from '../managers/dpdp/types';
export declare const CMS_UAT_BASE_URL = "https://cms-core-uat.internal.angelone.in";
export declare const CMS_PROD_BASE_URL = "https://cms-core.internal.angelone.in";
export declare const CONSENT_UI_PATH = "/v1/consent/ui";
export declare function getCmsBaseUrl(env: DpdpEnv | null | undefined): "https://cms-core-uat.internal.angelone.in" | "https://cms-core.internal.angelone.in";
export declare function buildConsentUiUrl(baseUrl: string, params: {
    appCode: string;
    journeyCode: string;
    pageCode: string;
    languageCode: string;
}): string;
