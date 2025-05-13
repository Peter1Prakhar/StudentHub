import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { UserCredentials } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyAjDZAXtl4NRzHELDxCdzCTLY2I3hItoGA",
  authDomain: "studenthub-4de92.firebaseapp.com",
  projectId: "studenthub-4de92",
  storageBucket: "studenthub-4de92.firebasestorage.app",
  messagingSenderId: "866354010364",
  appId: "1:866354010364:web:980d104370e1f67b855f79",
  measurementId: "G-7HVRKGHHF5"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export const signIn = async ({ email, password }: UserCredentials): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user) {
      throw new Error('No user returned from Firebase');
    }
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(error.message || 'Failed to sign in');
  }
};

export const signUp = async ({ email, password }: UserCredentials): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (!userCredential.user) {
      throw new Error('No user returned from Firebase');
    }
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing up:', error);
    throw new Error(error.message || 'Failed to create account');
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Error signing out:', error);
    throw new Error(error.message || 'Failed to sign out');
  }
};

export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

export const subscribeToAuthChanges = (
  callback: (user: FirebaseUser | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };