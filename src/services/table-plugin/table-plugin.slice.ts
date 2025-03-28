import { createSlice } from "@reduxjs/toolkit";

export type TablePluginReducer = {
	resetPage: boolean;
};

const initialState: TablePluginReducer = {
	resetPage: false,
};

const tablePluginSlice = createSlice({
	name: "tablePlugin",
	initialState,
	reducers: {
		resetPage(state) {
			state.resetPage = true;
		},
		clearResetPage(state) {
			state.resetPage = false;
		},
	},
});

export const { resetPage, clearResetPage } = tablePluginSlice.actions;

export default tablePluginSlice.reducer;
