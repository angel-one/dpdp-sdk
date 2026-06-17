<script lang="ts">
	import TranslateIcon from '$lib/components/common/icons/translate-icon.svelte';
	import SoundIcon from '$lib/components/common/icons/sound-icon.svelte';
	import ChevronDownIcon from '$lib/components/common/icons/chevron-down-icon.svelte';
	import CheckIcon from '$lib/components/common/icons/check-icon.svelte';
	import type { IConsentLanguage } from '$lib/types';
	import { getLanguageOptions, resolveLanguageLabel } from './consent-top-nav.logic';
	import { onDestroy } from 'svelte';

	export let language: string;
	export let languages: IConsentLanguage[] | undefined = undefined;
	export let centered = false;
	export let disabled = false;
	export let isSpeaking = false;
	export let playAudioLabel = 'Play audio';
	export let stopAudioLabel = 'Stop audio';
	export let onPlayAudio: (() => void) | undefined = undefined;
	export let onLanguageChange: ((languageCode: string) => void | Promise<void>) | undefined =
		undefined;

	let menuOpen = false;
	let langWrapEl: HTMLDivElement | undefined;
	let menuId = `dpdp-lang-menu-${Math.random().toString(36).slice(2, 9)}`;
	let removeListeners: (() => void) | undefined;

	$: options = getLanguageOptions(languages, language);
	$: label = resolveLanguageLabel(language, languages);
	$: soundAriaLabel = isSpeaking ? stopAudioLabel : playAudioLabel;
	$: canChangeLanguage = options.length > 1 && !disabled && !!onLanguageChange;

	function closeMenu() {
		menuOpen = false;
	}

	function toggleMenu() {
		if (!canChangeLanguage) return;
		menuOpen = !menuOpen;
	}

	function handleLanguageSelect(code: string) {
		closeMenu();
		if (code.trim().toLowerCase() === language.trim().toLowerCase()) return;
		void onLanguageChange?.(code);
	}

	$: {
		removeListeners?.();
		removeListeners = undefined;

		if (menuOpen && typeof document !== 'undefined') {
			const onClick = (event: MouseEvent) => {
				if (!langWrapEl?.contains(event.target as Node)) {
					closeMenu();
				}
			};
			const onKeydown = (event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					event.preventDefault();
					closeMenu();
				}
			};

			document.addEventListener('click', onClick, true);
			document.addEventListener('keydown', onKeydown);
			removeListeners = () => {
				document.removeEventListener('click', onClick, true);
				document.removeEventListener('keydown', onKeydown);
			};
		}
	}

	onDestroy(() => {
		removeListeners?.();
	});
</script>

<div
	class="dpdp-consent-top-nav"
	class:dpdp-consent-top-nav--centered={centered}
	aria-label="Consent navigation"
>
	<div class="dpdp-consent-top-nav__group">
		<div class="dpdp-consent-top-nav__lang-wrap" bind:this={langWrapEl}>
			<button
				class="dpdp-consent-top-nav__lang"
				type="button"
				aria-label="Select language"
				aria-haspopup="listbox"
				aria-expanded={menuOpen}
				aria-controls={menuId}
				disabled={!canChangeLanguage}
				on:click|stopPropagation={toggleMenu}
			>
				<span class="dpdp-consent-top-nav__lang-icon">
					<TranslateIcon />
				</span>
				<span class="dpdp-consent-top-nav__lang-text">{label}</span>
				{#if canChangeLanguage}
					<span class="dpdp-consent-top-nav__chevron" class:dpdp-consent-top-nav__chevron--open={menuOpen}>
						<ChevronDownIcon />
					</span>
				{/if}
			</button>

			{#if menuOpen && canChangeLanguage}
				<div
					id={menuId}
					class="dpdp-consent-top-nav__lang-menu"
					role="listbox"
					aria-label="Languages"
				>
					{#each options as option (option.code)}
						{@const selected = option.code.trim().toLowerCase() === language.trim().toLowerCase()}
						<button
							class="dpdp-consent-top-nav__lang-option"
							class:dpdp-consent-top-nav__lang-option--selected={selected}
							type="button"
							role="option"
							aria-selected={selected}
							on:click={() => handleLanguageSelect(option.code)}
						>
							<span class="dpdp-consent-top-nav__lang-option-label">{option.label}</span>
							{#if selected}
								<span class="dpdp-consent-top-nav__lang-option-check" aria-hidden="true">
									<CheckIcon />
								</span>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<button
			class="dpdp-consent-top-nav__sound"
			class:dpdp-consent-top-nav__sound--active={isSpeaking}
			type="button"
			aria-label={soundAriaLabel}
			aria-pressed={isSpeaking}
			{disabled}
			on:click={onPlayAudio}
		>
			<SoundIcon />
		</button>
	</div>
</div>
