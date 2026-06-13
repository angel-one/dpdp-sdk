import type { ConsentButtonAction, IConsentActionSet } from '../../../types';
interface ConsentButtonBarProps {
    actionSet: IConsentActionSet;
    inactive: boolean;
    onAction: (action: ConsentButtonAction) => void;
}
declare const ConsentButtonBar: import("svelte").Component<ConsentButtonBarProps, {}, "">;
type ConsentButtonBar = ReturnType<typeof ConsentButtonBar>;
export default ConsentButtonBar;
