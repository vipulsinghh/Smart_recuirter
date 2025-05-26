"use client";
import type { User, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  // signup: (name: string, email: string, role: UserRole) => Promise<void>; // Example for future
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadUserFromStorage = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('placeon-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from storage", error);
      localStorage.removeItem('placeon-user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const login = async (email: string, role: UserRole) => {
    setLoading(true);
    // Mock login
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: Date.now().toString(), email, role, name: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('placeon-user', JSON.stringify(mockUser));
    setLoading(false);
    
    // Redirect based on role
    if (role === 'student') router.push('/student/dashboard');
    else if (role === 'company') router.push('/company/dashboard');
    else if (role === 'college') router.push('/college/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('placeon-user');
    router.push('/login');
  };

  // const signup = async (name: string, email: string, role: UserRole) => {
  //   setLoading(true);
  //   // Mock signup
  //   await new Promise(resolve => setTimeout(resolve, 500));
  //   const mockUser: User = { id: Date.now().toString(), email, role, name };
  //   setUser(mockUser);
  //   localStorage.setItem('placeon-user', JSON.stringify(mockUser));
  //   setLoading(false);
  //   if (role === 'student') router.push('/student/dashboard');
  //   else if (role === 'company') router.push('/company/dashboard');
  //   else if (role === 'college') router.push('/college/dashboard');
  // };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
