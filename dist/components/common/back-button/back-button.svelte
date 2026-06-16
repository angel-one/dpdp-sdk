<script>import ChevronLeftIcon from "../icons/chevron-left-icon.svelte";
export let label = "Go back";
export let onClick = void 0;
</script>

<button type="button" class="dpdp-back-btn" aria-label={label} on:click={onClick}>
	<ChevronLeftIcon />
</button>
