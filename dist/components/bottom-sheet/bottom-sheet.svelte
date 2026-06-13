<script lang="ts">
	import { untrack } from 'svelte';
	import BottomSheetShell from '../common/bottom-sheet-shell/bottom-sheet-shell.svelte';
	import Button from '../common/button/button.svelte';
	import ConsentButtonBar from '../consent/consent-button-bar/consent-button-bar.svelte';
	import ConsentDetailView from '../consent/consent-detail-view/consent-detail-view.svelte';
	import { getDetailConfirmLabel } from '../consent/consent-detail-view/consent-detail-view.logic';
	import ConsentListView from '../consent/consent-list-view/consent-list-view.svelte';
	import { getButtonActionSet, getVisiblePurposes } from '../../utils';
	import type { ConsentButtonAction, IConsentSubmitPayload, IConsentUiResponse } from '../../types';
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

	interface BottomSheetProps {
		data: IConsentUiResponse;
		onSubmit?: (payload: IConsentSubmitPayload) => void;
		onClose?: () => void;
	}

	let { data, onSubmit, onClose }: BottomSheetProps = $props();

	const notice = $derived(data.data.notice);
	const purposes = $derived(getVisiblePurposes(data.data.purposes));
	const actionSet = $derived(getButtonActionSet(data.data));
	const listTitleId = 'consent-list-title';

	let sheetState = $state<BottomSheetState>(
		untrack(() => createInitialState(data.data.purposes))
	);

	const viewMode = $derived(getViewMode(sheetState.activeDetailPurposeId));
	const activePurpose = $derived(
		getActivePurpose(data.data.purposes, sheetState.activeDetailPurposeId)
	);
	const detailTitleId = $derived(
		activePurpose ? `consent-detail-title-${activePurpose.id}` : listTitleId
	);
	const canSubmit = $derived(canSubmitConsent(data.data.purposes, sheetState.selectedIds));
	const errorPurposeIds = $derived(
		getErrorPurposeIdSet(
			data.data.purposes,
			sheetState.selectedIds,
			sheetState.validationAttempted
		)
	);
	const detailConfirmLabel = $derived(
		activePurpose ? getDetailConfirmLabel(activePurpose) : ''
	);

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
	{#snippet children()}
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
	{/snippet}

	{#snippet footer()}
		{#if viewMode === 'detail' && activePurpose}
			<Button variant="primary" label={detailConfirmLabel} onclick={handleDetailConfirm} />
		{:else}
			<ConsentButtonBar {actionSet} inactive={!canSubmit} onAction={handleListAction} />
		{/if}
	{/snippet}
</BottomSheetShell>
