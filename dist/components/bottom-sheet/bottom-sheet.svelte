<script>import BottomSheetShell from "../common/bottom-sheet-shell/bottom-sheet-shell.svelte";
import Button from "../common/button/button.svelte";
import ConsentButtonBar from "../consent/consent-button-bar/consent-button-bar.svelte";
import ConsentDetailView from "../consent/consent-detail-view/consent-detail-view.svelte";
import ConsentListView from "../consent/consent-list-view/consent-list-view.svelte";
import { ConsentStore } from "../../stores/consent.store";
import {
  getButtonActionSet,
  getVisiblePurposes,
  resolveDismissible,
  getDetailConfirmLabel,
  getBackLabel,
  getMandatoryErrorMessage
} from "../../utils";
import { tick } from "svelte";
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
  toggleSelected
} from "./bottom-sheet.logic";
export let data;
export let onSubmit = void 0;
export let onClose = void 0;
const listTitleId = "consent-list-title";
const listSubtitleId = "consent-list-subtitle";
let sheetState = createInitialState(data.data.purposes);
let sheetShell = void 0;
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
$: detailConfirmLabel = activePurpose ? getDetailConfirmLabel(activePurpose, labels) : "";
$: backLabel = getBackLabel(labels);
$: dismissible = resolveDismissible(data.layout, $ConsentStore.uiOptions.allowDismiss);
$: sheetState.activeDetailPurposeId, scrollSheetToTop();
function handleToggleSelect(purposeId, locked) {
  sheetState = toggleSelected(sheetState, purposeId, locked);
}
function handleViewDetail(purposeId) {
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
  sheetShell?.getSheetBodyElement()?.scrollTo({ top: 0, behavior: "auto" });
}
async function focusFirstValidationError() {
  await tick();
  const body = sheetShell?.getSheetBodyElement();
  const firstError = body?.querySelector("[data-dpdp-validation-error]");
  firstError?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  firstError?.focus();
}
async function handleListAction(action) {
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
				onClick={handleDetailConfirm}
			/>
		{:else}
			<ConsentButtonBar
				{actionSet}
				inactive={!canSubmit}
				onAction={handleListAction}
			/>
		{/if}
	</svelte:fragment>
</BottomSheetShell>
