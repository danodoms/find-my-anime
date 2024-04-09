import UserLibrary from "../components/UserLibrary";

interface AuthUser {
  photoURL: string;
  uid: string;
  displayName: string;
}

interface LibraryProps {
  user: AuthUser;
  loading: boolean;
  error?: Error;
}
function Library({ user, loading }: LibraryProps) {
  //@ts-ignore
  return (
    <>
      <div className="flex flex-wrap p-2 justify-center gap-4 ">
        {user ? (
          <UserLibrary user={user} loading={loading} />
        ) : (
          <div className="flex flex-col gap-4 content-center justify-center h-dvh">
            <img
              className="flex-1 h-1/2 px-10 m-h-min self-center content-end pt-20   "
              src="/icons/login.svg"
              alt=""
            />
            <h1 className="text-2xl md:text-3xl text-center flex-auto content-start text-pretty font-bold m-0 px-10">
              Sign In to Add Animes to Your Library
            </h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Library;
