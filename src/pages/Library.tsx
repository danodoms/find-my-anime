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
      <div className="flex flex-wrap p-4 gap-4">
        <UserLibrary user={user} loading={loading} />
      </div>

      <BottomNav />
    </div>
  );
}

export default Library;
