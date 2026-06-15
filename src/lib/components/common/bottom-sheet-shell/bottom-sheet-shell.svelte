<script lang="ts">
	import { focusTrap } from '$lib/actions/focus-trap';
	import BackButton from '$lib/components/common/back-button/back-button.svelte';
	import IconButton from '$lib/components/common/icon-button/icon-button.svelte';

	export let titleId = '';
	export let onClose: (() => void) | undefined = undefined;
	export let onBack: (() => void) | undefined = undefined;
	export let backLabel = 'Go back';

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (onBack) {
				onBack();
				return;
			}
			onClose?.();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed inset-0 z-50 flex items-end bg-black/40" role="presentation">
	<div
		use:focusTrap
		class="flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-white shadow-[0px_-2px_4px_rgba(138,141,153,0.16)]"
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleId}
	>
		<div class="flex items-center justify-between border-b border-gray-200 px-4 py-3">
			<div class="flex min-w-0 flex-1 items-center gap-2">
				{#if onBack}
					<BackButton label={backLabel} onClick={onBack} />
				{/if}
				<slot name="header" />
			</div>
			{#if onClose}
				<IconButton label="Close consent sheet" onClick={onClose} />
			{/if}
		</div>

		<div class="flex-1 overflow-y-auto px-4 py-4">
			<slot />
		</div>

		{#if $$slots.footer}
			<div class="border-t border-gray-200 px-4 py-4">
				<slot name="footer" />
			</div>
		{/if}
	</div>
</div>
