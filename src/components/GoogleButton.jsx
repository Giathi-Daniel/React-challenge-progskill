import { useAuth } from "../context/AuthContext";
import { signInWithGoogle, logout } from "../../firebase";

const GoogleAuthButton = () => {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading)
    return <div className="animate-pulse">Loading auth state...</div>;

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 border-2 border-white rounded-full"
            />
            <span className="font-medium text-white">{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 px-4 py-2 text-gray-800 transition-colors bg-white rounded-lg hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default GoogleAuthButton;
