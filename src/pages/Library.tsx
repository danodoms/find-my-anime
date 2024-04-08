import BottomNav from "../components/BottomNav";
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
  return (
    <div>
      <div className="flex flex-wrap p-2 gap-4">
        <UserLibrary userProp={user} loading={loading} />
      </div>
    </div>
  );
}

export default Library;
