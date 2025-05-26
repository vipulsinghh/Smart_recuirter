
export type UserRole = 'student' | 'company' | 'college';

export interface User {
  uid: string; // Changed from id to uid to match Firebase
  email: string;
  role: UserRole;
  name?: string;
}
