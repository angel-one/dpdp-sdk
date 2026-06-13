<script lang="ts">
	import '../app.css';
	import { dpdp, Consent } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	onMount(async () => {
		await dpdp.init({
			appCode: 'insurance_app',
			journeyCode: 'kyc_onboarding',
			pageCode: 'insurance_kyc_gate',
			languageCode: 'en',
			env: 'uat'
		});

		await dpdp.loadConsent({
			data: data.consentUi,
			error: data.consentError
		});
	});

	onDestroy(() => {
		dpdp.destroy();
	});
</script>

<div class="flex min-h-screen flex-col bg-gray-50 p-4">
	<h1 class="text-xl font-semibold text-gray-900">DPDP SDK Demo</h1>
	<p class="mt-2 text-sm text-gray-600">
		Consent UI is loaded server-side in <code>+layout.server.ts</code> with a client-side proxy
		fallback if the server fetch fails. SvelteKit library for DPDP consent management. Ships a bottom sheet UI and loads consent configuration server-first, with an automatic client-side proxy fallback if the server fetch fails.
	</p>
</div>

{@render children?.()}

<Consent />
