import { createAction, props } from '@ngrx/store';
import { ReportData, User, UserForAdmin, UserInf, UserReports } from '../models/interfaces';


export const loginUser = createAction('[Taskact] Login',  props<{ userdata: UserInf}>());
export const loginUserSuccess = createAction('[Taskact] Login_SUCCESS',  props<{ user: User}>());
export const getReport = createAction('[Taskact] GET_REPORT');
export const getReportSuccess = createAction('[Taskact] GET_REPORT_SUCCESS', props<{ report: UserReports[]}>());
export const getReportFailure = createAction('[Taskact] GET_REPORT_Failure');
export const getReportData = createAction('[Taskact] GET_REPORT_DATA',  props<{ id: string }>());
export const getReportDataSuccess = createAction('[Taskact] GET_REPORT_DATA_SUCCESS',  props<{ reportData: ReportData}>());
export const getReportDataFailure = createAction('[Taskact] GET_REPORT_FAILURE');
export const getUsers = createAction('[Taskact] GET_USERS');
export const getUsersSuccess = createAction('[Taskact] GET_USERS_SUCCESS', props<{ user: UserForAdmin}>());
export const getUsersFailure = createAction('[Taskact] GET_USERS_FAILURE');
export const putForDownload = createAction('[Taskact] PUT_FOR_DOWNLOAD', props<{displayedColumns: string[], rows: UserForAdmin[]}>());



