import { Reducer, UnknownAction } from "@reduxjs/toolkit";
import { UserReducer } from "../services/user/user.slice";
import { TablePluginReducer } from "../services/table-plugin/table-plugin.slice";

export type RootReducer = {
	user: Reducer<UserReducer, UnknownAction>;
	tablePlugin: Reducer<TablePluginReducer, UnknownAction>;
};
