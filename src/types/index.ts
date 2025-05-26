export type UserRole = 'student' | 'company' | 'college';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}
