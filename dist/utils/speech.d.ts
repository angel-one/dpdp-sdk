export type SpeechStateHandler = (speaking: boolean) => void;
/** Maps a CMS language code to a BCP-47 tag for speech synthesis. */
export declare function mapSpeechLanguage(language: string): string;
export declare function isSpeechSupported(): boolean;
/** Splits long copy into utterance-sized chunks, preferring sentence boundaries. */
export declare function chunkSpeechText(text: string, maxLength?: number): string[];
export declare function stopSpeech(onStateChange?: SpeechStateHandler): void;
/** Reads `text` aloud using the Web Speech API. Calls `onStateChange(true|false)` around playback. */
export declare function speak(text: string, language: string, onStateChange?: SpeechStateHandler): void;
