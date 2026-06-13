export const CMS_UAT_BASE_URL = 'https://cms-core-uat.internal.angelone.in';
export const CMS_PROD_BASE_URL = 'https://cms-core.internal.angelone.in';
export const CONSENT_UI_PATH = '/v1/consent/ui';
export function getCmsBaseUrl(env) {
    switch (env) {
        case 'prod':
            return CMS_PROD_BASE_URL;
        case 'uat':
        default:
            return CMS_UAT_BASE_URL;
    }
}
export function buildConsentUiUrl(baseUrl, params) {
    const url = new URL(CONSENT_UI_PATH, baseUrl);
    url.searchParams.set('app_code', params.appCode);
    url.searchParams.set('journey_code', params.journeyCode);
    url.searchParams.set('page_code', params.pageCode);
    url.searchParams.set('language_code', params.languageCode);
    return url.toString();
}
