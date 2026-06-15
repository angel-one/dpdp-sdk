<script>import Button from "../../common/button/button.svelte";
import { isSecondaryInactive } from "./consent-button-bar.logic";
export let actionSet;
export let inactive = false;
export let onAction = void 0;
$: secondaryInactive = isSecondaryInactive(inactive, actionSet.secondary?.action);
</script>

<div class="dpdp-button-bar" role="group" aria-label="Consent actions">
	<Button
		variant="primary"
		label={actionSet.primary.label}
		{inactive}
		onClick={() => onAction?.(actionSet.primary.action)}
	/>

	{#if actionSet.secondary}
		<Button
			variant="secondary"
			label={actionSet.secondary.label}
			inactive={secondaryInactive}
			onClick={() => actionSet.secondary && onAction?.(actionSet.secondary.action)}
		/>
	{/if}
</div>
