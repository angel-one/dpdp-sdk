import { SvelteComponent } from "svelte";
import type { ConsentButtonAction, IConsentActionSet } from '../../../types';
declare const __propDef: {
    props: {
        actionSet: IConsentActionSet;
        inactive?: boolean;
        onAction?: ((action: ConsentButtonAction) => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentButtonBarProps = typeof __propDef.props;
export type ConsentButtonBarEvents = typeof __propDef.events;
export type ConsentButtonBarSlots = typeof __propDef.slots;
export default class ConsentButtonBar extends SvelteComponent<ConsentButtonBarProps, ConsentButtonBarEvents, ConsentButtonBarSlots> {
}
export {};
