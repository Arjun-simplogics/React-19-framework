import { Config } from "../../config";
import { i18Get } from "../i18";
import { Modal } from "antd";

type DeleteModalParams = {
	id: number;
	content: string;
	delete(id: number): void;
};

const { confirm } = Modal;

export const deleteModal = (params: DeleteModalParams) => {
	confirm({
		title: i18Get("DELETE_MODAL_TITLE", Config.defaultLanguage),
		content: i18Get(params.content, Config.defaultLanguage),
		okText: i18Get("DELETE_BTN", Config.defaultLanguage),
		cancelText: i18Get("CANCEL_BTN", Config.defaultLanguage),
		okType: "danger",
		onOk() {
			params.delete(params.id);
		},
		onCancel() {
			console.log("cancel");
		},
	});
};
