<script>import ConsentPurposeList from "../consent-purpose-list/consent-purpose-list.svelte";
export let notice;
export let purposes = [];
export let selectedIds = /* @__PURE__ */ new Set();
export let errorPurposeIds = /* @__PURE__ */ new Set();
export let titleId = "";
export let subtitleId = "";
export let onToggleSelect = void 0;
export let onViewDetail = void 0;
</script>

<h2 id={titleId} class="dpdp-list-view__title">{notice.title}</h2>
<p id={subtitleId} class="dpdp-list-view__subtitle">{notice.subtitle}</p>

<ConsentPurposeList
	{purposes}
	{selectedIds}
	{errorPurposeIds}
	{onToggleSelect}
	{onViewDetail}
/>
