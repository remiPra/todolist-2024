// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT6J24_YPa694P6qhrYmZyBNku3iK3iFA",
  authDomain: "daily-moments-41098.firebaseapp.com",
  databaseURL: "https://daily-moments-41098.firebaseio.com",
  projectId: "daily-moments-41098",
  storageBucket: "daily-moments-41098.appspot.com",
  messagingSenderId: "541330805336",
  appId: "1:541330805336:web:3a4224b7667aa6d0a6302d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };