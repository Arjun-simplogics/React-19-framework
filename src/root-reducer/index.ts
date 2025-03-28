import { RootReducer } from "../modal/root-reducer";
import userReducer from "../services/user/user.slice";
import tablePluginReducer from "../services/table-plugin/table-plugin.slice";

export const rootReducer: RootReducer = {
	user: userReducer,
	tablePlugin: tablePluginReducer,
};
