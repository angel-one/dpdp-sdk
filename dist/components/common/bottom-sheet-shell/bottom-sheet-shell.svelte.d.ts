import type { Snippet } from 'svelte';
interface BottomSheetShellProps {
    titleId: string;
    onClose?: () => void;
    onBack?: () => void;
    backLabel?: string;
    header?: Snippet;
    footer?: Snippet;
    children: Snippet;
}
declare const BottomSheetShell: import("svelte").Component<BottomSheetShellProps, {}, "">;
type BottomSheetShell = ReturnType<typeof BottomSheetShell>;
export default BottomSheetShell;
