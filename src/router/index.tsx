import React from "react";
import { RouterProvider } from "react-router-dom";
import { webRouter } from "../locations";
import { AuthRouter } from "../plugins/auth-router";
import { Modal, ModalProps } from "antd";

export const Router: React.FunctionComponent = () => {
	Modal.call("", {} as ModalProps);
	return (
		<AuthRouter>
			<div className="h-100">
				<RouterProvider router={webRouter} />
			</div>
		</AuthRouter>
	);
};
