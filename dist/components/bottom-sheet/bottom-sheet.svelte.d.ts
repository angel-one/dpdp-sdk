import { SvelteComponent } from "svelte";
import type { IConsentSubmitPayload, IConsentUiResponse } from '../../types';
declare const __propDef: {
    props: {
        data: IConsentUiResponse;
        onSubmit?: ((payload: IConsentSubmitPayload) => void | Promise<void>) | undefined;
        onClose?: (() => void) | undefined;
        onLanguageChange?: ((languageCode: string) => void | Promise<void>) | undefined;
        languageChanging?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BottomSheetProps = typeof __propDef.props;
export type BottomSheetEvents = typeof __propDef.events;
export type BottomSheetSlots = typeof __propDef.slots;
export default class BottomSheet extends SvelteComponent<BottomSheetProps, BottomSheetEvents, BottomSheetSlots> {
}
export {};
