import { Setting } from "./setting";

export class User {
  firstName: string;
  lastName: string;
  id: string;
  role: string;
  accountName: string;
  email: string;
  password: string;
  token: string;
  consented: boolean;
  settings: {
    privacy: Setting[];
  };
}
