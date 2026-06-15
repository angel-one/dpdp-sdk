import type { InitConfig, LoadConsentOptions } from './types';
import type { IConsentSubmitPayload, IConsentUiResponse } from '../../types';
declare class Dpdp {
    #private;
    constructor();
    init(config: InitConfig): Promise<void>;
    getIsSdkInitialized(): Promise<boolean>;
    /**
     * Server-first consent hydration. Uses pre-fetched server data when available;
     * falls back to a client-side proxy fetch on server failure.
     */
    loadConsent(options?: LoadConsentOptions): Promise<void>;
    /** Client-side fallback fetch via the host app's proxy route. */
    fetchConsentUi(options?: {
        timeoutMs?: number;
    }): Promise<IConsentUiResponse>;
    setConsentData(data: IConsentUiResponse): Promise<void>;
    setConsentError(error: string | null): Promise<void>;
    /** Submits consent to the CMS record endpoint, then closes the sheet on success. */
    submitConsent(payload: IConsentSubmitPayload): Promise<void>;
    closeConsent(): void;
    destroy(): void;
}
declare const _default: Dpdp;
export default _default;
