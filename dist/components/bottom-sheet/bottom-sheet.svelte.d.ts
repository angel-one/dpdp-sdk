import type { IConsentSubmitPayload, IConsentUiResponse } from '../../types';
interface BottomSheetProps {
    data: IConsentUiResponse;
    onSubmit?: (payload: IConsentSubmitPayload) => void;
    onClose?: () => void;
}
declare const BottomSheet: import("svelte").Component<BottomSheetProps, {}, "">;
type BottomSheet = ReturnType<typeof BottomSheet>;
export default BottomSheet;
