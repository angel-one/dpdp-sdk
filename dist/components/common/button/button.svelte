<script>export let variant = "primary";
export let label = "";
export let inactive = false;
export let fullWidth = true;
export let ariaDescribedBy = void 0;
export let onClick = void 0;
</script>

<button
	type="button"
	class="dpdp-btn dpdp-btn--{variant}"
	class:dpdp-btn--inactive={inactive}
	class:dpdp-btn--full-width={fullWidth}
	aria-disabled={inactive}
	aria-describedby={ariaDescribedBy}
	on:click={onClick}
>
	<slot>{label}</slot>
</button>
