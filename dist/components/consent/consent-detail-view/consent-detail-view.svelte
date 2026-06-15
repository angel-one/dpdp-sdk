<script>import ConsentPurposeSection from "../consent-purpose-section/consent-purpose-section.svelte";
import { getDetailTitle, getStaticTextEntries } from "./consent-detail-view.logic";
export let purpose;
export let staticText;
$: title = getDetailTitle(purpose);
$: staticTextEntries = getStaticTextEntries(staticText);
$: titleId = `consent-detail-title-${purpose.id}`;
</script>

<article aria-labelledby={titleId}>
	<h2 id={titleId} class="dpdp-detail-view__title">{title}</h2>

	{#if purpose.description}
		<p class="dpdp-detail-view__description">{purpose.description}</p>
	{/if}

	<div class="dpdp-detail-view__sections">
		{#each purpose.sections as section (section.key)}
			<ConsentPurposeSection {section} />
		{/each}
	</div>

	{#if staticTextEntries.length}
		<div class="dpdp-detail-view__static">
			{#each staticTextEntries as entry (entry.key)}
				<p class="dpdp-detail-view__static-text">{entry.text}</p>
			{/each}
		</div>
	{/if}
</article>
