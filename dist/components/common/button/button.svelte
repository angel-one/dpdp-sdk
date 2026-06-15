<script>export let variant = "primary";
export let label = "";
export let inactive = false;
export let fullWidth = true;
export let ariaDescribedBy = void 0;
export let onClick = void 0;
const baseClasses = "rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f5bd9]";
$: widthClass = fullWidth ? "w-full" : "";
$: variantClasses = variant === "primary" ? inactive ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-primary text-white" : inactive ? "cursor-not-allowed border border-gray-200 text-gray-400" : "border border-primary text-primary";
</script>

<button
	type="button"
	class="{baseClasses} {widthClass} {variantClasses}"
	aria-disabled={inactive}
	aria-describedby={ariaDescribedBy}
	on:click={onClick}
>
	<slot>{label}</slot>
</button>
