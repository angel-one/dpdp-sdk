<script lang="ts">
	interface LoadingOverlayProps {
		message?: string;
	}

	let { message = 'Loading consent...' }: LoadingOverlayProps = $props();
</script>

<div
	class="fixed inset-0 z-40 flex items-center justify-center bg-black/20"
	role="status"
	aria-live="polite"
	aria-busy="true"
>
	<p class="rounded-lg bg-surface px-4 py-2 text-sm text-text-secondary">{message}</p>
</div>
