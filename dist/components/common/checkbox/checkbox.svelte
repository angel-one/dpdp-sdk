<script>export let checked = false;
export let disabled = false;
export let label = "";
export let onChange = void 0;
</script>

<input
	type="checkbox"
	{checked}
	{disabled}
	on:change={onChange}
	aria-label={label}
	class="mt-1 h-4 w-4 shrink-0 rounded border-gray-200 text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f5bd9] disabled:cursor-not-allowed disabled:opacity-60"
/>
