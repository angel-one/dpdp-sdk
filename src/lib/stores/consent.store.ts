import { writable } from 'svelte/store';
import type { IConsentStoreState, IConsentUiOptions, IConsentUiResponse } from '$lib/types';

const initialState: IConsentStoreState = {
	hydrated: false,
	loading: false,
	error: null,
	data: null,
	uiOptions: {}
};

const SetupConsentStore = () => {
	const { subscribe, set, update } = writable(initialState);

	return { subscribe, set, update };
};

export const ConsentStore = SetupConsentStore();

export function updateConsentHydration(hydrated: boolean) {
	ConsentStore.update((store) => ({
		...store,
		hydrated
	}));
}

export function setConsentLoading(loading: boolean) {
	ConsentStore.update((store) => ({
		...store,
		loading
	}));
}

export function setConsentError(error: string | null) {
	ConsentStore.update((store) => ({
		...store,
		error
	}));
}

export function setConsentData(data: IConsentUiResponse | null) {
	ConsentStore.update((store) => ({
		...store,
		data
	}));
}

export function setConsentUiOptions(uiOptions: IConsentUiOptions) {
	ConsentStore.update((store) => ({
		...store,
		uiOptions
	}));
}

export function resetConsentStore() {
	ConsentStore.set(initialState);
}
