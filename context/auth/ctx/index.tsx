import { createCtx } from "@/utiles/createCtx";
import { Credential } from "@/authCtx/entityType";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { User } from '@/context';
import {useAuth} from '@/hooks/useAuth'

export interface AuthContextType extends ContextCommonType {
  logIn: (credential:Credential) => User |null;
  signUp: (credential:Credential) => User |null;
  logOut: () => null;
}

const [useAuthContext, AuthContext] = createCtx<AuthContextType>();


const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>

};

export { useAuthContext, AuthContext ,AuthProvider};
