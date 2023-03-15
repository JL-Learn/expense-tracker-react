// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_APIKEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyD8WzM5_1S9NhOgkqJMjRKR-K7xXzfeZzw",
  authDomain: "expense-tracker-1edf7.firebaseapp.com",
  projectId: "expense-tracker-1edf7",
  storageBucket: "expense-tracker-1edf7.appspot.com",
  messagingSenderId: "457635682567",
  appId: "1:457635682567:web:278edf57907b88e9f64da2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;