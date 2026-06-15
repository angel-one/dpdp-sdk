<script>export let error = false;
</script>

<div
	class="rounded-xl border bg-white transition-colors {error
		? 'border-red-400 bg-red-50/30'
		: 'border-gray-200'}"
>
	<slot />
</div>
