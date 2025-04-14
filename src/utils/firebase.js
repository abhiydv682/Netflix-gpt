// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaJLvgJh9igwlraZrni6Uy_EgzobpI3hE",
  authDomain: "netflixgpt-79089.firebaseapp.com",
  projectId: "netflixgpt-79089",
  storageBucket: "netflixgpt-79089.firebasestorage.app",
  messagingSenderId: "287087999185",
  appId: "1:287087999185:web:9c37fd468db8d7e152adf0",
  measurementId: "G-CB32SF0FXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
