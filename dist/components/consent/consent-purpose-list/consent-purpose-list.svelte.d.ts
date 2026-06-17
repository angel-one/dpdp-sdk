import { SvelteComponent } from "svelte";
import type { IConsentPurpose } from '../../../types';
declare const __propDef: {
    props: {
        purposes?: IConsentPurpose[];
        selectedIds?: Set<string>;
        selectedChannels?: Map<string, Set<string>>;
        errorPurposeIds?: Set<string>;
        mandatoryErrorMessage?: string;
        onToggleSelect?: ((purposeId: string, locked: boolean) => void) | undefined;
        onToggleChannel?: ((purposeId: string, channelCode: string) => void) | undefined;
        onViewDetail?: ((purposeId: string) => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentPurposeListProps = typeof __propDef.props;
export type ConsentPurposeListEvents = typeof __propDef.events;
export type ConsentPurposeListSlots = typeof __propDef.slots;
export default class ConsentPurposeList extends SvelteComponent<ConsentPurposeListProps, ConsentPurposeListEvents, ConsentPurposeListSlots> {
}
export {};
