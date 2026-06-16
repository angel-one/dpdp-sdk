import { getDetailTitle, getStaticTextEntries } from '$lib/components/consent/consent-detail-view/consent-detail-view.logic';
import type { IConsentData, IConsentPurpose, IConsentStaticText } from '$lib/types';
import { getPurposeSummary, getPurposeSummaryBullets, getVisiblePurposes } from './consent';

function joinSpeechParts(parts: string[]): string {
	return parts
		.map((part) => part.trim())
		.filter(Boolean)
		.join('. ');
}

/** Plain-text narration for the L1 list view. */
export function buildListSpeechText(data: IConsentData): string {
	const parts: string[] = [data.notice.title, data.notice.subtitle];

	for (const purpose of getVisiblePurposes(data.purposes)) {
		parts.push(purpose.name);
		if (purpose.badge) parts.push(purpose.badge);
		parts.push(...getPurposeSummaryBullets(purpose));
	}

	parts.push(...getStaticTextEntries(data.staticText).map((entry) => entry.text));

	return joinSpeechParts(parts);
}

/** Plain-text narration for the L2 detail view. */
export function buildDetailSpeechText(
	purpose: IConsentPurpose,
	staticText: IConsentStaticText
): string {
	const parts: string[] = [getDetailTitle(purpose)];

	const summary = getPurposeSummary(purpose);
	if (summary) parts.push(summary);

	for (const section of purpose.sections ?? []) {
		parts.push(section.title);
		if (section.description) parts.push(section.description);
	}

	parts.push(...getStaticTextEntries(staticText).map((entry) => entry.text));

	return joinSpeechParts(parts);
}
