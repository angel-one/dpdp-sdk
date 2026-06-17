import type {
	ConsentButtonAction,
	IConsentActionSet,
	IConsentChannel,
	IConsentData,
	IConsentLayout,
	IConsentLabels,
	IConsentPurpose,
	IConsentUiResponse
} from '$lib/types';

export const DEFAULT_MANDATORY_ERROR_MESSAGE =
	'This is a mandatory consent. Tick to continue.';
export const DEFAULT_GOT_IT_LABEL = 'GOT IT';
export const DEFAULT_BACK_LABEL = 'Back to consent list';

/** @deprecated Use getMandatoryErrorMessage(labels) */
export const MANDATORY_ERROR_MESSAGE = DEFAULT_MANDATORY_ERROR_MESSAGE;

export function getMandatoryErrorMessage(labels: IConsentLabels) {
	return labels.mandatoryError?.trim() || DEFAULT_MANDATORY_ERROR_MESSAGE;
}

export function getDetailConfirmLabel(purpose: IConsentPurpose, labels: IConsentLabels) {
	if (purpose.mandatory) {
		return labels.gotIt?.trim() || DEFAULT_GOT_IT_LABEL;
	}

	return labels.accept?.trim() || 'Accept';
}

export function getBackLabel(labels: IConsentLabels) {
	return labels.back?.trim() || DEFAULT_BACK_LABEL;
}

/** Card list bullets — CMS `summaryBullets` (legacy: `bullets`). */
export function getPurposeSummaryBullets(purpose: IConsentPurpose) {
	return purpose.summaryBullets ?? purpose.bullets ?? [];
}

/** Card / detail intro — CMS `summary` (legacy: `description`). */
export function getPurposeSummary(purpose: IConsentPurpose) {
	return purpose.summary?.trim() || purpose.description?.trim() || '';
}

export function resolveDismissible(layout: IConsentLayout, allowDismiss?: boolean) {
	if (allowDismiss !== undefined) return allowDismiss;
	return layout.dismissible === true;
}

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

export function getInitialSelectedChannels(purposes: IConsentPurpose[]) {
	const selectedChannels = new Map<string, Set<string>>();

	for (const purpose of getVisiblePurposes(purposes)) {
		if (!purpose.channels?.length) continue;

		selectedChannels.set(
			purpose.id,
			new Set(purpose.channels.filter((channel) => channel.checked).map((channel) => channel.code))
		);
	}

	return selectedChannels;
}

/** Whether a channel checkbox is non-interactive (CMS locked or pre-checked without opt-out). */
export function isChannelCheckboxDisabled(channel: IConsentChannel) {
	return channel.locked || (!channel.optOutAllowed && channel.checked);
}

export function canToggleChannel(channel: IConsentChannel, selectedInState: boolean) {
	if (channel.locked) return false;
	if (selectedInState && !channel.optOutAllowed && channel.checked) return false;
	return true;
}

export function buildChannelSelections(
	purposes: IConsentPurpose[],
	selectedIds: Set<string>,
	selectedChannels: Map<string, Set<string>>
) {
	return getVisiblePurposes(purposes)
		.filter((purpose) => purpose.channels?.length)
		.map((purpose) => ({
			purposeId: purpose.id,
			channels: Array.from(selectedChannels.get(purpose.id) ?? [])
		}))
		.filter((entry) => {
			if (entry.channels.length === 0) return false;
			return selectedIds.has(entry.purposeId);
		});
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
	return Boolean(
		response.data?.purposes &&
			response.data?.notice &&
			response.data?.labels?.accept?.trim() &&
			response.data?.labels?.reject?.trim()
	);
}

