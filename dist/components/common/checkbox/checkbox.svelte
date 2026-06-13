<script lang="ts">
	interface CheckboxProps {
		checked: boolean;
		disabled?: boolean;
		label: string;
		onchange?: () => void;
	}

	let { checked, disabled = false, label, onchange }: CheckboxProps = $props();
</script>

<input
	type="checkbox"
	{checked}
	{disabled}
	{onchange}
	aria-label={label}
	class="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
/>
