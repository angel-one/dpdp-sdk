import type { ConsentButtonAction, IConsentPurpose, IConsentSubmitPayload, IConsentUiResponse } from '../../types';
export type ConsentViewMode = 'list' | 'detail';
export interface BottomSheetState {
    selectedIds: Set<string>;
    validationAttempted: boolean;
    activeDetailPurposeId: string | null;
}
export declare function createInitialState(purposes: IConsentPurpose[]): BottomSheetState;
export declare function toggleSelected(state: BottomSheetState, purposeId: string, locked: boolean): BottomSheetState;
export declare function openDetailView(state: BottomSheetState, purposeId: string): BottomSheetState;
export declare function closeDetailView(state: BottomSheetState): BottomSheetState;
export declare function confirmDetailView(state: BottomSheetState, purpose: IConsentPurpose): BottomSheetState;
export declare function getActivePurpose(purposes: IConsentPurpose[], activeDetailPurposeId: string | null): IConsentPurpose | null;
export declare function getViewMode(activeDetailPurposeId: string | null): ConsentViewMode;
export declare function canSubmitConsent(purposes: IConsentPurpose[], selectedIds: Set<string>): boolean;
export declare function getErrorPurposeIdSet(purposes: IConsentPurpose[], selectedIds: Set<string>, validationAttempted: boolean): Set<string>;
export declare function markValidationAttempted(state: BottomSheetState): BottomSheetState;
export declare function buildSubmitPayload(data: IConsentUiResponse, action: ConsentButtonAction, selectedIds: Set<string>): IConsentSubmitPayload;
export declare function shouldBypassValidation(action: ConsentButtonAction): action is "reject";
