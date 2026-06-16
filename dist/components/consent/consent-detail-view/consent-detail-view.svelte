<script>import AccountIllustration from "../../common/icons/account-illustration.svelte";
import ConsentPurposeSection from "../consent-purpose-section/consent-purpose-section.svelte";
import { getPurposeSummary } from "../../../utils";
import { getDetailTitle, getStaticTextEntries } from "./consent-detail-view.logic";
export let purpose;
export let staticText;
$: title = getDetailTitle(purpose);
$: summary = getPurposeSummary(purpose);
$: staticTextEntries = getStaticTextEntries(staticText);
$: titleId = `consent-detail-title-${purpose.id}`;
$: sections = purpose.sections ?? [];
</script>

<article aria-labelledby={titleId}>
	<div class="dpdp-detail-view__hero">
		<AccountIllustration class="dpdp-detail-view__hero-img" />
		<h2 id={titleId} class="dpdp-detail-view__title">{title}</h2>
	</div>

	{#if summary}
		<p class="dpdp-detail-view__description">{summary}</p>
	{/if}

	<div class="dpdp-detail-view__sections">
		{#each sections as section, index (section.key)}
			<ConsentPurposeSection {section} showDivider={index < sections.length - 1} />
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
