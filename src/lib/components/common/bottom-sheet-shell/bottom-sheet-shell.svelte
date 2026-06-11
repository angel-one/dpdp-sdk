<script lang="ts">
	import { focusTrap } from '$lib/actions/focus-trap';
	import BackButton from '$lib/components/common/back-button/back-button.svelte';
	import IconButton from '$lib/components/common/icon-button/icon-button.svelte';
	import type { Snippet } from 'svelte';

	interface BottomSheetShellProps {
		titleId: string;
		onClose?: () => void;
		onBack?: () => void;
		backLabel?: string;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let { titleId, onClose, onBack, backLabel, header, footer, children }: BottomSheetShellProps =
		$props();

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

<svelte:window onkeydown={handleKeydown} />

<div class="fixed inset-0 z-50 flex items-end bg-black/40" role="presentation">
	<div
		use:focusTrap
		class="flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-surface shadow-top"
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleId}
	>
		<div class="flex items-center justify-between border-b border-border px-4 py-3">
			<div class="flex min-w-0 flex-1 items-center gap-2">
				{#if onBack}
					<BackButton label={backLabel} onclick={onBack} />
				{/if}
				{#if header}
					<div class="min-w-0 flex-1">
						{@render header()}
					</div>
				{/if}
			</div>
			{#if onClose}
				<IconButton label="Close consent sheet" onclick={onClose} />
			{/if}
		</div>

		<div class="flex-1 overflow-y-auto px-4 py-4">
			{@render children()}
		</div>

		{#if footer}
			<div class="border-t border-border px-4 py-4">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
