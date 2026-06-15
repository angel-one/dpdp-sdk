<script lang="ts">
	export let label = '';
	export let onClick: (() => void) | undefined = undefined;
</script>

<button type="button" class="dpdp-icon-btn" aria-label={label} on:click={onClick}>
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
		<path
			d="M3 3l8 8M11 3L3 11"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>
</button>
