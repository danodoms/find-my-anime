import { auth, provider } from "../firebase"; // Adjust the path as necessary
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
      <div className="row g-2 flex-wrap rounded bg-black p-4">
        <h4 className="col flex-wrap align-self-center m-0 p-0">
          {" "}
          Sign in to Add Animes to your Library
        </h4>

        <button
          className="col-sm-4 flex-wrap btn btn-outline-primary"
          onClick={signInWithGoogle}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
