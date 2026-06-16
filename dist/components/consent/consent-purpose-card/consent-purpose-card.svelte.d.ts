import { SvelteComponent } from "svelte";
import type { IConsentPurpose } from '../../../types';
declare const __propDef: {
    props: {
        purpose: IConsentPurpose;
        selected?: boolean;
        showError?: boolean;
        mandatoryErrorMessage?: string;
        onToggleSelect?: (() => void) | undefined;
        onViewDetail?: (() => void) | undefined;
    };
    events: {
        click: PointerEvent;
        keydown: KeyboardEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentPurposeCardProps = typeof __propDef.props;
export type ConsentPurposeCardEvents = typeof __propDef.events;
export type ConsentPurposeCardSlots = typeof __propDef.slots;
export default class ConsentPurposeCard extends SvelteComponent<ConsentPurposeCardProps, ConsentPurposeCardEvents, ConsentPurposeCardSlots> {
}
export {};
