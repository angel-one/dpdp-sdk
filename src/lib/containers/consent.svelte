<script lang="ts">
	import { dpdp } from '$lib';
	import BottomSheet from '$lib/components/bottom-sheet/bottom-sheet.svelte';
	import { ConsentStore } from '$lib/stores/consent.store';

	function handleAcceptAll() {
		dpdp.closeConsent();
	}

	function handleAcceptSelected() {
		dpdp.closeConsent();
	}

	function handleClose() {
		dpdp.closeConsent();
	}
</script>

{#if $ConsentStore.hydrated && $ConsentStore.data}
	<BottomSheet
		data={$ConsentStore.data}
		onAcceptAll={handleAcceptAll}
		onAcceptSelected={handleAcceptSelected}
		onClose={handleClose}
	/>
{/if}

{#if $ConsentStore.loading}
	<div class="fixed inset-0 z-40 flex items-center justify-center bg-black/20">
		<p class="rounded-lg bg-white px-4 py-2 text-sm text-gray-700">Loading consent...</p>
	</div>
{/if}

{#if $ConsentStore.error}
	<div class="fixed bottom-4 left-4 right-4 z-40 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
		{$ConsentStore.error}
	</div>
{/if}
