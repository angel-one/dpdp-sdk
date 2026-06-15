import { SvelteComponent } from "svelte";
import type { IConsentNotice, IConsentPurpose } from '../../../types';
declare const __propDef: {
    props: {
        notice: IConsentNotice;
        purposes?: IConsentPurpose[];
        selectedIds?: Set<string>;
        errorPurposeIds?: Set<string>;
        titleId?: string;
        onToggleSelect?: ((purposeId: string, locked: boolean) => void) | undefined;
        onViewDetail?: ((purposeId: string) => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentListViewProps = typeof __propDef.props;
export type ConsentListViewEvents = typeof __propDef.events;
export type ConsentListViewSlots = typeof __propDef.slots;
export default class ConsentListView extends SvelteComponent<ConsentListViewProps, ConsentListViewEvents, ConsentListViewSlots> {
}
export {};
