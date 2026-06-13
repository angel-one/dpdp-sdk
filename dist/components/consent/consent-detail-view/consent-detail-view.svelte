<script lang="ts">
	import ConsentPurposeSection from '../consent-purpose-section/consent-purpose-section.svelte';
	import { getDetailTitle, getStaticTextEntries } from './consent-detail-view.logic';
	import type { IConsentPurpose, IConsentStaticText } from '../../../types';

	interface ConsentDetailViewProps {
		purpose: IConsentPurpose;
		staticText: IConsentStaticText;
	}

	let { purpose, staticText }: ConsentDetailViewProps = $props();

	const title = $derived(getDetailTitle(purpose));
	const staticTextEntries = $derived(getStaticTextEntries(staticText));
	const titleId = $derived(`consent-detail-title-${purpose.id}`);
</script>

<article aria-labelledby={titleId}>
	<h2 id={titleId} class="text-lg font-semibold text-text-primary">{title}</h2>

	{#if purpose.description}
		<p class="mt-2 text-sm leading-6 text-text-secondary">{purpose.description}</p>
	{/if}

	<div class="mt-6 space-y-5">
		{#each purpose.sections as section (section.key)}
			<ConsentPurposeSection {section} />
		{/each}
	</div>

	{#if staticTextEntries.length}
		<div class="mt-6 space-y-2 border-t border-border pt-4">
			{#each staticTextEntries as entry (entry.key)}
				<p class="text-xs leading-5 text-text-secondary">{entry.text}</p>
			{/each}
		</div>
	{/if}
</article>
