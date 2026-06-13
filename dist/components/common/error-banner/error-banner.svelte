<script lang="ts">
	interface ErrorBannerProps {
		message: string;
	}

	let { message }: ErrorBannerProps = $props();
</script>

<div
	class="fixed bottom-4 left-4 right-4 z-40 rounded-lg bg-red-50 px-4 py-3 text-sm text-text-error"
	role="alert"
	aria-live="assertive"
>
	{message}
</div>
