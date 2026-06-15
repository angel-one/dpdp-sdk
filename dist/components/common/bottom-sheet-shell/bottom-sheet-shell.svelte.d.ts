import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        titleId?: string;
        onClose?: (() => void) | undefined;
        onBack?: (() => void) | undefined;
        backLabel?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        header: {};
        default: {};
        footer: {};
    };
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BottomSheetShellProps = typeof __propDef.props;
export type BottomSheetShellEvents = typeof __propDef.events;
export type BottomSheetShellSlots = typeof __propDef.slots;
export default class BottomSheetShell extends SvelteComponent<BottomSheetShellProps, BottomSheetShellEvents, BottomSheetShellSlots> {
}
export {};
