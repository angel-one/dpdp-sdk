<script>import ConsentPurposeList from "../consent-purpose-list/consent-purpose-list.svelte";
export let notice;
export let purposes = [];
export let selectedIds = /* @__PURE__ */ new Set();
export let errorPurposeIds = /* @__PURE__ */ new Set();
export let titleId = "";
export let onToggleSelect = void 0;
export let onViewDetail = void 0;
</script>

<h2 id={titleId} class="text-lg font-semibold text-gray-900">{notice.title}</h2>
<p class="mt-2 text-sm leading-6 text-gray-600">{notice.subtitle}</p>

<ConsentPurposeList
	{purposes}
	{selectedIds}
	{errorPurposeIds}
	{onToggleSelect}
	{onViewDetail}
/>
