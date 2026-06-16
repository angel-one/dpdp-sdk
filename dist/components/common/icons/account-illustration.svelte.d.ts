import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        class?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type AccountIllustrationProps = typeof __propDef.props;
export type AccountIllustrationEvents = typeof __propDef.events;
export type AccountIllustrationSlots = typeof __propDef.slots;
export default class AccountIllustration extends SvelteComponent<AccountIllustrationProps, AccountIllustrationEvents, AccountIllustrationSlots> {
}
export {};
