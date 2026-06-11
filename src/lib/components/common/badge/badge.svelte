<script lang="ts">
	type BadgeVariant = 'mandatory' | 'optional';

	interface BadgeProps {
		label: string;
		variant: BadgeVariant;
	}

	let { label, variant }: BadgeProps = $props();

	const variantClasses = $derived(
		variant === 'mandatory'
			? 'bg-badge-mandatory-bg text-badge-mandatory-text'
			: 'bg-badge-optional-bg text-badge-optional-text'
	);
</script>

<span class="rounded px-2 py-0.5 text-xs font-medium {variantClasses}">
	{label}
</span>
