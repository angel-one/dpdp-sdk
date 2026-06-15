<script lang="ts">
	import ConsentIcon from '$lib/components/common/icons/consent-icon.svelte';
	import type { IConsentPurposeSection } from '$lib/types';

	export let section: IConsentPurposeSection;
</script>

<div class="flex gap-3">
	<ConsentIcon name={section.icon} />
	<div class="min-w-0">
		<p class="text-sm font-medium text-gray-900">{section.title}</p>
		<p class="mt-1 text-sm leading-6 text-gray-600">{section.description}</p>
	</div>
</div>
