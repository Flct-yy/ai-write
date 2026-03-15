import { User } from "stream-chat";

const AuthenticatedApp = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  return (
    <div>
      <h1>Hello, {user.name}! </h1>
      <button onClick={onLogout}> Logout </button>
    </div>
  )
};

export default AuthenticatedApp;