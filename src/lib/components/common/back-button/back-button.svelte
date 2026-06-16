<script lang="ts">
	import ChevronLeftIcon from '$lib/components/common/icons/chevron-left-icon.svelte';

	export let label = 'Go back';
	export let onClick: (() => void) | undefined = undefined;
</script>

<button type="button" class="dpdp-back-btn" aria-label={label} on:click={onClick}>
	<ChevronLeftIcon />
</button>
