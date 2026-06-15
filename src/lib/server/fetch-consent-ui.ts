import { buildConsentUiUrl, getCmsBaseUrl } from '$lib/constants/base-urls';
import { DEFAULT_CONSENT_TIMEOUT_MS, type DpdpEnv } from '$lib/managers/dpdp/types';
import { isConsentUiResponse } from '$lib/utils';
import type { IConsentUiResponse } from '$lib/types';

export interface FetchConsentUiParams {
	appCode: string;
	journeyCode: string;
	pageCode: string;
	languageCode: string;
	env?: DpdpEnv;
}

export interface FetchConsentUiOptions {
	request?: Request;
	timeoutMs?: number;
}

export function getForwardedHeaders(request: Request): HeadersInit {
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

export async function fetchConsentUiFromCms(
	params: FetchConsentUiParams,
	options: FetchConsentUiOptions = {}
): Promise<IConsentUiResponse> {
	const { request, timeoutMs = DEFAULT_CONSENT_TIMEOUT_MS } = options;

	const cmsUrl = buildConsentUiUrl(getCmsBaseUrl(params.env), {
		appCode: params.appCode,
		journeyCode: params.journeyCode,
		pageCode: params.pageCode,
		languageCode: params.languageCode
	});

	let response: Response;
	try {
		response = await fetch(cmsUrl, {
			headers: request ? getForwardedHeaders(request) : undefined,
			signal: AbortSignal.timeout(timeoutMs)
		});
	} catch (error) {
		if (error instanceof DOMException && error.name === 'TimeoutError') {
			throw new Error(`Consent UI request timed out after ${timeoutMs}ms`);
		}
		throw error;
	}

	if (!response.ok) {
		throw new Error(`Failed to fetch consent UI: ${response.status}`);
	}

	const data: unknown = await response.json();

	if (!isConsentUiResponse(data)) {
		throw new Error('Invalid consent UI response from CMS');
	}

	return data;
}
