import type { IConsentPurpose } from '../../../types';
interface ConsentPurposeCardProps {
    purpose: IConsentPurpose;
    selected: boolean;
    showError: boolean;
    onToggleSelect: () => void;
    onViewDetail: () => void;
}
declare const ConsentPurposeCard: import("svelte").Component<ConsentPurposeCardProps, {}, "">;
type ConsentPurposeCard = ReturnType<typeof ConsentPurposeCard>;
export default ConsentPurposeCard;
