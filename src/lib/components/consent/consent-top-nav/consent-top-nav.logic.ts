const LANGUAGE_LABELS: Record<string, string> = {
	en: 'English',
	hi: 'हिन्दी',
	bn: 'বাংলা',
	mr: 'मराठी',
	te: 'తెలుగు',
	ta: 'தமிழ்',
	gu: 'ગુજરાતી',
	kn: 'ಕನ್ನಡ',
	ml: 'മലയാളം',
	pa: 'ਪੰਜਾਬੀ',
	or: 'ଓଡ଼ିଆ',
	as: 'অসমীয়া',
	ur: 'اردو'
};

/** Maps a language code (e.g. `en`) to its display label; falls back to the raw value. */
export function getLanguageLabel(language: string): string {
	if (!language) return '';
	const normalized = language.trim().toLowerCase();
	return LANGUAGE_LABELS[normalized] ?? language;
}
