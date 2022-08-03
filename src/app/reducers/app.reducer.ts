import { Action, createReducer, on } from '@ngrx/store';
import { ReportData, User, UserForAdmin, UserReports } from '../interfaces';
import { appActions } from '.';
import { 
  getReportSuccess, 
  getReport, 
  loginUserSuccess, 
  getReportDataSuccess,
  getUsersSuccess
} from './app.actions';
import { state } from '@angular/animations';


export const redTaskFeatureKey = 'redTask';

export interface StateUser {
 user: User,
 ELEMENT_DATA: UserReports[],
 reportData: ReportData,
 userForAdmin: UserForAdmin
}

export const initialState: StateUser = {
  user: { firstName: '', lastName: '', role:'', token: ''},
  ELEMENT_DATA: [],
  reportData: {
    data: {
      Agreeableness: 0,
      Drive: 0,
      Luck: 0,
      Openess: 0,
    },
    type: ''
  },
  userForAdmin: {
    first_name: '',
    last_name: '',
    email: '',
    groups: []
  },
};

export function userReducer(state: StateUser | undefined, action: Action) {
  return reducer(state, action);
}

export const reducer = createReducer<StateUser>(
  initialState,
  on(getReport, (state) => ({
    ...state
  })),
  on(getReportSuccess,(state, {repo}) =>({
    ...state,
    ELEMENT_DATA: repo
  })),
  on(loginUserSuccess, (state, {user}) =>({
    ...state,
    user: user
  })),
  on(getReportDataSuccess, (state, {reportData}) => ({
    ...state,
    reportData: reportData
  })),
  on(getUsersSuccess, (state, {user}) => ({
    ...state,
    userForAdmin: user
  })),
);


