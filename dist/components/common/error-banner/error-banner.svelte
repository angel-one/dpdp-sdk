<script>export let message = "";
export let onDismiss = void 0;
</script>

<div class="dpdp-error-banner" role="alert" aria-live="assertive">
	<p class="dpdp-error-banner__message">{message}</p>
	{#if onDismiss}
		<button type="button" class="dpdp-error-banner__dismiss" on:click={onDismiss}>Dismiss</button>
	{/if}
</div>
