<script lang="ts">
	import '$lib/styles/dpdp.css';
	import { portal } from '$lib/actions/portal';
	import { dpdp } from '$lib';
	import BottomSheet from '$lib/components/bottom-sheet/bottom-sheet.svelte';
	import ErrorBanner from '$lib/components/common/error-banner/error-banner.svelte';
	import LoadingOverlay from '$lib/components/common/loading-overlay/loading-overlay.svelte';
	import { ConsentStore } from '$lib/stores/consent.store';
	import type { IConsentSubmitPayload } from '$lib/types';

	$: zIndexBase = $ConsentStore.uiOptions.zIndexBase ?? 9999;

	async function handleSubmit(payload: IConsentSubmitPayload) {
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
