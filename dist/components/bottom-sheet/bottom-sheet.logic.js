import { areAllMandatorySelected, getInitialSelectedIds, getUncheckedMandatoryIds, getVisiblePurposes, resolveSelectedIdsForAction } from '../../utils';
export function createInitialState(purposes) {
    return {
        selectedIds: getInitialSelectedIds(purposes),
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
export function openDetailView(state, purposeId) {
    return { ...state, activeDetailPurposeId: purposeId };
}
export function closeDetailView(state) {
    return { ...state, activeDetailPurposeId: null };
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
export function buildSubmitPayload(data, action, selectedIds) {
    return {
        action,
        selectedPurposeIds: resolveSelectedIdsForAction(action, data.data.purposes, selectedIds),
        noticeId: data.noticeId
    };
}
export function shouldBypassValidation(action) {
    return action === 'reject';
}
