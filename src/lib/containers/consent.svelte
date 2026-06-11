<script lang="ts">
	import { dpdp } from '$lib';
	import BottomSheet from '$lib/components/bottom-sheet/bottom-sheet.svelte';
	import ErrorBanner from '$lib/components/common/error-banner/error-banner.svelte';
	import LoadingOverlay from '$lib/components/common/loading-overlay/loading-overlay.svelte';
	import { ConsentStore } from '$lib/stores/consent.store';
	import type { IConsentSubmitPayload } from '$lib/types';

	async function handleSubmit(payload: IConsentSubmitPayload) {
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
