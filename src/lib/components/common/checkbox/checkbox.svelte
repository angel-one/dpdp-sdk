<script lang="ts">
	import CheckIcon from '$lib/components/common/icons/check-icon.svelte';

	export let checked = false;
	export let disabled = false;
	export let label = '';
	export let onChange: (() => void) | undefined = undefined;
</script>

<label class="dpdp-checkbox-wrap">
	<input
		type="checkbox"
		{checked}
		{disabled}
		on:change={onChange}
		aria-label={label}
		class="dpdp-checkbox-input"
	/>
	<span
		class="dpdp-checkbox-box"
		class:dpdp-checkbox-box--checked={checked}
		class:dpdp-checkbox-box--locked={disabled}
		aria-hidden="true"
	>
		{#if checked}
			<CheckIcon />
		{/if}
	</span>
</label>
