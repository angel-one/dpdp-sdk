import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        onClick?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type BackButtonProps = typeof __propDef.props;
export type BackButtonEvents = typeof __propDef.events;
export type BackButtonSlots = typeof __propDef.slots;
export default class BackButton extends SvelteComponent<BackButtonProps, BackButtonEvents, BackButtonSlots> {
}
export {};
