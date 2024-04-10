// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDDfQQ_gFed4S_xZRRNmkLVsC6InpoB_Q",
  authDomain: "localbusinessmarketplace.firebaseapp.com",
  projectId: "localbusinessmarketplace",
  storageBucket: "localbusinessmarketplace.appspot.com",
  messagingSenderId: "25314026003",
  appId: "1:25314026003:web:b2dbc53650185fcb7315e6",
  measurementId: "G-6S1NRJP8DT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);