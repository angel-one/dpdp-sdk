<script lang="ts">
	import BottomSheetShell from '$lib/components/common/bottom-sheet-shell/bottom-sheet-shell.svelte';
	import Button from '$lib/components/common/button/button.svelte';
	import ConsentButtonBar from '$lib/components/consent/consent-button-bar/consent-button-bar.svelte';
	import ConsentDetailView from '$lib/components/consent/consent-detail-view/consent-detail-view.svelte';
	import { getDetailConfirmLabel } from '$lib/components/consent/consent-detail-view/consent-detail-view.logic';
	import ConsentListView from '$lib/components/consent/consent-list-view/consent-list-view.svelte';
	import { getButtonActionSet, getVisiblePurposes } from '$lib/utils';
	import type { ConsentButtonAction, IConsentSubmitPayload, IConsentUiResponse } from '$lib/types';
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
	export let onSubmit: ((payload: IConsentSubmitPayload) => void) | undefined = undefined;
	export let onClose: (() => void) | undefined = undefined;

	const listTitleId = 'consent-list-title';

	let sheetState: BottomSheetState = createInitialState(data.data.purposes);

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
	$: detailConfirmLabel = activePurpose ? getDetailConfirmLabel(activePurpose) : '';

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

	function handleListAction(action: ConsentButtonAction) {
		if (shouldBypassValidation(action)) {
			onSubmit?.(buildSubmitPayload(data, action, sheetState.selectedIds));
			return;
		}

		if (!canSubmit) {
			sheetState = markValidationAttempted(sheetState);
			return;
		}

		onSubmit?.(buildSubmitPayload(data, action, sheetState.selectedIds));
	}
</script>

<BottomSheetShell
	titleId={detailTitleId}
	onClose={viewMode === 'list' ? onClose : undefined}
	onBack={viewMode === 'detail' ? handleBackFromDetail : undefined}
	backLabel="Back to consent list"
>
	{#if viewMode === 'detail' && activePurpose}
		<ConsentDetailView purpose={activePurpose} staticText={data.data.staticText} />
	{:else}
		<ConsentListView
			{notice}
			{purposes}
			selectedIds={sheetState.selectedIds}
			{errorPurposeIds}
			titleId={listTitleId}
			onToggleSelect={handleToggleSelect}
			onViewDetail={handleViewDetail}
		/>
	{/if}

	<svelte:fragment slot="footer">
		{#if viewMode === 'detail' && activePurpose}
			<Button variant="primary" label={detailConfirmLabel} onClick={handleDetailConfirm} />
		{:else}
			<ConsentButtonBar {actionSet} inactive={!canSubmit} onAction={handleListAction} />
		{/if}
	</svelte:fragment>
</BottomSheetShell>
