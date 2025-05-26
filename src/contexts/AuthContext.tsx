
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
  login: (email: string, role: UserRole, password_USE_INSTEAD: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, role: UserRole, password_USE_INSTEAD: string) => Promise<void>;
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
          setLoading(false); // User identified and set, loading done.

          const currentPath = window.location.pathname;
          const isOnAuthPage = currentPath === '/login' || currentPath === '/signup' || currentPath === '/';

          if (isOnAuthPage) { // Only redirect if on login/signup/landing page
            if (appUser.role === 'student') router.push('/student/dashboard');
            else if (appUser.role === 'company') router.push('/company/dashboard');
            else if (appUser.role === 'college') router.push('/college/dashboard');
          }
        } else {
          // Role missing for an authenticated Firebase user. This is an error state.
          // Sign them out. onAuthStateChanged will call this function again with firebaseUser = null.
          console.warn(`Role for Firebase user ${firebaseUser.uid} not found in localStorage. Signing out.`);
          await signOut(auth);
          // setLoading and setUser will be handled by the subsequent call to handleAuthChange
        }
      } catch (error) {
        console.error("Error processing auth change:", error);
        setUser(null); // Ensure user is null on error
        setLoading(false); // Set loading to false on error
        // Redirect to login if an error occurs during auth processing, unless already there
        if (window.location.pathname !== '/login') {
          router.push('/login?reason=auth_processing_error');
        }
      }
    } else {
      // User is null (logged out or initial state before Firebase auth check)
      setUser(null);
      setLoading(false); // No user, loading done.
    }
  }, [router, auth]); // Added auth to dependency array

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe();
  }, [handleAuthChange]);

  const login = async (email: string, role: UserRole, password: string) => {
    // The form's own isSubmitting state handles button loading.
    // AuthContext's loading state is managed by onAuthStateChanged.
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Store role in localStorage, onAuthStateChanged will pick it up
      localStorage.setItem(`placeon-user-role-${userCredential.user.uid}`, role);
      // onAuthStateChanged will handle setting user, context loading, and redirecting.
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      // If login fails, onAuthStateChanged won't fire with a new user.
      // The context's loading state (if it were set true here) would need reset.
      // However, we rely on onAuthStateChanged, so if it was initially true, it should become false.
      // If an error occurs, the current `loading` state might persist if not handled by onAuthStateChange,
      // but `handleAuthChange` (if it runs with user=null) should set loading to false.
      // To be safe, ensure loading is false if this specific async op fails.
      setLoading(false); 
      throw error; // Re-throw to be caught by LoginForm
    }
  };

  const signup = async (name: string, email: string, role: UserRole, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // Store role in localStorage, onAuthStateChanged will pick it up
      localStorage.setItem(`placeon-user-role-${userCredential.user.uid}`, role);
      // onAuthStateChanged will handle setting user, context loading, and redirecting.
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
    setLoading(true); // Indicate a change is happening
    const currentFirebaseUser = auth.currentUser;
    if (currentFirebaseUser) {
      localStorage.removeItem(`placeon-user-role-${currentFirebaseUser.uid}`);
    }
    await signOut(auth);
    // onAuthStateChanged will set user to null and setLoading(false)
    // It will also ensure layouts redirect if necessary.
    // Explicit redirect to login page after logout.
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
