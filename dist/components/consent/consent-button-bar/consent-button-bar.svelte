<script lang="ts">
	import Button from '../../common/button/button.svelte';
	import { isSecondaryInactive } from './consent-button-bar.logic';
	import type { ConsentButtonAction, IConsentActionSet } from '../../../types';

	interface ConsentButtonBarProps {
		actionSet: IConsentActionSet;
		inactive: boolean;
		onAction: (action: ConsentButtonAction) => void;
	}

	let { actionSet, inactive, onAction }: ConsentButtonBarProps = $props();

	const secondaryInactive = $derived(
		isSecondaryInactive(inactive, actionSet.secondary?.action)
	);
</script>

<div class="space-y-2" role="group" aria-label="Consent actions">
	<Button
		variant="primary"
		label={actionSet.primary.label}
		{inactive}
		onclick={() => onAction(actionSet.primary.action)}
	/>

	{#if actionSet.secondary}
		<Button
			variant="secondary"
			label={actionSet.secondary.label}
			inactive={secondaryInactive}
			onclick={() => onAction(actionSet.secondary!.action)}
		/>
	{/if}
</div>
