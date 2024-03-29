import { auth, provider } from "../firebase.js"; // Adjust the path as necessary
import { signInWithPopup } from "firebase/auth";

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  };

  return (
    <div className="container rounded gx-0 gy-0">
      <div className="row rounded bg-black">
        <div className="col p-4">
          <h4 className="m-0 mb-1"> Sign in to Save Your Anime</h4>
          <button className="button-primary" onClick={signInWithGoogle}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
