# DPDP SDK

SvelteKit library for DPDP consent management. Ships a self-contained bottom sheet UI with server-first data loading and automatic client-side proxy fallback.

**v0.4.0** — Production-hardened: vanilla CSS, portal rendering, scroll lock, consent record POST, blocking dismiss by default.

## Compatibility

| Dependency | Supported |
|---|---|
| Svelte | `^4.2.0` or `^5.0.0` |
| SvelteKit | `^2.5.0` |
| CSS | Built-in — no Tailwind setup required |

Styles ship scoped under `.dpdp-root`. Host apps do **not** need Tailwind `content` paths for the SDK.

## Production features

- Self-contained CSS with theme tokens (no host Tailwind dependency)
- Portal to `document.body` (escapes host stacking contexts)
- Body scroll lock while sheet is open
- Focus trap with focus restore on close
- Blocking consent by default (`layout.dismissible` or `allowDismiss` to enable close)
- Consent record POST to CMS `record.url`
- Submit / load loading states with spinner
- Dismissible error banner
- Safe-area insets, reduced-motion support, 44px touch targets
- Configurable z-index base (default `9999`)

## How to run

```bash
nvm use
pnpm install
pnpm dev
```

## Host integration

1. Install:

```bash
pnpm add github:your-org/dpdp-sdk#v0.4.0
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

3. Hydrate in root layout:

```svelte
<script>
  import { dpdp, Consent } from 'dpdp-sdk';
  import { onDestroy, onMount } from 'svelte';

  export let data;

  onMount(async () => {
    await dpdp.init({
      appCode: 'insurance_app',
      journeyCode: 'kyc_onboarding',
      pageCode: 'insurance_kyc_gate',
      languageCode: 'en',
      env: 'uat',
      // Optional: override z-index if host nav uses 10000+
      zIndexBase: 9999
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

<Consent />
```

4. Copy `src/routes/api/consent/ui/+server.ts` for client fallback.

### Theming

```css
.dpdp-root {
  --dpdp-color-primary: #3f5bd9;
  --dpdp-font-family: 'Roboto', sans-serif;
  --dpdp-z-overlay: 9999;
}
```

### Dismiss behaviour

By default the sheet is **blocking** — no close button, Escape does nothing. To allow dismiss:

- CMS: `layout.dismissible: true` in the consent UI response, or
- SDK: `allowDismiss: true` in `dpdp.init()`

## Public API

```javascript
import { dpdp, Consent } from 'dpdp-sdk';

await dpdp.init({ appCode, journeyCode, pageCode, languageCode, env, consentApiPath, allowDismiss, zIndexBase, recordTimeoutMs });
await dpdp.loadConsent({ data, error });
await dpdp.setConsentData(data);
await dpdp.setConsentError(null);
await dpdp.fetchConsentUi();
await dpdp.submitConsent(payload);  // POSTs to CMS record.url
dpdp.closeConsent();
dpdp.destroy();
```

```javascript
import { fetchConsentUiFromCms } from 'dpdp-sdk/server';
import 'dpdp-sdk/styles'; // optional — <Consent /> auto-imports
```

## Package & publish

```bash
pnpm run package
git add dist
git commit -m "chore: build dist for release"
git tag v0.4.0
git push origin main --tags
```

## Migrating from v0.3.0

- Remove SDK from Tailwind `content` if added in v0.2.x
- Bump to `v0.4.0` — close button hidden by default (blocking consent)
- Set `allowDismiss: true` if you previously relied on implicit dismiss via X button
