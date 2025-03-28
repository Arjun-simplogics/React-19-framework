import React from "react";
import I18 from "../i18";

type LoadingProps = {
	shade?: boolean;
	overlay?: boolean;
};

export const Loading: React.FunctionComponent<LoadingProps> = (props) => {
	return (
		<div
			className={`h-100 d-flex align-items-center justify-content-center ${props.shade ? "shade_loading" : ""} ${
				props.overlay ? "overlay_loading" : ""
			}`}
		>
			<I18 tkey="LOADING" />
			...
		</div>
	);
};
