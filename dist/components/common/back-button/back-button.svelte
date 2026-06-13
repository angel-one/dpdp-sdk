<script lang="ts">
	interface BackButtonProps {
		label?: string;
		onclick?: () => void;
	}

	let { label = 'Go back', onclick }: BackButtonProps = $props();
</script>

<button
	type="button"
	class="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
	aria-label={label}
	{onclick}
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
