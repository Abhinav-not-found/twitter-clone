
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBR5B78SD977p9XMJ-fe72voe9kVbcvZfo",
  authDomain: "twitter-clone-82c41.firebaseapp.com",
  projectId: "twitter-clone-82c41",
  storageBucket: "twitter-clone-82c41.firebasestorage.app",
  messagingSenderId: "402710839803",
  appId: "1:402710839803:web:af8944af4abc8d802b8b5e",
  measurementId: "G-RDL4WM1JX2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

