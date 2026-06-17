import { areAllMandatorySelected, buildChannelSelections, canToggleChannel, getInitialSelectedChannels, getInitialSelectedIds, getUncheckedMandatoryIds, getVisiblePurposes, resolveSelectedIdsForAction } from '../../utils';
export function createInitialState(purposes) {
    return {
        selectedIds: getInitialSelectedIds(purposes),
        selectedChannels: getInitialSelectedChannels(purposes),
        validationAttempted: false,
        activeDetailPurposeId: null
    };
}
export function toggleSelected(state, purposeId, locked) {
    if (locked)
        return state;
    const next = new Set(state.selectedIds);
    if (next.has(purposeId)) {
        next.delete(purposeId);
    }
    else {
        next.add(purposeId);
    }
    return { ...state, selectedIds: next };
}
export function toggleChannel(state, purposeId, channelCode, purposes) {
    const purpose = getVisiblePurposes(purposes).find((entry) => entry.id === purposeId);
    const channel = purpose?.channels?.find((entry) => entry.code === channelCode);
    if (!purpose?.channels?.length || !channel)
        return state;
    const current = new Set(state.selectedChannels.get(purposeId) ?? []);
    const selectedInState = current.has(channelCode);
    if (!canToggleChannel(channel, selectedInState))
        return state;
    if (selectedInState) {
        current.delete(channelCode);
    }
    else {
        current.add(channelCode);
    }
    const selectedChannels = new Map(state.selectedChannels);
    selectedChannels.set(purposeId, current);
    return { ...state, selectedChannels };
}
export function openDetailView(state, purposeId) {
    return { ...state, activeDetailPurposeId: purposeId };
}
export function closeDetailView(state) {
    return { ...state, activeDetailPurposeId: null };
}
function reconcileChannelSelections(previous, purposes) {
    const selectedChannels = new Map();
    for (const purpose of getVisiblePurposes(purposes)) {
        if (!purpose.channels?.length)
            continue;
        const validCodes = new Set(purpose.channels.map((channel) => channel.code));
        const prev = previous.get(purpose.id);
        if (prev) {
            selectedChannels.set(purpose.id, new Set(Array.from(prev).filter((code) => validCodes.has(code))));
            continue;
        }
        selectedChannels.set(purpose.id, new Set(purpose.channels.filter((channel) => channel.checked).map((channel) => channel.code)));
    }
    return selectedChannels;
}
/** Keeps list/detail navigation and selections when consent data is re-fetched for a new language. */
export function reconcileStateAfterLanguageChange(state, purposes) {
    const visibleIds = new Set(getVisiblePurposes(purposes).map((purpose) => purpose.id));
    const selectedIds = new Set(Array.from(state.selectedIds).filter((id) => visibleIds.has(id)));
    const activeDetailPurposeId = state.activeDetailPurposeId && visibleIds.has(state.activeDetailPurposeId)
        ? state.activeDetailPurposeId
        : null;
    return {
        ...state,
        selectedIds,
        selectedChannels: reconcileChannelSelections(state.selectedChannels, purposes),
        activeDetailPurposeId
    };
}
export function confirmDetailView(state, purpose) {
    const next = new Set(state.selectedIds);
    next.add(purpose.id);
    return {
        ...state,
        selectedIds: next,
        activeDetailPurposeId: null
    };
}
export function getActivePurpose(purposes, activeDetailPurposeId) {
    if (!activeDetailPurposeId)
        return null;
    return getVisiblePurposes(purposes).find((purpose) => purpose.id === activeDetailPurposeId) ?? null;
}
export function getViewMode(activeDetailPurposeId) {
    return activeDetailPurposeId ? 'detail' : 'list';
}
export function canSubmitConsent(purposes, selectedIds) {
    return areAllMandatorySelected(purposes, selectedIds);
}
export function getErrorPurposeIdSet(purposes, selectedIds, validationAttempted) {
    if (!validationAttempted)
        return new Set();
    return new Set(getUncheckedMandatoryIds(purposes, selectedIds));
}
export function markValidationAttempted(state) {
    return { ...state, validationAttempted: true };
}
export function buildSubmitPayload(data, action, state) {
    const selectedPurposeIds = resolveSelectedIdsForAction(action, data.data.purposes, state.selectedIds);
    const channelSelections = buildChannelSelections(data.data.purposes, new Set(selectedPurposeIds), state.selectedChannels);
    return {
        action,
        selectedPurposeIds,
        ...(channelSelections.length ? { channelSelections } : {}),
        noticeId: data.noticeId
    };
}
export function shouldBypassValidation(action) {
    return action === 'reject';
}
