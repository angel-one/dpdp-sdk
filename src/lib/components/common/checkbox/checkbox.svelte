<script lang="ts">
	export let checked = false;
	export let disabled = false;
	export let label = '';
	export let onChange: (() => void) | undefined = undefined;
</script>

<input
	type="checkbox"
	{checked}
	{disabled}
	on:change={onChange}
	aria-label={label}
	class="dpdp-checkbox"
/>
