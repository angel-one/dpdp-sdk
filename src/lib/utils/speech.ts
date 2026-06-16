export type SpeechStateHandler = (speaking: boolean) => void;

const SPEECH_LANGUAGE_MAP: Record<string, string> = {
	en: 'en-IN',
	hi: 'hi-IN',
	bn: 'bn-IN',
	mr: 'mr-IN',
	te: 'te-IN',
	ta: 'ta-IN',
	gu: 'gu-IN',
	kn: 'kn-IN',
	ml: 'ml-IN',
	pa: 'pa-IN',
	or: 'or-IN',
	as: 'as-IN',
	ur: 'ur-IN'
};

const CHUNK_MAX_LENGTH = 300;

let activeSession = 0;

function getSpeechSynthesis() {
	if (typeof window === 'undefined') return null;
	return window.speechSynthesis ?? null;
}

/** Maps a CMS language code to a BCP-47 tag for speech synthesis. */
export function mapSpeechLanguage(language: string): string {
	if (!language) return 'en-IN';
	const normalized = language.trim().toLowerCase();
	return SPEECH_LANGUAGE_MAP[normalized] ?? normalized;
}

export function isSpeechSupported(): boolean {
	return getSpeechSynthesis() !== null && typeof SpeechSynthesisUtterance !== 'undefined';
}

/** Splits long copy into utterance-sized chunks, preferring sentence boundaries. */
export function chunkSpeechText(text: string, maxLength = CHUNK_MAX_LENGTH): string[] {
	const trimmed = text.trim();
	if (!trimmed) return [];
	if (trimmed.length <= maxLength) return [trimmed];

	const sentences = trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [trimmed];
	const chunks: string[] = [];
	let current = '';

	for (const sentence of sentences) {
		const part = sentence.trim();
		if (!part) continue;

		const candidate = current ? `${current} ${part}` : part;
		if (candidate.length <= maxLength) {
			current = candidate;
			continue;
		}

		if (current) chunks.push(current);

		if (part.length <= maxLength) {
			current = part;
			continue;
		}

		for (let index = 0; index < part.length; index += maxLength) {
			chunks.push(part.slice(index, index + maxLength));
		}
		current = '';
	}

	if (current) chunks.push(current);
	return chunks;
}

export function stopSpeech(onStateChange?: SpeechStateHandler): void {
	const synthesis = getSpeechSynthesis();
	if (!synthesis) return;

	activeSession += 1;
	synthesis.cancel();
	onStateChange?.(false);
}

/** Reads `text` aloud using the Web Speech API. Calls `onStateChange(true|false)` around playback. */
export function speak(text: string, language: string, onStateChange?: SpeechStateHandler): void {
	const synthesis = getSpeechSynthesis();
	if (!synthesis || typeof SpeechSynthesisUtterance === 'undefined') {
		onStateChange?.(false);
		return;
	}

	const chunks = chunkSpeechText(text);
	if (!chunks.length) {
		onStateChange?.(false);
		return;
	}

	stopSpeech();
	const session = activeSession;
	const lang = mapSpeechLanguage(language);
	let index = 0;

	onStateChange?.(true);

	const speakNext = () => {
		if (session !== activeSession) return;

		if (index >= chunks.length) {
			onStateChange?.(false);
			return;
		}

		const utterance = new SpeechSynthesisUtterance(chunks[index]);
		index += 1;
		utterance.lang = lang;
		utterance.onend = speakNext;
		utterance.onerror = () => {
			if (session === activeSession) onStateChange?.(false);
		};
		synthesis.speak(utterance);
	};

	speakNext();
}
