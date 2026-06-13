import type { IConsentPurpose, IConsentStaticText } from '../../../types';
interface ConsentDetailViewProps {
    purpose: IConsentPurpose;
    staticText: IConsentStaticText;
}
declare const ConsentDetailView: import("svelte").Component<ConsentDetailViewProps, {}, "">;
type ConsentDetailView = ReturnType<typeof ConsentDetailView>;
export default ConsentDetailView;
