<script lang="ts">
	import Button from '$lib/components/common/button/button.svelte';
	import { isSecondaryInactive } from './consent-button-bar.logic';
	import type { ConsentButtonAction, IConsentActionSet } from '$lib/types';

	export let actionSet: IConsentActionSet;
	export let inactive = false;
	export let onAction: ((action: ConsentButtonAction) => void) | undefined = undefined;

	$: secondaryInactive = isSecondaryInactive(inactive, actionSet.secondary?.action);
</script>

<div class="space-y-2" role="group" aria-label="Consent actions">
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
