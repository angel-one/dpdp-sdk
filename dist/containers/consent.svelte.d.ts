import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: Record<string, never>;
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentProps = typeof __propDef.props;
export type ConsentEvents = typeof __propDef.events;
export type ConsentSlots = typeof __propDef.slots;
export default class Consent extends SvelteComponent<ConsentProps, ConsentEvents, ConsentSlots> {
}
export {};
