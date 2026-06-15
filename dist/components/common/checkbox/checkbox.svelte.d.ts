import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        checked?: boolean;
        disabled?: boolean;
        label?: string;
        onChange?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type CheckboxProps = typeof __propDef.props;
export type CheckboxEvents = typeof __propDef.events;
export type CheckboxSlots = typeof __propDef.slots;
export default class Checkbox extends SvelteComponent<CheckboxProps, CheckboxEvents, CheckboxSlots> {
}
export {};
