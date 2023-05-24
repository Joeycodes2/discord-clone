import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_FisoLgJBUg7T-l6u4IoLveGVt6xJJ1Y",
  authDomain: "discord-clone-bcf16.firebaseapp.com",
  projectId: "discord-clone-bcf16",
  storageBucket: "discord-clone-bcf16.appspot.com",
  messagingSenderId: "339310599996",
  appId: "1:339310599996:web:09e85268b41dd3e4ff0839",
  measurementId: "G-PQ2X06K0D2",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
