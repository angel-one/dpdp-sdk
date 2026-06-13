import { writable } from 'svelte/store';
const initialState = {
    hydrated: false,
    loading: false,
    error: null,
    data: null
};
const SetupConsentStore = () => {
    const { subscribe, set, update } = writable(initialState);
    return { subscribe, set, update };
};
export const ConsentStore = SetupConsentStore();
export function updateConsentHydration(hydrated) {
    ConsentStore.update((store) => ({
        ...store,
        hydrated
    }));
}
export function setConsentLoading(loading) {
    ConsentStore.update((store) => ({
        ...store,
        loading
    }));
}
export function setConsentError(error) {
    ConsentStore.update((store) => ({
        ...store,
        error
    }));
}
export function setConsentData(data) {
    ConsentStore.update((store) => ({
        ...store,
        data
    }));
}
export function resetConsentStore() {
    ConsentStore.set(initialState);
}
