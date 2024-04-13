import { signInWithGoogle } from "../Utilities";

function SignInModal() {
  console.log("Displaying Sign In Modal");

  {
    /* Open the modal using document.getElementById('ID').showModal() method */
  }
  //  <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
  return (
    <dialog id="sign-in-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Unlock this Feature</h3>
        <p className="py-4">Sign In to add Animes to your Library</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn mr-4">Close</button>
            <button className="btn btn-primary" onClick={signInWithGoogle}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default SignInModal;
