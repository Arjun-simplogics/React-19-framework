import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorBoundary } from "../plugins/error-boundary";
import { Locations } from "../constants/locations";
import { Login } from "../containers/login";

export const webRouter = createBrowserRouter([
	{
		path: Locations.LOGIN,
		element: <Login />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: "*",
		element: <Navigate to={Locations.BASE} />,
		errorElement: <ErrorBoundary />,
	},
]);
