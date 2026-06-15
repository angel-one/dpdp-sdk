<script lang="ts">
	type ButtonVariant = 'primary' | 'secondary';

	export let variant: ButtonVariant = 'primary';
	export let label = '';
	export let inactive = false;
	export let fullWidth = true;
	export let ariaDescribedBy: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
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
