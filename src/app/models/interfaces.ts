export interface IUserInf {
  email: string;
  password: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

export interface IUserReports {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface IReportData {
  data: {
    Agreeableness: number;
    Drive: number;
    Luck: number;
    Openess: number;
  };
  type: string;
}

export interface IUserForAdmin {
  first_name: string;
  last_name: string;
  email: string;
  groups: string[];
}

export interface IColumns {
  name: string;
  key: string;
}
