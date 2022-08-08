import { createSelector } from '@ngrx/store';

export const selectUserInfoState = (state: any) => state;

export const selectUserReports = createSelector(
  selectUserInfoState,
  (state) => state.reducers.elementData
);

export const selectUserReportData = createSelector(
  selectUserInfoState,
  (state) => state.reducers.reportData
);

export const selectUserForAdmin = createSelector(
  selectUserInfoState,
  (state) => state.reducers.userForAdmin
);

export const selectDataToDownload = createSelector(
  selectUserInfoState,
  (state) => {
    let data = {
      columns: state.reducers.displayedColumns,
      rows: state.reducers.rows,
    };
    return data;
  }
);
