import { writable } from 'svelte/store';
const initialState = {
    hydrated: false,
    loading: false,
    submitting: false,
    error: null,
    data: null,
    uiOptions: {}
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
export function setConsentSubmitting(submitting) {
    ConsentStore.update((store) => ({
        ...store,
        submitting
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
export function setConsentUiOptions(uiOptions) {
    ConsentStore.update((store) => ({
        ...store,
        uiOptions
    }));
}
export function resetConsentStore() {
    ConsentStore.set(initialState);
}
