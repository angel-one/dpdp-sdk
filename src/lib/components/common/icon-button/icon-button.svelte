<script lang="ts">
	interface IconButtonProps {
		label: string;
		onclick?: () => void;
	}

	let { label, onclick }: IconButtonProps = $props();
</script>

<button
	type="button"
	class="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
	aria-label={label}
	{onclick}
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
