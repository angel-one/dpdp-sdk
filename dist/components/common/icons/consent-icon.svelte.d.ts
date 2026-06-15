import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        name?: string;
        iconClass?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentIconProps = typeof __propDef.props;
export type ConsentIconEvents = typeof __propDef.events;
export type ConsentIconSlots = typeof __propDef.slots;
export default class ConsentIcon extends SvelteComponent<ConsentIconProps, ConsentIconEvents, ConsentIconSlots> {
}
export {};
