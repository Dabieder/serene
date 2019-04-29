export class User {
  id: string;
  accountName: string;
  email: string;
  token: string;
  consented: boolean;
  settings: {};
  role: Role;
}

export enum Role {
  User = "Learner",
  Administrator = "Administrator"
}
