
import { ChatProvider } from "/@/providers/chat-provider";
import AuthenticatedCore from "./AuthenticatedCore";
import { User } from "stream-chat";

interface AuthenticatedAppProps {
  user: User;
  onLogout: () => void;
}

const AuthenticatedApp = ({ user, onLogout }: AuthenticatedAppProps) => (
  <ChatProvider user={user}>
    <AuthenticatedCore user={user} onLogout={onLogout} />
  </ChatProvider>
);

export default AuthenticatedApp