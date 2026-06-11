import type {
	ConsentButtonAction,
	IConsentActionSet,
	IConsentData,
	IConsentPurpose,
	IConsentSubmitPayload,
	IConsentUiResponse
} from '$lib/types';

export const MANDATORY_ERROR_MESSAGE = 'This is a mandatory consent. Tick to continue.';

export function getVisiblePurposes(purposes: IConsentPurpose[]) {
	return purposes.filter((purpose) => purpose.visible);
}

export function getInitialSelectedIds(purposes: IConsentPurpose[]) {
	return new Set(
		getVisiblePurposes(purposes)
			.filter((purpose) => purpose.checked || purpose.mandatory)
			.map((purpose) => purpose.id)
	);
}

export function getInitialExpandedIds(purposes: IConsentPurpose[]) {
	return new Set(
		getVisiblePurposes(purposes)
			.filter((purpose) => purpose.defaultExpanded)
			.map((purpose) => purpose.id)
	);
}

export function getButtonActionSet(data: IConsentData): IConsentActionSet {
	return data.flags.hasOptionalPurposes ? data.actions.hasOptional : data.actions.allMandatory;
}

export function areAllMandatorySelected(purposes: IConsentPurpose[], selectedIds: Set<string>) {
	return getVisiblePurposes(purposes)
		.filter((purpose) => purpose.mandatory)
		.every((purpose) => selectedIds.has(purpose.id));
}

export function getUncheckedMandatoryIds(purposes: IConsentPurpose[], selectedIds: Set<string>) {
	return getVisiblePurposes(purposes)
		.filter((purpose) => purpose.mandatory && !selectedIds.has(purpose.id))
		.map((purpose) => purpose.id);
}

export function resolveSelectedIdsForAction(
	action: ConsentButtonAction,
	purposes: IConsentPurpose[],
	selectedIds: Set<string>
) {
	if (action === 'accept_all') {
		return getVisiblePurposes(purposes).map((purpose) => purpose.id);
	}

	if (action === 'accept_selected') {
		return Array.from(selectedIds);
	}

	return [];
}

export function isConsentUiResponse(value: unknown): value is IConsentUiResponse {
	if (!value || typeof value !== 'object') return false;
	const response = value as Partial<IConsentUiResponse>;
	return Boolean(response.data?.purposes && response.data?.notice);
}

export function buildRecordPayload(
	response: IConsentUiResponse,
	payload: IConsentSubmitPayload
) {
	const { record } = response.data.actions;

	return {
		url: record.url,
		method: record.method,
		body: {
			noticeId: record.noticeId,
			templateVersion: record.templateVersion,
			action: payload.action,
			purposeIds: payload.selectedPurposeIds,
			status:
				payload.action === 'reject'
					? record.statusNotConsented
					: record.statusConsented
		}
	};
}
