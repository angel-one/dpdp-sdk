<script lang="ts">
	import ConsentPurposeList from '$lib/components/consent/consent-purpose-list/consent-purpose-list.svelte';
	import type { IConsentNotice, IConsentPurpose } from '$lib/types';

	interface ConsentListViewProps {
		notice: IConsentNotice;
		purposes: IConsentPurpose[];
		selectedIds: Set<string>;
		errorPurposeIds: Set<string>;
		titleId: string;
		onToggleSelect: (purposeId: string, locked: boolean) => void;
		onViewDetail: (purposeId: string) => void;
	}

	let {
		notice,
		purposes,
		selectedIds,
		errorPurposeIds,
		titleId,
		onToggleSelect,
		onViewDetail
	}: ConsentListViewProps = $props();
</script>

<h2 id={titleId} class="text-lg font-semibold text-text-primary">{notice.title}</h2>
<p class="mt-2 text-sm leading-6 text-text-secondary">{notice.subtitle}</p>

<ConsentPurposeList
	{purposes}
	{selectedIds}
	{errorPurposeIds}
	onToggleSelect={onToggleSelect}
	onViewDetail={onViewDetail}
/>
