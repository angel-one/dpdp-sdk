export type ConsentButtonAction = 'accept_all' | 'accept_selected' | 'reject';
export type ConsentButtonVariant = 'primary' | 'secondary';
export type ConsentPurposeStatus = 'mandatory' | 'optional';
export interface IConsentPurposeSection {
    key: string;
    title: string;
    icon: string;
    description: string;
}
export interface IConsentPurpose {
    id: string;
    name: string;
    version: string;
    mandatory: boolean;
    badge: string;
    locked: boolean;
    visible: boolean;
    defaultExpanded: boolean;
    status: ConsentPurposeStatus;
    checked: boolean;
    description: string;
    bullets: string[];
    sections: IConsentPurposeSection[];
    consentStatus?: string;
}
export interface IConsentNotice {
    id: string;
    title: string;
    subtitle: string;
    language: string;
}
export interface IConsentStaticText {
    fiduciaryDetails: string;
    withdrawalDetails: string;
    dataPrincipalRights: string;
    grievanceRedressal: string;
    dpoDetails: string;
}
export interface IConsentLabels {
    accept: string;
    reject: string;
    audio?: string;
    /** Shown when a mandatory purpose is unchecked on submit. */
    mandatoryError?: string;
    /** Detail view confirm CTA for mandatory purposes. */
    gotIt?: string;
    /** Back navigation label in detail view. */
    back?: string;
}
export interface IConsentFlags {
    hasOptionalPurposes: boolean;
}
export interface IConsentButtonConfig {
    label: string;
    action: ConsentButtonAction;
    variant: ConsentButtonVariant;
}
export interface IConsentActionSet {
    primary: IConsentButtonConfig;
    secondary?: IConsentButtonConfig;
}
export interface IConsentRecordAction {
    url: string;
    method: string;
    noticeId: string;
    templateVersion: number;
    statusConsented: string;
    statusNotConsented: string;
    purposeIds: string[];
}
export interface IConsentActions {
    record: IConsentRecordAction;
    allMandatory: IConsentActionSet;
    hasOptional: IConsentActionSet;
}
export interface IConsentData {
    notice: IConsentNotice;
    purposes: IConsentPurpose[];
    staticText: IConsentStaticText;
    labels: IConsentLabels;
    flags: IConsentFlags;
    actions: IConsentActions;
}
export interface IConsentLayout {
    /** When true, the sheet can be dismissed via close button or Escape. Defaults to blocking. */
    dismissible?: boolean;
}
export interface IConsentUiResponse {
    schemaVersion: string;
    templateKey: string;
    templateVersion: number;
    noticeId: string;
    languageId: string;
    layout: IConsentLayout;
    data: IConsentData;
}
export interface IConsentUiOptions {
    allowDismiss?: boolean;
    zIndexBase?: number;
}
export interface IConsentStoreState {
    hydrated: boolean;
    loading: boolean;
    error: string | null;
    data: IConsentUiResponse | null;
    uiOptions: IConsentUiOptions;
}
export interface IConsentSubmitPayload {
    action: ConsentButtonAction;
    selectedPurposeIds: string[];
    noticeId: string;
}
