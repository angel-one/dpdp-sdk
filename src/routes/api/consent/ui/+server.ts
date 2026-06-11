import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchConsentUiFromCms } from '$lib/server/fetch-consent-ui';

export const GET: RequestHandler = async ({ url, request }) => {
	const appCode = url.searchParams.get('app_code');
	const journeyCode = url.searchParams.get('journey_code');
	const pageCode = url.searchParams.get('page_code');
	const languageCode = url.searchParams.get('language_code');
	const env = url.searchParams.get('env') === 'prod' ? 'prod' : 'uat';

	if (!appCode || !journeyCode || !pageCode || !languageCode) {
		return json(
			{
				error: 'Missing required query params: app_code, journey_code, page_code, language_code'
			},
			{ status: 400 }
		);
	}

	try {
		const data = await fetchConsentUiFromCms(
			{
				appCode,
				journeyCode,
				pageCode,
				languageCode,
				env
			},
			{ request }
		);

		return json(data);
	} catch (error) {
		return json(
			{
				error: 'Failed to fetch consent UI from CMS',
				details: error instanceof Error ? error.message : 'Unknown error'
			},
			{ status: 502 }
		);
	}
};
