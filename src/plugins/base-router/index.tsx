import React from "react";
import { Locations } from "../../constants/locations";

type BaseRouterProps = {
	children: React.ReactElement;
};

export const BaseRouter = (props: BaseRouterProps) => {


	if (window.location.pathname !== Locations.BASE) {
		return props.children;
	} else {
		window.location.href = Locations.LOGIN;
		return null;
	}
};
