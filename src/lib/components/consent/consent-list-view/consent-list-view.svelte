<script lang="ts">
	import ConsentPurposeList from '$lib/components/consent/consent-purpose-list/consent-purpose-list.svelte';
	import HeroIllustration from '$lib/components/common/icons/hero-illustration.svelte';
	import { getStaticTextEntries } from '$lib/components/consent/consent-detail-view/consent-detail-view.logic';
	import type { IConsentNotice, IConsentPurpose, IConsentStaticText } from '$lib/types';

	export let notice: IConsentNotice;
	export let purposes: IConsentPurpose[] = [];
	export let staticText: IConsentStaticText | undefined = undefined;
	export let selectedIds: Set<string> = new Set();
	export let selectedChannels: Map<string, Set<string>> = new Map();
	export let errorPurposeIds: Set<string> = new Set();
	export let titleId = '';
	export let subtitleId = '';
	export let mandatoryErrorMessage = '';
	export let onToggleSelect: ((purposeId: string, locked: boolean) => void) | undefined = undefined;
	export let onToggleChannel:
		| ((purposeId: string, channelCode: string) => void)
		| undefined = undefined;
	export let onViewDetail: ((purposeId: string) => void) | undefined = undefined;

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
