import type { DpdpEnv } from '$lib/managers/dpdp/types';

export const CMS_UAT_BASE_URL = 'https://cms-core-uat.internal.angelone.in';
export const CMS_PROD_BASE_URL = 'https://cms-core.internal.angelone.in';

export const CONSENT_UI_PATH = '/v1/consent/ui';

export function getCmsBaseUrl(env: DpdpEnv | null | undefined) {
	switch (env) {
		case 'prod':
			return CMS_PROD_BASE_URL;
		case 'uat':
		default:
			return CMS_UAT_BASE_URL;
	}
}

export function buildConsentUiUrl(
	baseUrl: string,
	params: {
		appCode: string;
		journeyCode: string;
		pageCode: string;
		languageCode: string;
	}
) {
	const url = new URL(CONSENT_UI_PATH, baseUrl);
	url.searchParams.set('app_code', params.appCode);
	url.searchParams.set('journey_code', params.journeyCode);
	url.searchParams.set('page_code', params.pageCode);
	url.searchParams.set('language_code', params.languageCode);
	return url.toString();
}
