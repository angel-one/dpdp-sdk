<script lang="ts">
	type BadgeVariant = 'mandatory' | 'optional';

	export let label = '';
	export let variant: BadgeVariant = 'mandatory';
</script>

<span class="dpdp-badge dpdp-badge--{variant}">
	{label}
</span>
