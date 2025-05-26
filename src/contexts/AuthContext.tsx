
"use client";
import type { User, UserRole } from '@/types';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createContext, useCallback, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  type User as FirebaseUser
} from "firebase/auth";
import { app } from '@/lib/firebase'; // Ensure app is initialized here
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password_DO_NOT_USE: string, role: UserRole, actualPassword_USE_INSTEAD: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password_DO_NOT_USE: string, role: UserRole, actualPassword_USE_INSTEAD: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
const auth = getAuth(app);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthChange = useCallback(async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      try {
        const storedRole = localStorage.getItem(`placeon-user-role-${firebaseUser.uid}`);
        if (storedRole) {
          const appUser: User = { 
            uid: firebaseUser.uid, 
            email: firebaseUser.email || '', 
            role: storedRole as UserRole, 
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] 
          };
          setUser(appUser);
          // Redirect based on role after user state is set
          if (appUser.role === 'student') router.push('/student/dashboard');
          else if (appUser.role === 'company') router.push('/company/dashboard');
          else if (appUser.role === 'college') router.push('/college/dashboard');
        } else {
          // This case might happen if localStorage is cleared but user is still logged in Firebase
          // Or if signup process was interrupted. For now, log out.
          console.warn("User role not found in storage. Logging out.");
          await signOut(auth);
          setUser(null);
          localStorage.removeItem(`placeon-user-role-${firebaseUser.uid}`); // Clean up just in case
          router.push('/login?reason=role_missing');
        }
      } catch (error) {
        console.error("Error processing auth change:", error);
        setUser(null); // Ensure user is null on error
        router.push('/login?reason=auth_error');
      }
    } else {
      setUser(null);
      // No automatic redirect to login on logout, let components handle it or explicit logout call.
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe();
  }, [handleAuthChange]);

  const login = async (email: string, password_DO_NOT_USE_param_name_is_wrong_and_value_is_ignored: string, role: UserRole, actualPassword_USE_INSTEAD: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, actualPassword_USE_INSTEAD);
      // Store role in localStorage, onAuthStateChanged will pick it up
      localStorage.setItem(`placeon-user-role-${userCredential.user.uid}`, role);
      // onAuthStateChanged will handle setting user and redirecting
      // No need to call setLoading(false) here, onAuthStateChanged will do it.
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      setLoading(false);
      throw error; // Re-throw to be caught by LoginForm
    }
  };

  const signup = async (name: string, email: string, password_DO_NOT_USE_param_name_is_wrong_and_value_is_ignored: string, role: UserRole, actualPassword_USE_INSTEAD: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, actualPassword_USE_INSTEAD);
      await updateProfile(userCredential.user, { displayName: name });
      // Store role in localStorage, onAuthStateChanged will pick it up
      localStorage.setItem(`placeon-user-role-${userCredential.user.uid}`, role);
      // onAuthStateChanged will handle setting user and redirecting
      // No need to call setLoading(false) here, onAuthStateChanged will do it.
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create account.",
        variant: "destructive",
      });
      setLoading(false);
      throw error; // Re-throw to be caught by SignupForm
    }
  };

  const logout = async () => {
    setLoading(true);
    const currentFirebaseUser = auth.currentUser;
    if (currentFirebaseUser) {
      localStorage.removeItem(`placeon-user-role-${currentFirebaseUser.uid}`);
    }
    await signOut(auth);
    // onAuthStateChanged will set user to null and setLoading(false)
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
