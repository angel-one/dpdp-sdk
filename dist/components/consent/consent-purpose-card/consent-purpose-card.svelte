<script>import Badge from "../../common/badge/badge.svelte";
import Card from "../../common/card/card.svelte";
import Checkbox from "../../common/checkbox/checkbox.svelte";
import ChevronDownIcon from "../../common/icons/chevron-down-icon.svelte";
import { getBadgeVariant, getCheckboxLabel } from "./consent-purpose-card.logic";
import { getPurposeSummaryBullets } from "../../../utils";
export let purpose;
export let selected = false;
export let showError = false;
export let mandatoryErrorMessage = "";
export let onToggleSelect = void 0;
export let onViewDetail = void 0;
$: summaryBullets = getPurposeSummaryBullets(purpose);
function handleCardKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onViewDetail?.();
}
</script>

<Card error={showError}>
	<div
		class="dpdp-purpose-card"
		tabindex="0"
		aria-label="View details for {purpose.name}"
		aria-haspopup="dialog"
		on:click={onViewDetail}
		on:keydown={handleCardKeydown}
	>
		<div class="dpdp-purpose-card__header">
			<div class="dpdp-purpose-card__main" on:click|stopPropagation on:keydown|stopPropagation>
				<Checkbox
					checked={selected}
					disabled={purpose.locked}
					label={getCheckboxLabel(purpose)}
					onChange={onToggleSelect}
				/>
				<span class="dpdp-purpose-card__title">{purpose.name}</span>
				<Badge label={purpose.badge} variant={getBadgeVariant(purpose)} />
			</div>

			<span class="dpdp-purpose-card__chevron-btn" aria-hidden="true">
				<ChevronDownIcon />
			</span>
		</div>

		{#if summaryBullets.length}
			<ul class="dpdp-purpose-card__bullets">
				{#each summaryBullets as bullet (bullet)}
					<li>{bullet}</li>
				{/each}
			</ul>
		{/if}

		{#if showError}
			<p class="dpdp-purpose-card__error" role="alert" data-dpdp-validation-error tabindex="-1">
				{mandatoryErrorMessage}
			</p>
		{/if}
	</div>
</Card>
