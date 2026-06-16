<script lang="ts">
	import TranslateIcon from '$lib/components/common/icons/translate-icon.svelte';
	import SoundIcon from '$lib/components/common/icons/sound-icon.svelte';
	import ChevronDownIcon from '$lib/components/common/icons/chevron-down-icon.svelte';
	import { getLanguageLabel } from './consent-top-nav.logic';

	export let language: string;
	export let centered = false;

	$: label = getLanguageLabel(language);
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

		<button class="dpdp-consent-top-nav__sound" type="button" aria-label="Play audio">
			<SoundIcon />
		</button>
	</div>
</div>
