<script>import ConsentPurposeCard from "../consent-purpose-card/consent-purpose-card.svelte";
export let purposes = [];
export let selectedIds = /* @__PURE__ */ new Set();
export let errorPurposeIds = /* @__PURE__ */ new Set();
export let onToggleSelect = void 0;
export let onViewDetail = void 0;
</script>

<div class="dpdp-purpose-list" role="list" aria-label="Consent purposes">
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
