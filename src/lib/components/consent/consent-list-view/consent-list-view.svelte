<script lang="ts">
	import ConsentPurposeList from '$lib/components/consent/consent-purpose-list/consent-purpose-list.svelte';
	import type { IConsentNotice, IConsentPurpose } from '$lib/types';

	export let notice: IConsentNotice;
	export let purposes: IConsentPurpose[] = [];
	export let selectedIds: Set<string> = new Set();
	export let errorPurposeIds: Set<string> = new Set();
	export let titleId = '';
	export let subtitleId = '';
	export let onToggleSelect: ((purposeId: string, locked: boolean) => void) | undefined = undefined;
	export let onViewDetail: ((purposeId: string) => void) | undefined = undefined;
</script>

<h2 id={titleId} class="dpdp-list-view__title">{notice.title}</h2>
<p id={subtitleId} class="dpdp-list-view__subtitle">{notice.subtitle}</p>

<ConsentPurposeList
	{purposes}
	{selectedIds}
	{errorPurposeIds}
	{onToggleSelect}
	{onViewDetail}
/>
