interface IUserRolesGet {
  _id: string;
  roleName: string;
  roleLevel: number;
  roleStatus: boolean;
  createBy: string;
  users: string[];
  createdOn: Date;
}

export interface IUserDataGet {
  _id: string;
  firstName: string;
  surname: string;
  ldapUid: string;
  email: string;
  displayName: string;
  rolesId: IUserRolesGet;
  workId: {
    _id: string;
    reportsTo: string;
    workReportStatus: boolean;
  }[];
  title: string;
  phone: string;
  userStatus: boolean;
}
