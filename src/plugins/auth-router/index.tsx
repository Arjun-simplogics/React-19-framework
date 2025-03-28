import React from "react";
import { LocalStorageKeys } from "../../constants";
import { Locations } from "../../constants/locations";

type AuthRouterProps = {
	children: React.ReactElement;
};

export const AuthRouter = (props: AuthRouterProps) => {
	const token = sessionStorage.getItem(LocalStorageKeys.TOKEN);

	if (token && [Locations.LOGIN].includes(window.location.pathname as Locations)) {
		window.location.href = Locations.BASE;
		return null;
	} else if (token && !["null", "undefined"].includes(token ?? "")) {
		return props.children;
	} else if (!token && [Locations.LOGIN].includes(window.location.pathname as Locations)) {
		return props.children;
	} else {
		sessionStorage.removeItem(LocalStorageKeys.TOKEN);
		sessionStorage.removeItem(LocalStorageKeys.ROLE);
		window.location.href = Locations.LOGIN;
		return null;
	}
};
