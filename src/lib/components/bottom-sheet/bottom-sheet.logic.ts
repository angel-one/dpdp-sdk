import {
	areAllMandatorySelected,
	buildChannelSelections,
	canToggleChannel,
	getInitialSelectedChannels,
	getInitialSelectedIds,
	getUncheckedMandatoryIds,
	getVisiblePurposes,
	resolveSelectedIdsForAction
} from '$lib/utils';
import type { ConsentButtonAction, IConsentPurpose, IConsentSubmitPayload, IConsentUiResponse } from '$lib/types';

export type ConsentViewMode = 'list' | 'detail';

export interface BottomSheetState {
	selectedIds: Set<string>;
	selectedChannels: Map<string, Set<string>>;
	validationAttempted: boolean;
	activeDetailPurposeId: string | null;
}

export function createInitialState(purposes: IConsentPurpose[]): BottomSheetState {
	return {
		selectedIds: getInitialSelectedIds(purposes),
		selectedChannels: getInitialSelectedChannels(purposes),
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

export function toggleChannel(
	state: BottomSheetState,
	purposeId: string,
	channelCode: string,
	purposes: IConsentPurpose[]
): BottomSheetState {
	const purpose = getVisiblePurposes(purposes).find((entry) => entry.id === purposeId);
	const channel = purpose?.channels?.find((entry) => entry.code === channelCode);
	if (!purpose?.channels?.length || !channel) return state;

	const current = new Set(state.selectedChannels.get(purposeId) ?? []);
	const selectedInState = current.has(channelCode);

	if (!canToggleChannel(channel, selectedInState)) return state;

	if (selectedInState) {
		current.delete(channelCode);
	} else {
		current.add(channelCode);
	}

	const selectedChannels = new Map(state.selectedChannels);
	selectedChannels.set(purposeId, current);

	return { ...state, selectedChannels };
}

export function openDetailView(state: BottomSheetState, purposeId: string): BottomSheetState {
	return { ...state, activeDetailPurposeId: purposeId };
}

export function closeDetailView(state: BottomSheetState): BottomSheetState {
	return { ...state, activeDetailPurposeId: null };
}

function reconcileChannelSelections(
	previous: Map<string, Set<string>>,
	purposes: IConsentPurpose[]
) {
	const selectedChannels = new Map<string, Set<string>>();

	for (const purpose of getVisiblePurposes(purposes)) {
		if (!purpose.channels?.length) continue;

		const validCodes = new Set(purpose.channels.map((channel) => channel.code));
		const prev = previous.get(purpose.id);

		if (prev) {
			selectedChannels.set(
				purpose.id,
				new Set(Array.from(prev).filter((code) => validCodes.has(code)))
			);
			continue;
		}

		selectedChannels.set(
			purpose.id,
			new Set(purpose.channels.filter((channel) => channel.checked).map((channel) => channel.code))
		);
	}

	return selectedChannels;
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
		selectedChannels: reconcileChannelSelections(state.selectedChannels, purposes),
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
	state: BottomSheetState
): IConsentSubmitPayload {
	const selectedPurposeIds = resolveSelectedIdsForAction(
		action,
		data.data.purposes,
		state.selectedIds
	);
	const channelSelections = buildChannelSelections(
		data.data.purposes,
		new Set(selectedPurposeIds),
		state.selectedChannels
	);

	return {
		action,
		selectedPurposeIds,
		...(channelSelections.length ? { channelSelections } : {}),
		noticeId: data.noticeId
	};
}

export function shouldBypassValidation(action: ConsentButtonAction) {
	return action === 'reject';
}
