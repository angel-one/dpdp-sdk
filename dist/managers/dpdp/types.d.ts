import type { IConsentUiResponse } from '../../types';
export type DpdpEnv = 'uat' | 'prod';
export declare const DEFAULT_CONSENT_API_PATH = "/api/consent/ui";
export declare const DEFAULT_CONSENT_TIMEOUT_MS = 10000;
export declare const DEFAULT_Z_INDEX_BASE = 9999;
export interface InitConfig {
    appCode: string;
    journeyCode: string;
    pageCode: string;
    languageCode: string;
    env?: DpdpEnv;
    /** Proxy route used for client-side fallback. Defaults to /api/consent/ui */
    consentApiPath?: string;
    /** Override CMS layout.dismissible. When omitted, CMS layout controls dismiss behaviour. */
    allowDismiss?: boolean;
    /** Base z-index for overlay UI. Defaults to 9999. */
    zIndexBase?: number;
}
export interface LoadConsentOptions {
    /** Pre-fetched consent data from +layout.server.ts */
    data?: IConsentUiResponse | null;
    /** Server-side fetch error, triggers client fallback when data is absent */
    error?: string | null;
    /** Timeout for the client fallback request in ms */
    timeoutMs?: number;
}
