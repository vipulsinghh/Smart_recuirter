
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Analytics can be added if needed

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGAoToy_hyfsY7JK-3WqogDGIw_fb8Dpo",
  authDomain: "smart-recruiter-7b999.firebaseapp.com",
  projectId: "smart-recruiter-7b999",
  storageBucket: "smart-recruiter-7b999.firebasestorage.app",
  messagingSenderId: "228326034238",
  appId: "1:228326034238:web:046a097b59b45e7f643a6f",
  measurementId: "G-E0EHYYJVC7"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);
const auth = getAuth(app);
// const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Initialize analytics only on client

async function saveUserData(userId: string, name: string, email: string, role: string, skills?: string, tenthMarks?: number, twelfthMarks?: number, cgpa?: number, additionalCertificates?: string) {
  try {
    await setDoc(doc(db, "users", userId), {
      name,
      email,
      role,
      skills: skills || "",
      tenthMarks: tenthMarks || null,
      twelfthMarks: twelfthMarks || null,
      cgpa: cgpa || null,
      additionalCertificates: additionalCertificates || "",
    });
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
}

export { app, auth, db, saveUserData };
