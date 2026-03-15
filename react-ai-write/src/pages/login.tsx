
import { User } from "stream-chat";

interface LoginProps {
  onLogin: (authenticatedUser: User) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default Login;
