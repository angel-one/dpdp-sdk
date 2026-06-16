<script lang="ts">
	import ConsentIcon from '$lib/components/common/icons/consent-icon.svelte';
	import type { IConsentPurposeSection } from '$lib/types';

	export let section: IConsentPurposeSection;
	export let showDivider = true;
</script>

<div class="dpdp-purpose-section">
	<div class="dpdp-purpose-section__header">
		<ConsentIcon name={section.icon} />
		<p class="dpdp-purpose-section__title">{section.title}</p>
	</div>
	<div class="dpdp-purpose-section__body">
		<p class="dpdp-purpose-section__description">{section.description}</p>
		{#if showDivider}
			<span class="dpdp-purpose-section__divider" aria-hidden="true"></span>
		{/if}
	</div>
</div>
