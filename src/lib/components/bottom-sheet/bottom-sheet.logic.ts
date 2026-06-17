import {
	areAllMandatorySelected,
	getInitialSelectedIds,
	getUncheckedMandatoryIds,
	getVisiblePurposes,
	resolveSelectedIdsForAction
} from '$lib/utils';
import type { ConsentButtonAction, IConsentPurpose, IConsentSubmitPayload, IConsentUiResponse } from '$lib/types';

export type ConsentViewMode = 'list' | 'detail';

export interface BottomSheetState {
	selectedIds: Set<string>;
	validationAttempted: boolean;
	activeDetailPurposeId: string | null;
}

export function createInitialState(purposes: IConsentPurpose[]): BottomSheetState {
	return {
		selectedIds: getInitialSelectedIds(purposes),
		validationAttempted: false,
		activeDetailPurposeId: null
	};
}

export function toggleSelected(
	state: BottomSheetState,
	purposeId: string,
	locked: boolean
): BottomSheetState {
	if (locked) return state;

	const next = new Set(state.selectedIds);
	if (next.has(purposeId)) {
		next.delete(purposeId);
	} else {
		next.add(purposeId);
	}

	return { ...state, selectedIds: next };
}

export function openDetailView(state: BottomSheetState, purposeId: string): BottomSheetState {
	return { ...state, activeDetailPurposeId: purposeId };
}

export function closeDetailView(state: BottomSheetState): BottomSheetState {
	return { ...state, activeDetailPurposeId: null };
}

/** Keeps list/detail navigation and selections when consent data is re-fetched for a new language. */
export function reconcileStateAfterLanguageChange(
	state: BottomSheetState,
	purposes: IConsentPurpose[]
): BottomSheetState {
	const visibleIds = new Set(getVisiblePurposes(purposes).map((purpose) => purpose.id));
	const selectedIds = new Set(Array.from(state.selectedIds).filter((id) => visibleIds.has(id)));
	const activeDetailPurposeId =
		state.activeDetailPurposeId && visibleIds.has(state.activeDetailPurposeId)
			? state.activeDetailPurposeId
			: null;

	return {
		...state,
		selectedIds,
		activeDetailPurposeId
	};
}

export function confirmDetailView(
	state: BottomSheetState,
	purpose: IConsentPurpose
): BottomSheetState {
	const next = new Set(state.selectedIds);
	next.add(purpose.id);

	return {
		...state,
		selectedIds: next,
		activeDetailPurposeId: null
	};
}

export function getActivePurpose(
	purposes: IConsentPurpose[],
	activeDetailPurposeId: string | null
) {
	if (!activeDetailPurposeId) return null;
	return getVisiblePurposes(purposes).find((purpose) => purpose.id === activeDetailPurposeId) ?? null;
}

export function getViewMode(activeDetailPurposeId: string | null): ConsentViewMode {
	return activeDetailPurposeId ? 'detail' : 'list';
}

export function canSubmitConsent(purposes: IConsentPurpose[], selectedIds: Set<string>) {
	return areAllMandatorySelected(purposes, selectedIds);
}

export function getErrorPurposeIdSet(
	purposes: IConsentPurpose[],
	selectedIds: Set<string>,
	validationAttempted: boolean
) {
	if (!validationAttempted) return new Set<string>();
	return new Set(getUncheckedMandatoryIds(purposes, selectedIds));
}

export function markValidationAttempted(state: BottomSheetState): BottomSheetState {
	return { ...state, validationAttempted: true };
}

export function buildSubmitPayload(
	data: IConsentUiResponse,
	action: ConsentButtonAction,
	selectedIds: Set<string>
): IConsentSubmitPayload {
	return {
		action,
		selectedPurposeIds: resolveSelectedIdsForAction(action, data.data.purposes, selectedIds),
		noticeId: data.noticeId
	};
}

export function shouldBypassValidation(action: ConsentButtonAction) {
	return action === 'reject';
}
