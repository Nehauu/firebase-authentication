import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoS6lHFuBmfw6PifYqSFmQOckZshXaqME",
  authDomain: "tom-cruise-b8b68.firebaseapp.com",
  projectId: "tom-cruise-b8b68",
  storageBucket: "tom-cruise-b8b68.appspot.com",
  messagingSenderId: "1029481830807",
  appId: "1:1029481830807:web:3ee0ec2edc599bb25d8cd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
