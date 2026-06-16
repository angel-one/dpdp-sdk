import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        language: string;
        centered?: boolean;
        isSpeaking?: boolean;
        playAudioLabel?: string;
        stopAudioLabel?: string;
        onPlayAudio?: (() => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {} | undefined;
    bindings?: string | undefined;
};
export type ConsentTopNavProps = typeof __propDef.props;
export type ConsentTopNavEvents = typeof __propDef.events;
export type ConsentTopNavSlots = typeof __propDef.slots;
export default class ConsentTopNav extends SvelteComponent<ConsentTopNavProps, ConsentTopNavEvents, ConsentTopNavSlots> {
}
export {};
