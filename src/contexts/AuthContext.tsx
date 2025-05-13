import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { 
  subscribeToAuthChanges, 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser
} from '../services/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    // Check if there's a current user when the component mounts
    const user = getCurrentUser();
    if (user) {
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    }

    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const user = await signIn({ email, password });
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const user = await signUp({ email, password });
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (err) {
      setError('Failed to create account. This email might already be in use.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setCurrentUser(null);
    } catch (err) {
      setError('Failed to sign out.');
      console.error('Sign out error:', err);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};