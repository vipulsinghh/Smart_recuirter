
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
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

const auth = getAuth(app);
// const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null; // Initialize analytics only on client

export { app, auth };
