import { Modal } from "antd";
import { Config } from "../../config";
import { i18Get } from "../i18";
import { ReactElement } from "react";

type ConfirmModalParams = {
	id: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	content: ReactElement<any, any> | string;
	confirm(id: number): void;
	okButtonText: string;
	className?: string;
};

const { confirm } = Modal;

export const confirmModalElementContent = (params: ConfirmModalParams) => {
	confirm({
		title: i18Get("CONFIRM_MODAL_TITLE", Config.defaultLanguage),
		content: params.content,
		okText: i18Get(params.okButtonText, Config.defaultLanguage),
		cancelText: i18Get("CANCEL_BTN", Config.defaultLanguage),
		onOk() {
			params.confirm(params.id);
		},
		onCancel() {
			console.log("cancel");
		},
		className: params.className,
	});
};
