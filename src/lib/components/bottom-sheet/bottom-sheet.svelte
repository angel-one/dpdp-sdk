<script lang="ts">
	import BottomSheetShell from '$lib/components/common/bottom-sheet-shell/bottom-sheet-shell.svelte';
	import Button from '$lib/components/common/button/button.svelte';
	import ConsentButtonBar from '$lib/components/consent/consent-button-bar/consent-button-bar.svelte';
	import ConsentDetailView from '$lib/components/consent/consent-detail-view/consent-detail-view.svelte';
	import ConsentListView from '$lib/components/consent/consent-list-view/consent-list-view.svelte';
	import ConsentTopNav from '$lib/components/consent/consent-top-nav/consent-top-nav.svelte';
	import { ConsentStore } from '$lib/stores/consent.store';
	import {
		buildDetailSpeechText,
		buildListSpeechText,
		getButtonActionSet,
		getVisiblePurposes,
		resolveDismissible,
		getDetailConfirmLabel,
		getBackLabel,
		getMandatoryErrorMessage,
		isSpeechSupported,
		speak,
		stopSpeech
	} from '$lib/utils';
	import type { ConsentButtonAction, IConsentSubmitPayload, IConsentUiResponse } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onDestroy, onMount, tick } from 'svelte';
	import {
		buildSubmitPayload,
		canSubmitConsent,
		closeDetailView,
		confirmDetailView,
		createInitialState,
		getActivePurpose,
		getErrorPurposeIdSet,
		getViewMode,
		markValidationAttempted,
		openDetailView,
		shouldBypassValidation,
		toggleSelected,
		type BottomSheetState
	} from './bottom-sheet.logic';

	export let data: IConsentUiResponse;
	export let onSubmit: ((payload: IConsentSubmitPayload) => void | Promise<void>) | undefined =
		undefined;
	export let onClose: (() => void) | undefined = undefined;

	const listTitleId = 'consent-list-title';
	const listSubtitleId = 'consent-list-subtitle';

	let sheetState: BottomSheetState = createInitialState(data.data.purposes);
	let sheetShell: BottomSheetShell | undefined = undefined;
	let detailViewEl: HTMLDivElement | undefined = undefined;
	let reduceMotion = false;
	let isSpeaking = false;

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	onDestroy(() => {
		stopSpeech();
	});

	$: slideDuration = reduceMotion ? 0 : 320;
	$: fadeDuration = reduceMotion ? 0 : 200;
	$: footerFade = { duration: fadeDuration, easing: cubicOut };

	$: notice = data.data.notice;
	$: purposes = getVisiblePurposes(data.data.purposes);
	$: actionSet = getButtonActionSet(data.data);
	$: viewMode = getViewMode(sheetState.activeDetailPurposeId);
	$: activePurpose = getActivePurpose(data.data.purposes, sheetState.activeDetailPurposeId);
	$: detailTitleId = activePurpose ? `consent-detail-title-${activePurpose.id}` : listTitleId;
	$: canSubmit = canSubmitConsent(data.data.purposes, sheetState.selectedIds);
	$: errorPurposeIds = getErrorPurposeIdSet(
		data.data.purposes,
		sheetState.selectedIds,
		sheetState.validationAttempted
	);
	$: labels = data.data.labels;
	$: mandatoryErrorMessage = getMandatoryErrorMessage(labels);
	$: detailConfirmLabel = activePurpose ? getDetailConfirmLabel(activePurpose, labels) : '';
	$: backLabel = getBackLabel(labels);
	$: dismissible = resolveDismissible(data.layout, $ConsentStore.uiOptions.allowDismiss);
	$: playAudioLabel = labels.audio?.trim() || 'Play audio';

	function stopSpeechPlayback() {
		stopSpeech((speaking) => {
			isSpeaking = speaking;
		});
	}

	function handlePlayAudio() {
		if (!isSpeechSupported()) return;

		if (isSpeaking) {
			stopSpeechPlayback();
			return;
		}

		const text =
			viewMode === 'detail' && activePurpose
				? buildDetailSpeechText(activePurpose, data.data.staticText)
				: buildListSpeechText(data.data);

		speak(text, data.data.notice.language, (speaking) => {
			isSpeaking = speaking;
		});
	}

	function handleToggleSelect(purposeId: string, locked: boolean) {
		sheetState = toggleSelected(sheetState, purposeId, locked);
	}

	function handleViewDetail(purposeId: string) {
		stopSpeechPlayback();
		sheetState = openDetailView(sheetState, purposeId);
		scrollDetailToTop();
	}

	function handleBackFromDetail() {
		stopSpeechPlayback();
		sheetState = closeDetailView(sheetState);
	}

	function handleDetailConfirm() {
		if (!activePurpose) return;
		stopSpeechPlayback();
		sheetState = confirmDetailView(sheetState, activePurpose);
	}

	function handleClose() {
		stopSpeechPlayback();
		onClose?.();
	}

	async function scrollDetailToTop() {
		await tick();
		detailViewEl?.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	}

	async function focusFirstValidationError() {
		await tick();
		const body = sheetShell?.getSheetBodyElement();
		const firstError = body?.querySelector<HTMLElement>('[data-dpdp-validation-error]');
		firstError?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		firstError?.focus();
	}

	async function handleListAction(action: ConsentButtonAction) {
		if (shouldBypassValidation(action)) {
			stopSpeechPlayback();
			await onSubmit?.(buildSubmitPayload(data, action, sheetState.selectedIds));
			return;
		}

		if (!canSubmit) {
			sheetState = markValidationAttempted(sheetState);
			await focusFirstValidationError();
			return;
		}

		stopSpeechPlayback();
		await onSubmit?.(buildSubmitPayload(data, action, sheetState.selectedIds));
	}
