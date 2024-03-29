// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHUiQVSeELqxc31xyCIQT1wpn03ALDvQA",
  authDomain: "find-my-anime.firebaseapp.com",
  projectId: "find-my-anime",
  storageBucket: "find-my-anime.appspot.com",
  messagingSenderId: "306573549060",
  appId: "1:306573549060:web:f3b9ab4dc2319431421f51",
  measurementId: "G-SYHNWY1775",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
