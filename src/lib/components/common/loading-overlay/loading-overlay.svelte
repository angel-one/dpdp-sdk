<script lang="ts">
	export let message = 'Loading consent...';
</script>

<div class="dpdp-loading-overlay" role="status" aria-live="polite" aria-busy="true">
	<div class="dpdp-loading-overlay__content">
		<span class="dpdp-spinner" aria-hidden="true"></span>
		<p class="dpdp-loading-overlay__message">{message}</p>
	</div>
</div>
