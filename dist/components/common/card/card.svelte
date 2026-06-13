<script lang="ts">
	import type { Snippet } from 'svelte';

	interface CardProps {
		error?: boolean;
		children: Snippet;
	}

	let { error = false, children }: CardProps = $props();
</script>

<div
	class="rounded-xl border bg-surface transition-colors {error
		? 'border-border-error bg-red-50/30'
		: 'border-border'}"
>
	{@render children()}
</div>
