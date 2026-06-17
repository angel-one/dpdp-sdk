import type { IConsentLanguage } from '../../../types';
/** Maps a language code (e.g. `en`) to its display label; falls back to the raw value. */
export declare function getLanguageLabel(language: string): string;
/** Resolves the display label from CMS options, then static fallbacks. */
export declare function resolveLanguageLabel(language: string, languages?: IConsentLanguage[]): string;
/** Returns CMS language options, or a single entry for the active language. */
export declare function getLanguageOptions(languages: IConsentLanguage[] | undefined, currentLanguage: string): IConsentLanguage[];
