export type ConsentButtonAction = 'accept_all' | 'accept_selected' | 'reject';
export type ConsentButtonVariant = 'primary' | 'secondary';
export type ConsentPurposeStatus = 'mandatory' | 'optional';
export interface IConsentPurposeSection {
    key: string;
    title: string;
    icon: string;
    description: string;
}
export interface IConsentChannel {
    code: string;
    name: string;
    mandatory: boolean;
    optOutAllowed: boolean;
    checked: boolean;
    locked: boolean;
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
    /** Short summary shown on the purpose card. */
    summary?: string;
    /** Bullet points shown on the purpose card list view. */
    summaryBullets?: string[];
    sections?: IConsentPurposeSection[];
    consentStatus?: string;
    /** @deprecated CMS now sends `summary` */
    description?: string;
    /** @deprecated CMS now sends `summaryBullets` */
    bullets?: string[];
    channels?: IConsentChannel[];
}
export interface IConsentLanguage {
    code: string;
    label: string;
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
    languages?: IConsentLanguage[];
    purposes: IConsentPurpose[];
    staticText: IConsentStaticText;
    labels: IConsentLabels;
    flags: IConsentFlags;
    actions: IConsentActions;
}
/** CMS layout tree node (schema 1.1.0). SDK renders a fixed UI; layout is retained for CMS contract. */
export interface IConsentLayoutNode {
    type: string;
    props?: Record<string, unknown>;
    bind?: string;
    item?: IConsentLayoutNode;
    children?: IConsentLayoutNode[];
    showIf?: string;
}
export interface IConsentLayout {
    type?: string;
    props?: Record<string, unknown>;
    children?: IConsentLayoutNode[];
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
    channelSelections?: IConsentPurposeChannelSelection[];
    noticeId: string;
}
export interface IConsentPurposeChannelSelection {
    purposeId: string;
    channels: string[];
}
