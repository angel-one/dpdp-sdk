<script lang="ts">
	import ConsentIcon from '$lib/components/common/icons/consent-icon.svelte';
	import type { IConsentPurposeSection } from '$lib/types';

	export let section: IConsentPurposeSection;
</script>

<div class="dpdp-purpose-section">
	<ConsentIcon name={section.icon} />
	<div class="dpdp-purpose-section__content">
		<p class="dpdp-purpose-section__title">{section.title}</p>
		<p class="dpdp-purpose-section__description">{section.description}</p>
	</div>
</div>
