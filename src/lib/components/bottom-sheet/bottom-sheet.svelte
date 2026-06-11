<script lang="ts">
	import { untrack } from 'svelte';
	import type { IConsentItem, IConsentUiResponse } from '$lib/types';

	interface BottomSheetProps {
		data: IConsentUiResponse;
		onAcceptAll?: () => void;
		onAcceptSelected?: (selectedIds: string[]) => void;
		onClose?: () => void;
	}

	let { data, onAcceptAll, onAcceptSelected, onClose }: BottomSheetProps = $props();

	const title = $derived(data.title ?? 'Your Data, your Control');
	const introText = $derived(
		data.introText ??
			'We process your personal data for specific purposes to provide our services and comply with legal obligations. You can review details for each purpose and manage your preferences anytime.'
	);
	const consents = $derived(data.consents ?? []);

	let expandedIds = $state(new Set<string>());
	// Seed selection from the initial payload only; user toggles own it afterwards.
	let selectedIds = $state(
		untrack(
			() =>
				new Set<string>(
					(data.consents ?? [])
						.filter((item) => item.mandatory || item.checked)
						.map((item) => item.id)
				)
		)
	);

	function toggleExpanded(id: string) {
		const next = new Set(expandedIds);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		expandedIds = next;
	}

	function toggleSelected(item: IConsentItem) {
		if (item.mandatory) return;

		const next = new Set(selectedIds);
		if (next.has(item.id)) {
			next.delete(item.id);
		} else {
			next.add(item.id);
		}
		selectedIds = next;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') onClose?.();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="fixed inset-0 z-50 flex items-end bg-black/40" role="presentation">
	<div
		class="flex max-h-[90dvh] w-full flex-col rounded-t-2xl bg-white shadow-top"
		role="dialog"
		aria-modal="true"
		aria-labelledby="consent-title"
	>
		<div class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
			<div class="flex items-center gap-2 text-sm text-gray-600">
				<span class="rounded border border-gray-200 px-2 py-1">English</span>
			</div>
			<button
				type="button"
				class="text-sm text-gray-500"
				onclick={() => onClose?.()}
				aria-label="Close consent sheet"
			>
				✕
			</button>
		</div>

		<div class="flex-1 overflow-y-auto px-4 py-4">
			<h2 id="consent-title" class="text-lg font-semibold text-gray-900">{title}</h2>
			<p class="mt-2 text-sm leading-6 text-gray-600">{introText}</p>

			<div class="mt-4 space-y-3">
				{#each consents as item (item.id)}
					<div class="rounded-xl border border-gray-200">
						<div class="flex items-start gap-3 px-4 py-3">
							<input
								type="checkbox"
								checked={selectedIds.has(item.id)}
								disabled={item.mandatory}
								onchange={() => toggleSelected(item)}
								aria-label={`Toggle ${item.title}`}
								class="mt-1 h-4 w-4 rounded border-gray-300 text-primary"
							/>
							<button
								type="button"
								class="flex flex-1 items-start gap-2 text-left"
								aria-expanded={expandedIds.has(item.id)}
								onclick={() => toggleExpanded(item.id)}
							>
								<span class="flex flex-1 items-center gap-2">
									<span class="text-sm font-medium text-gray-900">{item.title}</span>
									{#if item.mandatory}
										<span class="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-primary">
											Mandatory
										</span>
									{/if}
								</span>
								<span class="text-gray-400">{expandedIds.has(item.id) ? '▾' : '▸'}</span>
							</button>
						</div>

						{#if expandedIds.has(item.id) && item.sections?.length}
							<div class="space-y-3 border-t border-gray-100 px-4 py-3">
								{#each item.sections as section (section.title)}
									<div>
										<p class="text-sm font-medium text-gray-900">{section.title}</p>
										<p class="mt-1 text-sm leading-6 text-gray-600">{section.content}</p>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-2 border-t border-gray-100 px-4 py-4">
			<button
				type="button"
				class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white"
				onclick={() => onAcceptAll?.()}
			>
				Accept All
			</button>
			<button
				type="button"
				class="w-full rounded-lg border border-primary px-4 py-3 text-sm font-semibold uppercase tracking-wide text-primary"
				onclick={() => onAcceptSelected?.(Array.from(selectedIds))}
			>
				Accept Selected
			</button>
		</div>
	</div>
</div>
