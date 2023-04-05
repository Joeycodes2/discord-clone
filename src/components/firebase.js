import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const analytics = getAnalytics(app);
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import {getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";

// app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_FisoLgJBUg7T-l6u4IoLveGVt6xJJ1Y",
  authDomain: "discord-clone-bcf16.firebaseapp.com",
  projectId: "discord-clone-bcf16",
  storageBucket: "discord-clone-bcf16.appspot.com",
  messagingSenderId: "339310599996",
  appId: "1:339310599996:web:09e85268b41dd3e4ff0839",
  measurementId: "G-PQ2X06K0D2"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

 
export {db, auth, signInWithGoogle, logout, }; 