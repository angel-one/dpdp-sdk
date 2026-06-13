import { buildConsentUiUrl, getCmsBaseUrl } from '../constants/base-urls';
import { DEFAULT_CONSENT_TIMEOUT_MS } from '../managers/dpdp/types';
export function getForwardedHeaders(request) {
    const headers = new Headers();
    const cookie = request.headers.get('cookie');
    if (cookie) {
        headers.set('cookie', cookie);
    }
    const authorization = request.headers.get('authorization');
    if (authorization) {
        headers.set('authorization', authorization);
    }
    return headers;
}
export async function fetchConsentUiFromCms(params, options = {}) {
    const { request, timeoutMs = DEFAULT_CONSENT_TIMEOUT_MS } = options;
    const cmsUrl = buildConsentUiUrl(getCmsBaseUrl(params.env), {
        appCode: params.appCode,
        journeyCode: params.journeyCode,
        pageCode: params.pageCode,
        languageCode: params.languageCode
    });
    let response;
    try {
        response = await fetch(cmsUrl, {
            headers: request ? getForwardedHeaders(request) : undefined,
            signal: AbortSignal.timeout(timeoutMs)
        });
    }
    catch (error) {
        if (error instanceof DOMException && error.name === 'TimeoutError') {
            throw new Error(`Consent UI request timed out after ${timeoutMs}ms`);
        }
        throw error;
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch consent UI: ${response.status}`);
    }
    return response.json();
}
