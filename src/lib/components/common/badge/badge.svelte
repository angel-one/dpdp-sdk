<script lang="ts">
	type BadgeVariant = 'mandatory' | 'optional';

	export let label = '';
	export let variant: BadgeVariant = 'mandatory';

	$: variantClasses =
		variant === 'mandatory' ? 'bg-blue-50 text-primary' : 'bg-gray-100 text-gray-600';
</script>

<span class="rounded px-2 py-0.5 text-xs font-medium {variantClasses}">
	{label}
</span>
