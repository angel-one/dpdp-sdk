import type { IConsentNotice, IConsentPurpose } from '../../../types';
interface ConsentListViewProps {
    notice: IConsentNotice;
    purposes: IConsentPurpose[];
    selectedIds: Set<string>;
    errorPurposeIds: Set<string>;
    titleId: string;
    onToggleSelect: (purposeId: string, locked: boolean) => void;
    onViewDetail: (purposeId: string) => void;
}
declare const ConsentListView: import("svelte").Component<ConsentListViewProps, {}, "">;
type ConsentListView = ReturnType<typeof ConsentListView>;
export default ConsentListView;
