import { DEFAULT_CONSENT_API_PATH, DEFAULT_CONSENT_TIMEOUT_MS } from './types';
import { resetConsentStore, setConsentData as updateConsentData, setConsentError as updateConsentError, setConsentLoading, updateConsentHydration } from '../../stores/consent.store';
import { buildRecordPayload } from '../../utils';
import { get } from 'svelte/store';
import { ConsentStore } from '../../stores/consent.store';
class Dpdp {
    #isInitialized = false;
    #initInvocationPromise;
    #invocationResolver;
    #appCode = null;
    #journeyCode = null;
    #pageCode = null;
    #languageCode = null;
    #env = null;
    #consentApiPath = DEFAULT_CONSENT_API_PATH;
    constructor() {
        this.#initInvocationPromise = new Promise((resolve) => {
            this.#invocationResolver = resolve;
        });
    }
    async init(config) {
        if (this.#isInitialized) {
            throw new Error('DPDP SDK is already initialized');
        }
        if (!config.appCode?.length)
            throw new Error('appCode cannot be empty');
        if (!config.journeyCode?.length)
            throw new Error('journeyCode cannot be empty');
        if (!config.pageCode?.length)
            throw new Error('pageCode cannot be empty');
        if (!config.languageCode?.length)
            throw new Error('languageCode cannot be empty');
        const env = config.env ?? 'uat';
        if (env !== 'uat' && env !== 'prod') {
            throw new Error(`Invalid env "${env}". Expected "uat" or "prod"`);
        }
        this.#appCode = config.appCode;
        this.#journeyCode = config.journeyCode;
        this.#pageCode = config.pageCode;
        this.#languageCode = config.languageCode;
        this.#env = env;
        this.#consentApiPath = config.consentApiPath ?? DEFAULT_CONSENT_API_PATH;
        this.#isInitialized = true;
        if (this.#invocationResolver)
            this.#invocationResolver();
    }
    async getIsSdkInitialized() {
        await this.#initInvocationPromise;
        return this.#isInitialized;
    }
    /**
     * Server-first consent hydration. Uses pre-fetched server data when available;
     * falls back to a client-side proxy fetch on server failure.
     */
    async loadConsent(options = {}) {
        await this.getIsSdkInitialized();
        if (options.data) {
            await this.setConsentData(options.data);
            return;
        }
        try {
            await this.fetchConsentUi({ timeoutMs: options.timeoutMs });
        }
        catch (error) {
            const clientMessage = error instanceof Error ? error.message : 'Failed to fetch consent UI';
            const message = options.error
                ? `Server fetch failed: ${options.error}. Client fallback failed: ${clientMessage}`
                : clientMessage;
            await this.setConsentError(message);
        }
    }
    /** Client-side fallback fetch via the host app's proxy route. */
    async fetchConsentUi(options = {}) {
        await this.getIsSdkInitialized();
        const timeoutMs = options.timeoutMs ?? DEFAULT_CONSENT_TIMEOUT_MS;
        setConsentLoading(true);
        updateConsentError(null);
        try {
            const query = new URLSearchParams({
                app_code: this.#appCode ?? '',
                journey_code: this.#journeyCode ?? '',
                page_code: this.#pageCode ?? '',
                language_code: this.#languageCode ?? '',
                env: this.#env ?? 'uat'
            });
            let response;
            try {
                response = await fetch(`${this.#consentApiPath}?${query.toString()}`, {
                    signal: AbortSignal.timeout(timeoutMs)
                });
            }
            catch (error) {
                if (error instanceof DOMException && error.name === 'TimeoutError') {
                    throw new Error(`Consent UI request timed out after ${timeoutMs}ms`);
                }
                throw error;
            }
            if (!response.ok) {
                throw new Error(`Failed to fetch consent UI: ${response.status}`);
            }
            const data = (await response.json());
            updateConsentData(data);
            updateConsentHydration(true);
            return data;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch consent UI';
            updateConsentError(message);
            updateConsentHydration(false);
            throw error;
        }
        finally {
            setConsentLoading(false);
        }
    }
    async setConsentData(data) {
        await this.getIsSdkInitialized();
        updateConsentError(null);
        setConsentLoading(false);
        updateConsentData(data);
        updateConsentHydration(true);
    }
    async setConsentError(error) {
        await this.getIsSdkInitialized();
        updateConsentError(error);
        setConsentLoading(false);
        updateConsentHydration(false);
    }
    /**
     * Handles a consent action from the UI. Builds the record payload from CMS config;
     * POST to record.url will be wired when the record endpoint is integrated.
     */
    async submitConsent(payload) {
        await this.getIsSdkInitialized();
        const state = get(ConsentStore);
        if (!state.data) {
            throw new Error('Cannot submit consent: no consent data loaded');
        }
        buildRecordPayload(state.data, payload);
        this.closeConsent();
    }
    closeConsent() {
        updateConsentHydration(false);
    }
    destroy() {
        this.#isInitialized = false;
        this.#appCode = null;
        this.#journeyCode = null;
        this.#pageCode = null;
        this.#languageCode = null;
        this.#env = null;
        this.#consentApiPath = DEFAULT_CONSENT_API_PATH;
        this.#initInvocationPromise = new Promise((resolve) => {
            this.#invocationResolver = resolve;
        });
        resetConsentStore();
    }
}
export default new Dpdp();
