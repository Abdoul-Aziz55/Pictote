// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvl0ak_mUFZHEe0uXOsvksfHGOJFdT4Aw",
  authDomain: "pictote-f3617.firebaseapp.com",
  projectId: "pictote-f3617",
  storageBucket: "pictote-f3617.appspot.com",
  messagingSenderId: "410704649337",
  appId: "1:410704649337:web:8fe37dd79b91d7ca1fc8a8",
  measurementId: "G-XYWZZXZC9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export{ auth, storage, db };
 