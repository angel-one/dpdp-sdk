<script lang="ts">
	import { scrollLock } from '$lib/actions/scroll-lock';
	import { focusTrap } from '$lib/actions/focus-trap';
	import BackButton from '$lib/components/common/back-button/back-button.svelte';
	import IconButton from '$lib/components/common/icon-button/icon-button.svelte';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let titleId = '';
	export let subtitleId: string | undefined = undefined;
	export let dismissible = false;
	export let onClose: (() => void) | undefined = undefined;
	export let onBack: (() => void) | undefined = undefined;
	export let backLabel = 'Go back';

	let sheetBodyEl: HTMLDivElement | undefined = undefined;
	let reduceMotion = false;

	export function getSheetBodyElement() {
		return sheetBodyEl;
	}

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;

		if (onBack) {
			onBack();
			return;
		}

		if (dismissible) {
			onClose?.();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	use:scrollLock
	class="dpdp-sheet-overlay"
	role="presentation"
	transition:fade={{ duration: reduceMotion ? 0 : 150 }}
>
	<div
		use:focusTrap
		class="dpdp-sheet"
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleId}
		aria-describedby={subtitleId}
		transition:fly={{ y: reduceMotion ? 0 : 320, duration: reduceMotion ? 0 : 250 }}
	>
		<div class="dpdp-sheet__header">
			<div class="dpdp-sheet__header-start">
				{#if onBack}
					<div
						class="dpdp-sheet__back"
						in:fade={{ duration: reduceMotion ? 0 : 200 }}
						out:fade={{ duration: reduceMotion ? 0 : 150 }}
					>
						<BackButton label={backLabel} onClick={onBack} />
					</div>
				{/if}
				<slot name="header" />
			</div>
			{#if onClose && dismissible}
				<IconButton label="Close consent sheet" onClick={onClose} />
			{/if}
		</div>

		<div class="dpdp-sheet__body" bind:this={sheetBodyEl}>
			<slot />
		</div>

		{#if $$slots.footer}
			<div class="dpdp-sheet__footer">
				<slot name="footer" />
			</div>
		{/if}
	</div>
</div>
