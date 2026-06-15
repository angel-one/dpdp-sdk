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
    /** Closes the consent sheet after accept/reject. Record POST will be wired when the backend is ready. */
    submitConsent(_payload: IConsentSubmitPayload): Promise<void>;
    closeConsent(): void;
    destroy(): void;
}
declare const _default: Dpdp;
export default _default;
