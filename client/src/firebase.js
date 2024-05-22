// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_KEY,
//   authDomain: "collegesell-a1bb1.firebaseapp.com",
//   projectId: "collegesell-a1bb1",
//   storageBucket: "collegesell-a1bb1.appspot.com",
//   messagingSenderId: "95121187340",
//   appId: "1:95121187340:web:edf391b5c7c417e79ac429"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "collegesell-7124.firebaseapp.com",
  projectId: "collegesell-7124",
  storageBucket: "collegesell-7124.appspot.com",
  messagingSenderId: "84801240804",
  appId: "1:84801240804:web:8fbc2bfdd16d9af4e4b6f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);