import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { rootReducer } from "../root-reducer";
import { loggerMiddleware } from "../middleware/logger";

export const store = configureStore({
	reducer: rootReducer,
	middleware:
		process.env.NODE_ENV !== "production"
			? (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(loggerMiddleware)
			: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
