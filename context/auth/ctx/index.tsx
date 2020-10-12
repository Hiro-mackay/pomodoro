import { createCtx } from "@/utiles/createCtx";
import { Credential } from "@/authCtx/entityType";
import { ContextProviderType } from "@/utiles/contextProviderType";
import { User } from '@/context';
import {useAuth} from '@/hooks/useAuth'

export interface AuthProviderType extends ContextProviderType {
  logIn: (credential:Credential) => User |null;
  signUp: (credential:Credential) => User |null;
  logOut: () => null;
}

const [useAuthContext, AuthContext] = createCtx<AuthProviderType>();


const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>

};

export { useAuthContext, AuthContext ,AuthProvider};
