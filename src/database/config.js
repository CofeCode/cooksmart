import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbKZ6XI4ndlEuiyHnUpxKFvkH-1_3R5ms",
  authDomain: "cooksmart-fda2f.firebaseapp.com",
  projectId: "cooksmart-fda2f",
  storageBucket: "cooksmart-fda2f.appspot.com",
  messagingSenderId: "717853257977",
  appId: "1:717853257977:web:377b6ff95284caaf4eb228"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
