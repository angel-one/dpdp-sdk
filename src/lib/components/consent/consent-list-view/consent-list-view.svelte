<script lang="ts">
	import ConsentPurposeList from '$lib/components/consent/consent-purpose-list/consent-purpose-list.svelte';
	import type { IConsentNotice, IConsentPurpose } from '$lib/types';

	export let notice: IConsentNotice;
	export let purposes: IConsentPurpose[] = [];
	export let selectedIds: Set<string> = new Set();
	export let errorPurposeIds: Set<string> = new Set();
	export let titleId = '';
	export let onToggleSelect: ((purposeId: string, locked: boolean) => void) | undefined = undefined;
	export let onViewDetail: ((purposeId: string) => void) | undefined = undefined;
</script>

<h2 id={titleId} class="text-lg font-semibold text-gray-900">{notice.title}</h2>
<p class="mt-2 text-sm leading-6 text-gray-600">{notice.subtitle}</p>

<ConsentPurposeList
	{purposes}
	{selectedIds}
	{errorPurposeIds}
	{onToggleSelect}
	{onViewDetail}
/>
