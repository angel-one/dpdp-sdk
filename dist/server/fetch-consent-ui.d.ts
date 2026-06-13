import { type DpdpEnv } from '../managers/dpdp/types';
import type { IConsentUiResponse } from '../types';
export interface FetchConsentUiParams {
    appCode: string;
    journeyCode: string;
    pageCode: string;
    languageCode: string;
    env?: DpdpEnv;
}
export interface FetchConsentUiOptions {
    request?: Request;
    timeoutMs?: number;
}
export declare function getForwardedHeaders(request: Request): HeadersInit;
export declare function fetchConsentUiFromCms(params: FetchConsentUiParams, options?: FetchConsentUiOptions): Promise<IConsentUiResponse>;
