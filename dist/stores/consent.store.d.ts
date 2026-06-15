import type { IConsentStoreState, IConsentUiResponse } from '../types';
export declare const ConsentStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<IConsentStoreState>, invalidate?: import("svelte/store").Invalidator<IConsentStoreState> | undefined) => import("svelte/store").Unsubscriber;
    set: (this: void, value: IConsentStoreState) => void;
    update: (this: void, updater: import("svelte/store").Updater<IConsentStoreState>) => void;
};
export declare function updateConsentHydration(hydrated: boolean): void;
export declare function setConsentLoading(loading: boolean): void;
export declare function setConsentError(error: string | null): void;
export declare function setConsentData(data: IConsentUiResponse | null): void;
export declare function resetConsentStore(): void;
