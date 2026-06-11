import type { IConsentPurpose } from '$lib/types';

export function getPurposeDetailsId(purposeId: string) {
	return `purpose-details-${purposeId}`;
}

export function getBadgeVariant(purpose: IConsentPurpose) {
	return purpose.mandatory ? 'mandatory' : 'optional';
}

export function getCheckboxLabel(purpose: IConsentPurpose) {
	return `Select ${purpose.name}`;
}
