import { createCtx } from "@/utiles/createCtx";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { User } from '@/context';
import { useAuthUsecase } from '@/usecase/auth'
import { PROVIDER_TYPE } from "@/utiles/firebaseAuthProviderInterface";

export interface AuthContextType extends ContextCommonType {
  logIn: (provider: PROVIDER_TYPE) => Promise<User | null>;
  logOut: () => Promise<void>;
  onAuthState: () => Promise<User | null>;
}

const [useAuthContext, AuthContext] = createCtx<AuthContextType>();


const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuthUsecase();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>

};

export { useAuthContext, AuthContext, AuthProvider };
