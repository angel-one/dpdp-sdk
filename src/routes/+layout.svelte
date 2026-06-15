<script lang="ts">
	import '../app.css';
	import { dpdp, Consent } from '$lib';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

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

<div class="dpdp-demo">
	<h1 class="dpdp-demo__title">DPDP SDK Demo</h1>
	<p class="dpdp-demo__description">
		Consent UI is loaded server-side in <code>+layout.server.ts</code> with a client-side proxy
		fallback if the server fetch fails.
	</p>
</div>

<slot />

<Consent />
