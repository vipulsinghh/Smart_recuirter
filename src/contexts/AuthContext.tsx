
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
        } else {
          // Role missing for an authenticated Firebase user. Sign them out.
          console.warn(`Role for Firebase user ${firebaseUser.uid} not found in localStorage. Signing out.`);
          await signOut(auth); // This will re-trigger handleAuthChange with firebaseUser = null
          return; // Let the subsequent call handle setUser(null) and setLoading(false)
        }
      } catch (error) {
        console.error("Error processing auth change:", error);
        setUser(null); // Ensure user is null on error
        toast({
            title: "Authentication Error",
            description: "There was an issue verifying your session. Please log in again.",
            variant: "destructive",
        });
      } finally {
        // setLoading(false) is called here regardless of whether a role was found or an error occurred,
        // as long as firebaseUser was initially present. If signOut was called, 
        // the subsequent handleAuthChange(null) call will handle setLoading(false).
        if (auth.currentUser) { // only set loading false if we didn't just sign out the user
             setLoading(false);
        }
      }
    } else {
      // User is null (logged out or initial state before Firebase auth check)
      setUser(null);
      setLoading(false); // No user, loading done.
    }
  }, [auth, toast]); // router removed as dependency, toast added

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe();
  }, [handleAuthChange]);
  
  useEffect(() => {
    // This effect handles redirection after user state is confirmed by handleAuthChange.
    if (!loading && user) {
      const currentPath = window.location.pathname;
      const isOnAuthPage = currentPath === '/login' || currentPath === '/signup' || currentPath === '/';
      if (isOnAuthPage) {
        if (user.role === 'student') router.push('/student/dashboard');
        else if (user.role === 'company') router.push('/company/dashboard');
        else if (user.role === 'college') router.push('/college/dashboard');
      }
    }
    // If !loading and !user, and on a protected page, the layout's own useEffect will handle redirection to /login.
  }, [user, loading, router]);

  const login = async (email: string, role: UserRole, password_USE_INSTEAD: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password_USE_INSTEAD);
      localStorage.setItem(`placeon-user-role-${userCredential.user.uid}`, role);
      // onAuthStateChanged (via handleAuthChange) will set user, and the useEffect will redirect.
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      // setLoading(false); // Not needed here, handleAuthChange and form's finally block manage loading
      throw error; 
    }
  };

  const signup = async (name: string, email: string, role: UserRole, password_USE_INSTEAD: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password_USE_INSTEAD);
      await updateProfile(userCredential.user, { displayName: name });
      localStorage.setItem(`placeon-user-role-${userCredential.user.uid}`, role);
      // onAuthStateChanged (via handleAuthChange) will set user, and the useEffect will redirect.
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create account.",
        variant: "destructive",
      });
      // setLoading(false); // Not needed here
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true); 
    const currentFirebaseUser = auth.currentUser;
    if (currentFirebaseUser) {
      localStorage.removeItem(`placeon-user-role-${currentFirebaseUser.uid}`);
    }
    await signOut(auth);
    // onAuthStateChanged will set user to null and eventually setLoading(false).
    router.push('/login'); 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
