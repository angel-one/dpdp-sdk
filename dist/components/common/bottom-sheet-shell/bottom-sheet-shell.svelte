<script>import { focusTrap } from "../../../actions/focus-trap";
import BackButton from "../back-button/back-button.svelte";
import IconButton from "../icon-button/icon-button.svelte";
export let titleId = "";
export let onClose = void 0;
export let onBack = void 0;
export let backLabel = "Go back";
function handleKeydown(event) {
  if (event.key === "Escape") {
    if (onBack) {
      onBack();
      return;
    }
    onClose?.();
  }
}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="dpdp-sheet-overlay" role="presentation">
	<div
		use:focusTrap
		class="dpdp-sheet"
		role="dialog"
		aria-modal="true"
		aria-labelledby={titleId}
	>
		<div class="dpdp-sheet__header">
			<div class="dpdp-sheet__header-start">
				{#if onBack}
					<BackButton label={backLabel} onClick={onBack} />
				{/if}
				<slot name="header" />
			</div>
			{#if onClose}
				<IconButton label="Close consent sheet" onClick={onClose} />
			{/if}
		</div>

		<div class="dpdp-sheet__body">
			<slot />
		</div>

		{#if $$slots.footer}
			<div class="dpdp-sheet__footer">
				<slot name="footer" />
			</div>
		{/if}
	</div>
</div>
