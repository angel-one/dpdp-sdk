# DPDP SDK

SvelteKit library for DPDP consent management. Ships a bottom sheet UI and loads consent configuration server-first, with an automatic client-side proxy fallback if the server fetch fails.

**v0.2.0** — Svelte 4 + Tailwind 3 compatible (works with `onr-spark-mweb` stack: Svelte 4.2, Kit 2.5, Tailwind 3.3).

## Compatibility

| Dependency | Supported |
|---|---|
| Svelte | `^4.2.0` or `^5.0.0` |
| SvelteKit | `^2.5.0` |
| Tailwind | 3.x (uses standard utility classes + host `primary` color) |

Host app must include `primary: '#3F5BD9'` (or similar) in Tailwind config and scan `node_modules/dpdp-sdk/dist/**` in `content`.


## How to run

```bash
nvm use
pnpm install
pnpm dev
```

The demo app loads consent in `+layout.server.ts` via `fetchConsentUiFromCms` (10s timeout). If that fails, `dpdp.loadConsent()` retries via `/api/consent/ui` on the client.

## Host integration

1. Install `dpdp-sdk` and add SDK to Tailwind `content`:

```js
// tailwind.config.cjs
content: [
  './src/**/*.{html,js,svelte,ts}',
  './node_modules/dpdp-sdk/dist/**/*.{html,js,svelte,ts}'
]
```

Ensure `primary` color exists in your theme (Angel apps already have `primary: '#3F5BD9'`).

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

## Package & publish

Build the distributable (required before tagging a GitHub release — `dist/` is committed so consumers can install via `github:org/dpdp-sdk#v0.2.0`):

```bash
pnpm run package
git add dist
git commit -m "chore: build dist for release"
git tag v0.1.0
git push origin main --tags
```

Install in a host SvelteKit app:

```bash
pnpm add github:your-org/dpdp-sdk#v0.2.0
```

`prepack` also runs `svelte-package` automatically before `npm publish` / `pnpm pack` if you publish to npm or GitHub Packages later.
