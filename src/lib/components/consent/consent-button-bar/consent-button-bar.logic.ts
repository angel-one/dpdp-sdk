import type { ConsentButtonAction } from '$lib/types';

export function isSecondaryInactive(inactive: boolean, secondaryAction?: ConsentButtonAction) {
	return secondaryAction === 'reject' ? false : inactive;
}
