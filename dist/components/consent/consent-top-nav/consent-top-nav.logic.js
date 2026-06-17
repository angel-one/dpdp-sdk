const LANGUAGE_LABELS = {
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
export function getLanguageLabel(language) {
    if (!language)
        return '';
    const normalized = language.trim().toLowerCase();
    return LANGUAGE_LABELS[normalized] ?? language;
}
/** Resolves the display label from CMS options, then static fallbacks. */
export function resolveLanguageLabel(language, languages) {
    if (!language)
        return '';
    const normalized = language.trim().toLowerCase();
    const fromCms = languages?.find((entry) => entry.code.trim().toLowerCase() === normalized);
    return fromCms?.label?.trim() || getLanguageLabel(language);
}
/** Returns CMS language options, or a single entry for the active language. */
export function getLanguageOptions(languages, currentLanguage) {
    if (languages?.length)
        return languages;
    return [{ code: currentLanguage, label: resolveLanguageLabel(currentLanguage) }];
}
