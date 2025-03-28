import { createSlice } from "@reduxjs/toolkit";
import { APIStatus } from "../../constants";
import {
	login,
} from "./user.service";

type LoginResponse = {
	token: string;
	role: string;
	name?: string;
	email?: string;
	id: number;
	storeId?: string;
	alreadyLoggedIn?: boolean;
};

export interface UserReducer {
	loginComplete: APIStatus.FULFILLED | APIStatus.REJECTED | null;
	user: LoginResponse;
}

const initialState: UserReducer = {
	loginComplete: null,
	user: {} as LoginResponse,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		clearLogin(state) {
			state.loginComplete = null;
		},
	},
	extraReducers(builder) {
		builder.addCase(login.fulfilled, (state, action) => {
			state.loginComplete = APIStatus.FULFILLED;
			state.user = action.payload.data;
		});
		builder.addCase(login.rejected, (state) => {
			state.loginComplete = APIStatus.REJECTED;
		});
	},
});

export const {
	clearLogin,
} = userSlice.actions;

export default userSlice.reducer;
