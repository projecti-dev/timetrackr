import { createSelector } from "reselect";
import { RootState } from "../index";

export const selectAuthState = (state: RootState) => state.auth;

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user,
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => !!auth.user,
);

export const selectAuthError = createSelector(
  [selectAuthState],
  (auth) => auth.error,
);

export const selectAuthLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading,
);
