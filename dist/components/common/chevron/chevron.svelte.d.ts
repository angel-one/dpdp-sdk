import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        expanded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ChevronProps = typeof __propDef.props;
export type ChevronEvents = typeof __propDef.events;
export type ChevronSlots = typeof __propDef.slots;
export default class Chevron extends SvelteComponent<ChevronProps, ChevronEvents, ChevronSlots> {
}
export {};
