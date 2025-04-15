import React from "react";
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import reportWebVitals from "./reportWebVitals";
import "./style.scss";
import "./assets/color.scss";
import "./assets/font.scss";
import "./assets/constants.scss";
import { setupInterceptors } from "./middleware/network";
import { Router } from "./router";
import { StyleProvider, legacyLogicalPropertiesTransformer } from "@ant-design/cssinjs";
import jaJP from "antd/lib/locale/ja_JP";
import { ConfigProvider } from "antd";

setupInterceptors();

let container = document.getElementById("root");
if (!container) {
	container = document.createElement("div");
	container.id = "root";
	document.body.appendChild(container);
}
const root = createRoot(container);

root.render(
	<StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
		<Provider store={store}>
			<ConfigProvider locale={jaJP}>
				<Router />
			</ConfigProvider>
		</Provider>
	</StyleProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
