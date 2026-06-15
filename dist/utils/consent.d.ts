import type { ConsentButtonAction, IConsentActionSet, IConsentData, IConsentLayout, IConsentLabels, IConsentPurpose, IConsentUiResponse } from '../types';
export declare const DEFAULT_MANDATORY_ERROR_MESSAGE = "This is a mandatory consent. Tick to continue.";
export declare const DEFAULT_GOT_IT_LABEL = "GOT IT";
export declare const DEFAULT_BACK_LABEL = "Back to consent list";
/** @deprecated Use getMandatoryErrorMessage(labels) */
export declare const MANDATORY_ERROR_MESSAGE = "This is a mandatory consent. Tick to continue.";
export declare function getMandatoryErrorMessage(labels: IConsentLabels): string;
export declare function getDetailConfirmLabel(purpose: IConsentPurpose, labels: IConsentLabels): string;
export declare function getBackLabel(labels: IConsentLabels): string;
export declare function resolveDismissible(layout: IConsentLayout, allowDismiss?: boolean): boolean;
export declare function getVisiblePurposes(purposes: IConsentPurpose[]): IConsentPurpose[];
export declare function getInitialSelectedIds(purposes: IConsentPurpose[]): Set<string>;
export declare function getInitialExpandedIds(purposes: IConsentPurpose[]): Set<string>;
export declare function getButtonActionSet(data: IConsentData): IConsentActionSet;
export declare function areAllMandatorySelected(purposes: IConsentPurpose[], selectedIds: Set<string>): boolean;
export declare function getUncheckedMandatoryIds(purposes: IConsentPurpose[], selectedIds: Set<string>): string[];
export declare function resolveSelectedIdsForAction(action: ConsentButtonAction, purposes: IConsentPurpose[], selectedIds: Set<string>): string[];
export declare function isConsentUiResponse(value: unknown): value is IConsentUiResponse;
