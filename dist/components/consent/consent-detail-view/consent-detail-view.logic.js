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
