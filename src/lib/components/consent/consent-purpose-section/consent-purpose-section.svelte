<script lang="ts">
	import ConsentIcon from '$lib/components/common/icons/consent-icon.svelte';
	import type { IConsentPurposeSection } from '$lib/types';

	interface ConsentPurposeSectionProps {
		section: IConsentPurposeSection;
	}

	let { section }: ConsentPurposeSectionProps = $props();
</script>

<div class="flex gap-3">
	<ConsentIcon name={section.icon} />
	<div class="min-w-0">
		<p class="text-sm font-medium text-text-primary">{section.title}</p>
		<p class="mt-1 text-sm leading-6 text-text-secondary">{section.description}</p>
	</div>
</div>
