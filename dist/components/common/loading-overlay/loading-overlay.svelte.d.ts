import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        message?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type LoadingOverlayProps = typeof __propDef.props;
export type LoadingOverlayEvents = typeof __propDef.events;
export type LoadingOverlaySlots = typeof __propDef.slots;
export default class LoadingOverlay extends SvelteComponent<LoadingOverlayProps, LoadingOverlayEvents, LoadingOverlaySlots> {
}
export {};