</script>

<BottomSheetShell
	bind:this={sheetShell}
	titleId={detailTitleId}
	subtitleId={viewMode === 'list' ? listSubtitleId : undefined}
	{dismissible}
	onClose={viewMode === 'list' ? handleClose : undefined}
	onBack={viewMode === 'detail' ? handleBackFromDetail : undefined}
	{backLabel}
>
	<svelte:fragment slot="header">
		<ConsentTopNav
			language={data.data.notice.language}
			centered={viewMode === 'detail'}
			{isSpeaking}
			{playAudioLabel}
			onPlayAudio={handlePlayAudio}
		/>
	</svelte:fragment>

	<div class="dpdp-sheet-viewport" style:--dpdp-view-slide-duration="{slideDuration}ms">
		<div class="dpdp-sheet-views-track" class:dpdp-sheet-views-track--detail={viewMode === 'detail'}>
			<div class="dpdp-sheet-view">
				<ConsentListView
					{notice}
					{purposes}
					staticText={data.data.staticText}
					selectedIds={sheetState.selectedIds}
					{errorPurposeIds}
					{mandatoryErrorMessage}
					titleId={listTitleId}
					subtitleId={listSubtitleId}
					onToggleSelect={handleToggleSelect}
					onViewDetail={handleViewDetail}
				/>
			</div>

			<div class="dpdp-sheet-view" bind:this={detailViewEl}>
				{#if activePurpose}
					<ConsentDetailView purpose={activePurpose} staticText={data.data.staticText} />
				{/if}
			</div>
		</div>
	</div>

	<svelte:fragment slot="footer">
		<div class="dpdp-sheet-footer-swap">
			{#if viewMode === 'detail' && activePurpose}
				<div class="dpdp-sheet-footer-panel" in:fade={footerFade} out:fade={footerFade}>
					<Button
						variant="primary"
						label={detailConfirmLabel}
						onClick={handleDetailConfirm}
					/>
				</div>
			{:else}
				<div class="dpdp-sheet-footer-panel" in:fade={footerFade} out:fade={footerFade}>
					<ConsentButtonBar
						{actionSet}
						inactive={!canSubmit}
						onAction={handleListAction}
					/>
				</div>
			{/if}
		</div>
	</svelte:fragment>
</BottomSheetShell>
