import { createCtx } from "@/utiles/createCtx";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { useAuthUsecase } from '@/usecase/auth'
import { PROVIDER_TYPE } from "@/utiles/firebaseAuthProviderInterface";
import { UserCredential } from "../entity";


export interface AuthContextType extends ContextCommonType {
  userCredential: UserCredential;
  logIn: (provider: PROVIDER_TYPE) => Promise<void>;
  logOut: () => Promise<void>;
  onAuthState: () => Promise<void>;
}

const [useAuthContext, AuthContext] = createCtx<AuthContextType>();

const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuthUsecase();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export { useAuthContext, AuthContext, AuthProvider };
