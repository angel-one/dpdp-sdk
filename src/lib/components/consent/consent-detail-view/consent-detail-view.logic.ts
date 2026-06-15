import type { IConsentPurpose, IConsentStaticText } from '$lib/types';

export function getDetailTitle(purpose: IConsentPurpose) {
	return `${purpose.name} Consent`;
}

export function getStaticTextEntries(staticText: IConsentStaticText) {
	return [
		{ key: 'fiduciary', text: staticText.fiduciaryDetails },
		{ key: 'withdrawal', text: staticText.withdrawalDetails },
		{ key: 'rights', text: staticText.dataPrincipalRights },
		{ key: 'grievance', text: staticText.grievanceRedressal },
		{ key: 'dpo', text: staticText.dpoDetails }
	].filter((entry) => entry.text?.length);
}
