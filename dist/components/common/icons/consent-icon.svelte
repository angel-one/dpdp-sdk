<script>export let name = "";
export let iconClass = "";
</script>

<svg class="dpdp-consent-icon {iconClass}" viewBox="0 0 20 20" fill="none" aria-hidden="true">
	{#if name === 'cms_compass'}
		<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" />
		<path d="M10 6l1.5 4.5L10 10 8.5 10.5 10 6z" fill="currentColor" />
	{:else if name === 'cms_document'}
		<path
			d="M6 3h5l3 3v11H6V3z"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>
		<path d="M11 3v3h3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
	{:else if name === 'cms_arrow_right'}
		<path
			d="M4 10h10M11 7l3 3-3 3"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if name === 'cms_scale'}
		<path d="M4 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		<path d="M10 4v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
		<path
			d="M6 7h8l-2 4H8l-2-4z"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linejoin="round"
		/>
	{:else if name === 'cms_share'}
		<circle cx="5" cy="10" r="2" stroke="currentColor" stroke-width="1.5" />
		<circle cx="15" cy="5" r="2" stroke="currentColor" stroke-width="1.5" />
		<circle cx="15" cy="15" r="2" stroke="currentColor" stroke-width="1.5" />
		<path d="M7 9l6-3M7 11l6 3" stroke="currentColor" stroke-width="1.5" />
	{:else if name === 'cms_user'}
		<circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5" />
		<path
			d="M4 17c0-3 2.7-5 6-5s6 2 6 5"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
	{:else}
		<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5" />
	{/if}
</svg>
