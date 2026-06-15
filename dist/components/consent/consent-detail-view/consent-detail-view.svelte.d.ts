import { SvelteComponent } from "svelte";
import type { IConsentPurpose, IConsentStaticText } from '../../../types';
declare const __propDef: {
    props: {
        purpose: IConsentPurpose;
        staticText: IConsentStaticText;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentDetailViewProps = typeof __propDef.props;
export type ConsentDetailViewEvents = typeof __propDef.events;
export type ConsentDetailViewSlots = typeof __propDef.slots;
export default class ConsentDetailView extends SvelteComponent<ConsentDetailViewProps, ConsentDetailViewEvents, ConsentDetailViewSlots> {
}
export {};
