import { Modal } from "antd";
import { Config } from "../../config";
import { i18Get } from "../i18";

type ConfirmModalParams = {
	id: number;
	content: string;
	confirm(id: number): void;
	okButtonText: string;
};

const { confirm } = Modal;

export const confirmModal = (params: ConfirmModalParams) => {
	confirm({
		title: i18Get("CONFIRM_MODAL_TITLE", Config.defaultLanguage),
		content: i18Get(params.content, Config.defaultLanguage) + "?",
		okText: i18Get(params.okButtonText, Config.defaultLanguage),
		cancelText: i18Get("CANCEL_BTN", Config.defaultLanguage),
		onOk() {
			params.confirm(params.id);
		},
		onCancel() {
			console.log("cancel");
		},
	});
};
