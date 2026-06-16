<script>import TranslateIcon from "../../common/icons/translate-icon.svelte";
import SoundIcon from "../../common/icons/sound-icon.svelte";
import ChevronDownIcon from "../../common/icons/chevron-down-icon.svelte";
import { getLanguageLabel } from "./consent-top-nav.logic";
export let language;
export let centered = false;
export let isSpeaking = false;
export let playAudioLabel = "Play audio";
export let stopAudioLabel = "Stop audio";
export let onPlayAudio = void 0;
$: label = getLanguageLabel(language);
$: soundAriaLabel = isSpeaking ? stopAudioLabel : playAudioLabel;
</script>

<div
	class="dpdp-consent-top-nav"
	class:dpdp-consent-top-nav--centered={centered}
	aria-label="Consent navigation"
>
	<div class="dpdp-consent-top-nav__group">
		<button class="dpdp-consent-top-nav__lang" type="button" aria-label="Select language">
			<span class="dpdp-consent-top-nav__lang-icon">
				<TranslateIcon />
			</span>
			<span class="dpdp-consent-top-nav__lang-text">{label}</span>
			<span class="dpdp-consent-top-nav__chevron">
				<ChevronDownIcon />
			</span>
		</button>

		<button
			class="dpdp-consent-top-nav__sound"
			class:dpdp-consent-top-nav__sound--active={isSpeaking}
			type="button"
			aria-label={soundAriaLabel}
			aria-pressed={isSpeaking}
			on:click={onPlayAudio}
		>
			<SoundIcon />
		</button>
	</div>
</div>
