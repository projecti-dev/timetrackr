import { createSelector } from "reselect";
import { RootState } from "../index";

export const selectSessionState = (state: RootState) => state.session;

export const selectActiveSession = createSelector(
  [selectSessionState],
  (session) => session.activeSession,
);

export const selectStats = createSelector(
  [selectSessionState],
  (session) => session.stats,
);

export const selectSessionLoading = createSelector(
  [selectSessionState],
  (session) => session.isLoading,
);

export const selectSessionError = createSelector(
  [selectSessionState],
  (session) => session.error,
);
