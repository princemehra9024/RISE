// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace this object with your actual Firebase config!
const firebaseConfig = {
  apiKey: "AIzaSyCGxY-GTffKT1d5iN1DSMOzPA5P73NCeRw",
  authDomain: "student-dashboard-514ce.firebaseapp.com",
  projectId: "student-dashboard-514ce",
  messagingSenderId: "1037843166676",
  appId: "1:1037843166676:web:1ed5d4f90835ad5f919241",
  measurementId: "G-28NXMQNQPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
