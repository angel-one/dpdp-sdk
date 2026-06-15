<script>import { dpdp } from "..";
import BottomSheet from "../components/bottom-sheet/bottom-sheet.svelte";
import ErrorBanner from "../components/common/error-banner/error-banner.svelte";
import LoadingOverlay from "../components/common/loading-overlay/loading-overlay.svelte";
import { ConsentStore } from "../stores/consent.store";
async function handleSubmit(payload) {
  await dpdp.submitConsent(payload);
}
function handleClose() {
  dpdp.closeConsent();
}
</script>

{#if $ConsentStore.hydrated && $ConsentStore.data}
	<BottomSheet data={$ConsentStore.data} onSubmit={handleSubmit} onClose={handleClose} />
{/if}

{#if $ConsentStore.loading}
	<LoadingOverlay />
{/if}

{#if $ConsentStore.error}
	<ErrorBanner message={$ConsentStore.error} />
{/if}
