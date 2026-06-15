<script>export let label = "Go back";
export let onClick = void 0;
</script>

<button
	type="button"
	class="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f5bd9]"
	aria-label={label}
	on:click={onClick}
>
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
		<path
			d="M10 3L5 8l5 5"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>
