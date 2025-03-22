// do not store it on client side
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfF39RQpnTCnbvkZy0kWW06LkJowRJxmo",
  authDomain: "email-password-auth-32b8b.firebaseapp.com",
  projectId: "email-password-auth-32b8b",
  storageBucket: "email-password-auth-32b8b.firebasestorage.app",
  messagingSenderId: "249377055123",
  appId: "1:249377055123:web:1a28a309bef831e6730866"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);