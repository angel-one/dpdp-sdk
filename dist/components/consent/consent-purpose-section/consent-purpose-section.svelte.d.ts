import { SvelteComponent } from "svelte";
import type { IConsentPurposeSection } from '../../../types';
declare const __propDef: {
    props: {
        section: IConsentPurposeSection;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentPurposeSectionProps = typeof __propDef.props;
export type ConsentPurposeSectionEvents = typeof __propDef.events;
export type ConsentPurposeSectionSlots = typeof __propDef.slots;
export default class ConsentPurposeSection extends SvelteComponent<ConsentPurposeSectionProps, ConsentPurposeSectionEvents, ConsentPurposeSectionSlots> {
}
export {};
