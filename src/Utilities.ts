import { auth, provider } from "./firebase"; // Adjust the path as necessary
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";

export function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      console.log(result);
    })
    .catch((error) => {
      // Handle Errors here.
      console.error(error);
    });
}

export function handleSignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}
