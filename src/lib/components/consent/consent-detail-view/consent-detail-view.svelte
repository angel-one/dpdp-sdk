<script lang="ts">
	import ConsentPurposeSection from '$lib/components/consent/consent-purpose-section/consent-purpose-section.svelte';
	import { getDetailTitle, getStaticTextEntries } from './consent-detail-view.logic';
	import type { IConsentPurpose, IConsentStaticText } from '$lib/types';

	export let purpose: IConsentPurpose;
	export let staticText: IConsentStaticText;

	$: title = getDetailTitle(purpose);
	$: staticTextEntries = getStaticTextEntries(staticText);
	$: titleId = `consent-detail-title-${purpose.id}`;
</script>

<article aria-labelledby={titleId}>
	<h2 id={titleId} class="text-lg font-semibold text-gray-900">{title}</h2>

	{#if purpose.description}
		<p class="mt-2 text-sm leading-6 text-gray-600">{purpose.description}</p>
	{/if}

	<div class="mt-6 space-y-5">
		{#each purpose.sections as section (section.key)}
			<ConsentPurposeSection {section} />
		{/each}
	</div>

	{#if staticTextEntries.length}
		<div class="mt-6 space-y-2 border-t border-gray-200 pt-4">
			{#each staticTextEntries as entry (entry.key)}
				<p class="text-xs leading-5 text-gray-600">{entry.text}</p>
			{/each}
		</div>
	{/if}
</article>
