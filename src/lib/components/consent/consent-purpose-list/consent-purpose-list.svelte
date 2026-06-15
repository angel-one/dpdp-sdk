<script lang="ts">
	import ConsentPurposeCard from '$lib/components/consent/consent-purpose-card/consent-purpose-card.svelte';
	import type { IConsentPurpose } from '$lib/types';

	export let purposes: IConsentPurpose[] = [];
	export let selectedIds: Set<string> = new Set();
	export let errorPurposeIds: Set<string> = new Set();
	export let onToggleSelect: ((purposeId: string, locked: boolean) => void) | undefined = undefined;
	export let onViewDetail: ((purposeId: string) => void) | undefined = undefined;
</script>

<div class="mt-4 space-y-3" role="list" aria-label="Consent purposes">
	{#each purposes as purpose (purpose.id)}
		<div role="listitem">
			<ConsentPurposeCard
				{purpose}
				selected={selectedIds.has(purpose.id)}
				showError={errorPurposeIds.has(purpose.id)}
				onToggleSelect={() => onToggleSelect?.(purpose.id, purpose.locked)}
				onViewDetail={() => onViewDetail?.(purpose.id)}
			/>
		</div>
	{/each}
</div>
