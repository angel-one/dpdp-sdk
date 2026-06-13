import type { IConsentPurpose } from '../../../types';
interface ConsentPurposeListProps {
    purposes: IConsentPurpose[];
    selectedIds: Set<string>;
    errorPurposeIds: Set<string>;
    onToggleSelect: (purposeId: string, locked: boolean) => void;
    onViewDetail: (purposeId: string) => void;
}
declare const ConsentPurposeList: import("svelte").Component<ConsentPurposeListProps, {}, "">;
type ConsentPurposeList = ReturnType<typeof ConsentPurposeList>;
export default ConsentPurposeList;
