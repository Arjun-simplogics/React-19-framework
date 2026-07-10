import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "../plugins/error-boundary";
import { Locations } from "../constants/locations";
import { Login } from "../containers/login";
import { BaseRouter } from "../plugins/base-router";
import { MainContainer } from "../containers/main-container";

export const webRouter = createBrowserRouter([
	{
		path: Locations.LOGIN,
		element: <Login />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: Locations.BASE,
		element: (
			<BaseRouter>
				<MainContainer />
			</BaseRouter>
		),
		errorElement: <ErrorBoundary />,
		children: [],
	},
	{
		path: "*",
		element: <Navigate to={Locations.BASE} />,
		errorElement: <ErrorBoundary />,
	},
]);
