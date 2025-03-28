export enum Language {
	ENGLISH = "en",
	JAPANESE = "ja",
}

export enum APIStatus {
	FULFILLED = "FULFILLED",
	REJECTED = "REJECTED",
}

export const dateFormat = "YYYY/MM/DD";
export const apiDateFormat = "YYYY-MM-DD";
export const dateTimeFormat = "YYYY/MM/DD HH:mm";

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const integerRegex = /^\d*$/;
export const onlyPositiveNumbers = /^(0|[1-9]\d*)$/;
export const salesPlanInputRegex = /^[0-9]+$/;

export enum LocalStorageKeys {
	TOKEN = "TOKEN",
	ROLE = "ROLE",
}
