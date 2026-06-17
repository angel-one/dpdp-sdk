<script>import ConsentPurposeList from "../consent-purpose-list/consent-purpose-list.svelte";
import HeroIllustration from "../../common/icons/hero-illustration.svelte";
import { getStaticTextEntries } from "../consent-detail-view/consent-detail-view.logic";
export let notice;
export let purposes = [];
export let staticText = void 0;
export let selectedIds = /* @__PURE__ */ new Set();
export let selectedChannels = /* @__PURE__ */ new Map();
export let errorPurposeIds = /* @__PURE__ */ new Set();
export let titleId = "";
export let subtitleId = "";
export let mandatoryErrorMessage = "";
export let onToggleSelect = void 0;
export let onToggleChannel = void 0;
export let onViewDetail = void 0;
$: staticTextEntries = staticText ? getStaticTextEntries(staticText) : [];
</script>

<div class="dpdp-list-view__hero">
	<h2 id={titleId} class="dpdp-list-view__title">{notice.title}</h2>
	<HeroIllustration class="dpdp-list-view__hero-img" />
</div>

<p id={subtitleId} class="dpdp-list-view__subtitle">{notice.subtitle}</p>

<ConsentPurposeList
	{purposes}
	{selectedIds}
	{selectedChannels}
	{errorPurposeIds}
	{mandatoryErrorMessage}
	{onToggleSelect}
	{onToggleChannel}
	{onViewDetail}
/>

{#if staticTextEntries.length}
	<div class="dpdp-list-view__static">
		{#each staticTextEntries as entry (entry.key)}
			<p class="dpdp-list-view__static-text">{entry.text}</p>
		{/each}
	</div>
{/if}
