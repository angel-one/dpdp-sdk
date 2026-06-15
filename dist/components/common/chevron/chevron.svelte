<script>export let expanded = false;
</script>

<span class="shrink-0 text-gray-600" aria-hidden="true">
	{#if expanded}
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M4 6l4 4 4-4"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{:else}
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M6 4l4 4-4 4"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	{/if}
</span>
