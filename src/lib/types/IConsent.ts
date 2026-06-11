export interface IConsentSection {
	title: string;
	content: string;
}

export interface IConsentItem {
	id: string;
	title: string;
	mandatory?: boolean;
	checked?: boolean;
	expanded?: boolean;
	sections?: IConsentSection[];
}

export interface IConsentUiResponse {
	title?: string;
	introText?: string;
	consents?: IConsentItem[];
	[key: string]: unknown;
}

export interface IConsentStoreState {
	hydrated: boolean;
	loading: boolean;
	error: string | null;
	data: IConsentUiResponse | null;
}
