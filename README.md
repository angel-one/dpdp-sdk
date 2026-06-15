# DPDP SDK

SvelteKit library for DPDP consent management. Ships a bottom sheet UI and loads consent configuration server-first, with an automatic client-side proxy fallback if the server fetch fails.

**v0.3.0** — Self-contained vanilla CSS (no Tailwind dependency). Works in any SvelteKit host regardless of Tailwind version or config.

## Compatibility

| Dependency | Supported |
|---|---|
| Svelte | `^4.2.0` or `^5.0.0` |
| SvelteKit | `^2.5.0` |
| CSS | Built-in — no Tailwind setup required |

Styles ship with the SDK and are scoped under `.dpdp-root`. Host apps do **not** need to add SDK paths to Tailwind `content`.


## How to run

```bash
nvm use
pnpm install
pnpm dev
```

The demo app loads consent in `+layout.server.ts` via `fetchConsentUiFromCms` (10s timeout). If that fails, `dpdp.loadConsent()` retries via `/api/consent/ui` on the client.

## Host integration

1. Install `dpdp-sdk`:

```bash
pnpm add github:your-org/dpdp-sdk#v0.3.0
```

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

export let data;

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

`<Consent />` auto-imports SDK styles. No extra CSS setup needed.

4. Copy `src/routes/api/consent/ui/+server.ts` — required for the client fallback. Auth cookies/headers are forwarded to CMS automatically.

### Theming (optional)

Override CSS variables on `.dpdp-root` in your host app:

```css
.dpdp-root {
  --dpdp-color-primary: #3f5bd9;
  --dpdp-font-family: 'Roboto', sans-serif;
}
```

Or import the stylesheet directly for advanced setups:

```javascript
import 'dpdp-sdk/styles';
```

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

Build the distributable (required before tagging a GitHub release — `dist/` is committed so consumers can install via `github:org/dpdp-sdk#v0.3.0`):

```bash
pnpm run package
git add dist
git commit -m "chore: build dist for release"
git tag v0.3.0
git push origin main --tags
```

Install in a host SvelteKit app:

```bash
pnpm add github:your-org/dpdp-sdk#v0.3.0
```

`prepack` also runs `svelte-package` automatically before `npm publish` / `pnpm pack` if you publish to npm or GitHub Packages later.

## Migrating from v0.2.0

- Remove `node_modules/dpdp-sdk/dist/**` from Tailwind `content` — no longer needed.
- Bump to `v0.3.0` and reinstall. UI styling is now self-contained.
