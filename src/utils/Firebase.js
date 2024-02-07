// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI7g1vnC7JQiVnVcxjSfzgQgHSjDjEfno",
  authDomain: "netflixgpt-94bf0.firebaseapp.com",
  projectId: "netflixgpt-94bf0",
  storageBucket: "netflixgpt-94bf0.appspot.com",
  messagingSenderId: "854600771880",
  appId: "1:854600771880:web:8a0c66ed89e91ad9d9081d",
  measurementId: "G-NZ851EP2Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();