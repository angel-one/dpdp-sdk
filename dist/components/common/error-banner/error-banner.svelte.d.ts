import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        message?: string;
        onDismiss?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ErrorBannerProps = typeof __propDef.props;
export type ErrorBannerEvents = typeof __propDef.events;
export type ErrorBannerSlots = typeof __propDef.slots;
export default class ErrorBanner extends SvelteComponent<ErrorBannerProps, ErrorBannerEvents, ErrorBannerSlots> {
}
export {};
