import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import for Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyBq7PjIcL7mweHm-hBn_VRZIU2mopHKpbE",
  authDomain: "hospital-management-859dc.firebaseapp.com",
  projectId: "hospital-management-859dc",
  storageBucket: "hospital-management-859dc.appspot.com",
  messagingSenderId: "840434274333",
  appId: "1:840434274333:web:c3678db46211a7220db6f4",
  databaseURL: "https://hospital-management-859dc-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Realtime Database
export const db = getFirestore(app);
export const auth = getAuth(app);
export const realtimeDb = getDatabase(app); // Add this line for Realtime Database
export default firebaseConfig;
