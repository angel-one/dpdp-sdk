<script>import "../styles/dpdp.css";
import { portal } from "../actions/portal";
import { dpdp } from "..";
import BottomSheet from "../components/bottom-sheet/bottom-sheet.svelte";
import ErrorBanner from "../components/common/error-banner/error-banner.svelte";
import LoadingOverlay from "../components/common/loading-overlay/loading-overlay.svelte";
import { ConsentStore } from "../stores/consent.store";
$: zIndexBase = $ConsentStore.uiOptions.zIndexBase ?? 9999;
async function handleSubmit(payload) {
  await dpdp.submitConsent(payload);
}
function handleClose() {
  dpdp.closeConsent();
}
function handleDismissError() {
  dpdp.setConsentError(null);
}
</script>

<div
	class="dpdp-root"
	use:portal={'body'}
	style:--dpdp-z-overlay={zIndexBase}
	style:--dpdp-z-banner={zIndexBase + 1}
	style:--dpdp-z-sheet={zIndexBase + 2}
>
	{#if $ConsentStore.hydrated && $ConsentStore.data}
		<BottomSheet data={$ConsentStore.data} onSubmit={handleSubmit} onClose={handleClose} />
	{/if}

	{#if $ConsentStore.loading}
		<LoadingOverlay />
	{/if}

	{#if $ConsentStore.error}
		<ErrorBanner message={$ConsentStore.error} onDismiss={handleDismissError} />
	{/if}
</div>
