import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import firebaseConfig from './firebaseConfig'; // Ensure this imports your config correctly

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Initialize Authentication and get a reference to the service
const auth = getAuth(app); // Initialize Firebase Authentication

// Export both db and auth
export { db, auth };
