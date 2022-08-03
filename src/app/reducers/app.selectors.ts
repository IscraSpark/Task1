import { createSelector } from "@ngrx/store";

export const selectUserInfoState = (state: any) => state;

export const selectUserReports = createSelector(
    selectUserInfoState,
    state => state.reducers.ELEMENT_DATA
  );

export const selectUserReportData = createSelector(
  selectUserInfoState,
  state => state.reducers.reportData
);

export const selectUserForAdmin = createSelector(
  selectUserInfoState,
  state => state.reducers.userForAdmin
);