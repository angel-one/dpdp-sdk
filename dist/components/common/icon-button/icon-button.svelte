<script>export let label = "";
export let onClick = void 0;
</script>

<button
	type="button"
	class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f5bd9]"
	aria-label={label}
	on:click={onClick}
>
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
		<path
			d="M3 3l8 8M11 3L3 11"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	</svg>
</button>
