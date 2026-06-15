<script>import Badge from "../../common/badge/badge.svelte";
import Card from "../../common/card/card.svelte";
import Checkbox from "../../common/checkbox/checkbox.svelte";
import Chevron from "../../common/chevron/chevron.svelte";
import { getBadgeVariant, getCheckboxLabel } from "./consent-purpose-card.logic";
export let purpose;
export let selected = false;
export let showError = false;
export let mandatoryErrorMessage = "";
export let onToggleSelect = void 0;
export let onViewDetail = void 0;
</script>

<Card error={showError}>
	<div class="dpdp-purpose-card__row">
		<Checkbox
			checked={selected}
			disabled={purpose.locked}
			label={getCheckboxLabel(purpose)}
			onChange={onToggleSelect}
		/>

		<div class="dpdp-purpose-card__content">
			<button
				type="button"
				class="dpdp-purpose-card__detail-btn"
				aria-label="View details for {purpose.name}"
				aria-haspopup="dialog"
				on:click={onViewDetail}
			>
				<span class="dpdp-purpose-card__title-row">
					<span class="dpdp-purpose-card__title">{purpose.name}</span>
					<Badge label={purpose.badge} variant={getBadgeVariant(purpose)} />
				</span>
				<Chevron expanded={false} />
			</button>

			{#if purpose.bullets.length}
				<ul class="dpdp-purpose-card__bullets">
					{#each purpose.bullets as bullet (bullet)}
						<li>{bullet}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>

	{#if showError}
		<p class="dpdp-purpose-card__error" role="alert" data-dpdp-validation-error tabindex="-1">
			{mandatoryErrorMessage}
		</p>
	{/if}
</Card>
