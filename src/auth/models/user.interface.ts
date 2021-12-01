import { Role } from './role.enum';

export interface UserInterface {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role: Role;
}
