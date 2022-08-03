export interface UserInf {
  email: string;
  password: string;
}

export interface User {
  firstName: string;
  lastName: string;
  role: string;
  token: string;
}

export interface UserReports {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface ReportData {
  data: {
    Agreeableness: number;
    Drive: number;
    Luck: number;
    Openess: number;
  };
  type: string;
}

export interface UserForAdmin {
  first_name: string;
  last_name: string;
  email: string;
  groups: string[];
}
