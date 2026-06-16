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
export type HeroIllustrationProps = typeof __propDef.props;
export type HeroIllustrationEvents = typeof __propDef.events;
export type HeroIllustrationSlots = typeof __propDef.slots;
export default class HeroIllustration extends SvelteComponent<HeroIllustrationProps, HeroIllustrationEvents, HeroIllustrationSlots> {
}
export {};
