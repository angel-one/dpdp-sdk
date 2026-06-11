# DPDP SDK

SvelteKit library for DPDP consent management. Ships a bottom sheet UI and loads consent configuration server-first, with an automatic client-side proxy fallback if the server fetch fails.

## Structure

```
src/lib/
├── index.js                 # Public exports
├── server/                  # Server-only CMS fetch helpers
├── components/
│   └── bottom-sheet/        # Consent bottom sheet UI
├── constants/               # CMS base URLs
├── containers/
│   └── consent.svelte       # Host mount point
├── managers/
│   └── dpdp/                # SDK facade (init, loadConsent, destroy)
├── stores/                  # Consent reactive state
├── types/                   # TypeScript contracts
└── utils/
```

## Local development

```bash
pnpm install
pnpm dev
```

The demo app loads consent in `+layout.server.ts` via `fetchConsentUiFromCms` (10s timeout). If that fails, `dpdp.loadConsent()` retries via `/api/consent/ui` on the client.

## Host integration

1. Install `dpdp-sdk` and add SDK paths to Tailwind `content`.
2. Load consent server-side in `+layout.server.ts`:

```typescript
import { fetchConsentUiFromCms } from 'dpdp-sdk/server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request }) => {
  try {
    const consentUi = await fetchConsentUiFromCms(
      {
        appCode: 'insurance_app',
        journeyCode: 'kyc_onboarding',
        pageCode: 'insurance_kyc_gate',
        languageCode: 'en',
        env: 'uat'
      },
      { request }
    );

    return { consentUi, consentError: null };
  } catch (error) {
    return {
      consentUi: null,
      consentError: error instanceof Error ? error.message : 'Failed to fetch consent UI'
    };
  }
};
```

3. Hydrate the SDK in root layout (client):

```javascript
import { dpdp, Consent } from 'dpdp-sdk';
import { onDestroy, onMount } from 'svelte';

let { data } = $props();

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
```

```html
<Consent />
```

4. Copy `src/routes/api/consent/ui/+server.ts` — required for the client fallback. Auth cookies/headers are forwarded to CMS automatically.

## Public API

```javascript
import { dpdp, Consent } from 'dpdp-sdk';

await dpdp.init({ appCode, journeyCode, pageCode, languageCode, env, consentApiPath });
await dpdp.loadConsent({ data, error }); // server-first, client fallback
await dpdp.setConsentData(data);         // manual hydration (advanced)
await dpdp.fetchConsentUi();             // client fallback only (advanced)
dpdp.closeConsent();
dpdp.destroy();
```

```javascript
import { fetchConsentUiFromCms } from 'dpdp-sdk/server';
```

## Package

```bash
pnpm run package
```

## CMS API

Server-side fetch target:

```
GET https://cms-core-uat.internal.angelone.in/v1/consent/ui
  ?app_code=insurance_app
  &journey_code=kyc_onboarding
  &page_code=insurance_kyc_gate
  &language_code=en
```

Prod base URL: `https://cms-core.internal.angelone.in`
