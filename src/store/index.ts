import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import sessionReducer from "./reducers/sessionReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
