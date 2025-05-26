"use client";
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { saveUserData } from '../lib/firebase'; // Make sure this path is correct relative to useAuth.ts

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider'); // This line should already be in the code
  }
  return context;
}

// Assuming AuthContext has a structure like this for the signup function
// You might need to adjust based on the actual implementation of AuthContext and its signup function
/*
interface AuthContextType {
  user: any; // Or your user type
  loading: boolean;
  signup: (
    name: string,
    email: string,
    role: UserRole,
    password: string,
    skills: string,
    tenthMarks: number,
    twelfthMarks: number,
    cgpa: number,
    additionalCertificates: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);
*/

