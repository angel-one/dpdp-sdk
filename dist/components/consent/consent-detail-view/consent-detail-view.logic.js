export const DETAIL_CONFIRM_LABEL_MANDATORY = 'GOT IT';
export const DETAIL_CONFIRM_LABEL_OPTIONAL = 'I ACCEPT';
export function getDetailConfirmLabel(purpose) {
    return purpose.mandatory ? DETAIL_CONFIRM_LABEL_MANDATORY : DETAIL_CONFIRM_LABEL_OPTIONAL;
}
export function getDetailTitle(purpose) {
    return `${purpose.name} Consent`;
}
export function getStaticTextEntries(staticText) {
    return [
        { key: 'fiduciary', text: staticText.fiduciaryDetails },
        { key: 'withdrawal', text: staticText.withdrawalDetails },
        { key: 'rights', text: staticText.dataPrincipalRights },
        { key: 'grievance', text: staticText.grievanceRedressal },
        { key: 'dpo', text: staticText.dpoDetails }
    ].filter((entry) => entry.text?.length);
}
