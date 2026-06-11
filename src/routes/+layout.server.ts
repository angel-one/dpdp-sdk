import { fetchConsentUiFromCms } from '$lib/server/fetch-consent-ui';
import type { LayoutServerLoad } from './$types';

const DEMO_CONSENT_PARAMS = {
	appCode: 'insurance_app',
	journeyCode: 'kyc_onboarding',
	pageCode: 'insurance_kyc_gate',
	languageCode: 'en',
	env: 'uat'
} as const;

export const load: LayoutServerLoad = async ({ request }) => {
	try {
		const consentUi = await fetchConsentUiFromCms(DEMO_CONSENT_PARAMS, { request });

		return {
			consentUi,
			consentError: null
		};
	} catch (error) {
		return {
			consentUi: null,
			consentError: error instanceof Error ? error.message : 'Failed to fetch consent UI'
		};
	}
};
