import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../config";
import { axiosConfig } from "../../utils/util.fns";

type UserDetails = {
	userCd: string;
	password: string;
};

export const login = createAsyncThunk("user/login", async (user: UserDetails) => {
	const response = await axios.post(Config.apiUrl + "/login", user);
	return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
	const response = await axios.get(Config.apiSecureUrl + "/logout", axiosConfig());
	return response.data;
});

