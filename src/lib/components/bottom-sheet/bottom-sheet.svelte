<script lang="ts">
	import BottomSheetShell from '$lib/components/common/bottom-sheet-shell/bottom-sheet-shell.svelte';
	import Button from '$lib/components/common/button/button.svelte';
	import ConsentButtonBar from '$lib/components/consent/consent-button-bar/consent-button-bar.svelte';
	import ConsentDetailView from '$lib/components/consent/consent-detail-view/consent-detail-view.svelte';
	import ConsentListView from '$lib/components/consent/consent-list-view/consent-list-view.svelte';
	import { ConsentStore } from '$lib/stores/consent.store';
	import {
		getButtonActionSet,
		getVisiblePurposes,
		resolveDismissible,
		getDetailConfirmLabel,
		getBackLabel,
		getMandatoryErrorMessage
	} from '$lib/utils';
	import type { ConsentButtonAction, IConsentSubmitPayload, IConsentUiResponse } from '$lib/types';
	import { tick } from 'svelte';
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
	$: submitting = $ConsentStore.submitting;

	$: sheetState.activeDetailPurposeId, scrollSheetToTop();

	function handleToggleSelect(purposeId: string, locked: boolean) {
		sheetState = toggleSelected(sheetState, purposeId, locked);
	}

	function handleViewDetail(purposeId: string) {
		sheetState = openDetailView(sheetState, purposeId);
	}

	function handleBackFromDetail() {
		sheetState = closeDetailView(sheetState);
	}

	function handleDetailConfirm() {
		if (!activePurpose) return;
		sheetState = confirmDetailView(sheetState, activePurpose);
	}

	async function scrollSheetToTop() {
		await tick();
		sheetShell?.getSheetBodyElement()?.scrollTo({ top: 0, behavior: 'auto' });
	}

	async function focusFirstValidationError() {
		await tick();
		const body = sheetShell?.getSheetBodyElement();
		const firstError = body?.querySelector<HTMLElement>('[data-dpdp-validation-error]');
		firstError?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		firstError?.focus();
	}

	async function handleListAction(action: ConsentButtonAction) {
		if (submitting) return;

		if (shouldBypassValidation(action)) {
			await onSubmit?.(buildSubmitPayload(data, action, sheetState.selectedIds));
			return;
		}

		if (!canSubmit) {
			sheetState = markValidationAttempted(sheetState);
			await focusFirstValidationError();
			return;
		}

		await onSubmit?.(buildSubmitPayload(data, action, sheetState.selectedIds));
	}
</script>

<BottomSheetShell
	bind:this={sheetShell}
	titleId={detailTitleId}
	subtitleId={viewMode === 'list' ? listSubtitleId : undefined}
	{dismissible}
	onClose={viewMode === 'list' ? onClose : undefined}
	onBack={viewMode === 'detail' ? handleBackFromDetail : undefined}
	{backLabel}
>
	{#if viewMode === 'detail' && activePurpose}
		<ConsentDetailView purpose={activePurpose} staticText={data.data.staticText} />
	{:else}
		<ConsentListView
			{notice}
			{purposes}
			selectedIds={sheetState.selectedIds}
			{errorPurposeIds}
			{mandatoryErrorMessage}
			titleId={listTitleId}
			subtitleId={listSubtitleId}
			onToggleSelect={handleToggleSelect}
			onViewDetail={handleViewDetail}
		/>
	{/if}

	<svelte:fragment slot="footer">
		{#if viewMode === 'detail' && activePurpose}
			<Button
				variant="primary"
				label={detailConfirmLabel}
				inactive={submitting}
				onClick={handleDetailConfirm}
			/>
		{:else}
			<ConsentButtonBar
				{actionSet}
				inactive={!canSubmit || submitting}
				onAction={handleListAction}
			/>
		{/if}
	</svelte:fragment>
</BottomSheetShell>
