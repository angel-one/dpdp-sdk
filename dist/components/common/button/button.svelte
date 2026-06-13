<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonVariant = 'primary' | 'secondary';

	interface ButtonProps {
		variant?: ButtonVariant;
		label: string;
		inactive?: boolean;
		fullWidth?: boolean;
		ariaDescribedBy?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		label,
		inactive = false,
		fullWidth = true,
		ariaDescribedBy,
		onclick,
		children
	}: ButtonProps = $props();

	const baseClasses =
		'rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
	const widthClass = $derived(fullWidth ? 'w-full' : '');
	const variantClasses = $derived(
		variant === 'primary'
			? inactive
				? 'cursor-not-allowed bg-disabled-bg text-disabled-text'
				: 'bg-primary text-primary-foreground'
			: inactive
				? 'cursor-not-allowed border border-border text-disabled-text'
				: 'border border-primary text-primary'
	);
</script>

<button
	type="button"
	class="{baseClasses} {widthClass} {variantClasses}"
	aria-disabled={inactive}
	aria-describedby={ariaDescribedBy}
	{onclick}
>
	{#if children}
		{@render children()}
	{:else}
		{label}
	{/if}
</button>
