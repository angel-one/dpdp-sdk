<script lang="ts">
	import ConsentPurposeCard from '../consent-purpose-card/consent-purpose-card.svelte';
	import type { IConsentPurpose } from '../../../types';

	interface ConsentPurposeListProps {
		purposes: IConsentPurpose[];
		selectedIds: Set<string>;
		errorPurposeIds: Set<string>;
		onToggleSelect: (purposeId: string, locked: boolean) => void;
		onViewDetail: (purposeId: string) => void;
	}

	let {
		purposes,
		selectedIds,
		errorPurposeIds,
		onToggleSelect,
		onViewDetail
	}: ConsentPurposeListProps = $props();
</script>

<div class="mt-4 space-y-3" role="list" aria-label="Consent purposes">
	{#each purposes as purpose (purpose.id)}
		<div role="listitem">
			<ConsentPurposeCard
				{purpose}
				selected={selectedIds.has(purpose.id)}
				showError={errorPurposeIds.has(purpose.id)}
				onToggleSelect={() => onToggleSelect(purpose.id, purpose.locked)}
				onViewDetail={() => onViewDetail(purpose.id)}
			/>
		</div>
	{/each}
</div>
