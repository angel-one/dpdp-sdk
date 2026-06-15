<script>import ConsentIcon from "../../common/icons/consent-icon.svelte";
export let section;
</script>

<div class="dpdp-purpose-section">
	<ConsentIcon name={section.icon} />
	<div class="dpdp-purpose-section__content">
		<p class="dpdp-purpose-section__title">{section.title}</p>
		<p class="dpdp-purpose-section__description">{section.description}</p>
	</div>
</div>
