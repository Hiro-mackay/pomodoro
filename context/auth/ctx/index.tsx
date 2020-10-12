import { createCtx } from "@/utiles/createCtx";
import { Credential } from "../entityType";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { User } from '@/context';
import { useAuthUsecase } from '@/usecase/auth'

export interface AuthContextType extends ContextCommonType {
  logIn: (credential: Credential) => User | null;
  signUp: (credential: Credential) => User | null;
  logOut: () => null;
}

const [useAuthContext, AuthContext] = createCtx<AuthContextType>();


const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuthUsecase();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>

};

export { useAuthContext, AuthContext, AuthProvider };
