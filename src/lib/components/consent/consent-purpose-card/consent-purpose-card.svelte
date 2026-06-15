<script lang="ts">
	import Badge from '$lib/components/common/badge/badge.svelte';
	import Card from '$lib/components/common/card/card.svelte';
	import Checkbox from '$lib/components/common/checkbox/checkbox.svelte';
	import Chevron from '$lib/components/common/chevron/chevron.svelte';
	import { getBadgeVariant, getCheckboxLabel } from './consent-purpose-card.logic';
	import { MANDATORY_ERROR_MESSAGE } from '$lib/utils';
	import type { IConsentPurpose } from '$lib/types';

	export let purpose: IConsentPurpose;
	export let selected = false;
	export let showError = false;
	export let onToggleSelect: (() => void) | undefined = undefined;
	export let onViewDetail: (() => void) | undefined = undefined;
</script>

<Card error={showError}>
	<div class="flex items-start gap-3 px-4 py-3">
		<Checkbox
			checked={selected}
			disabled={purpose.locked}
			label={getCheckboxLabel(purpose)}
			onChange={onToggleSelect}
		/>

		<div class="min-w-0 flex-1">
			<button
				type="button"
				class="flex w-full items-start gap-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f5bd9]"
				aria-label="View details for {purpose.name}"
				on:click={onViewDetail}
			>
				<span class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
					<span class="text-sm font-medium text-gray-900">{purpose.name}</span>
					<Badge label={purpose.badge} variant={getBadgeVariant(purpose)} />
				</span>
				<Chevron expanded={false} />
			</button>

			{#if purpose.bullets.length}
				<ul class="mt-2 list-disc space-y-1 pl-4 text-sm leading-5 text-gray-600">
					{#each purpose.bullets as bullet (bullet)}
						<li>{bullet}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	{#if showError}
		<p class="px-4 pb-3 text-sm text-red-600" role="alert">{MANDATORY_ERROR_MESSAGE}</p>
	{/if}
</Card>
