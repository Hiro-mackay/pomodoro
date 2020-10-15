import React from 'react';
import { AuthContextType, UserCredential } from '@/context';
import { AuthProvider, UserAuthenticationInfo } from '@/authentication'
import { PROVIDER_TYPE } from '@/utiles/firebaseAuthProviderInterface'

export const useAuthUsecase = (): AuthContextType => {
  const [userCredential, setUserCredential] = React.useState<UserCredential>({
    status: 'out',
    user: null,
    token: null
  });
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const authProvider = new AuthProvider();

  const logIn = async (provider: PROVIDER_TYPE) => {
    setOnLoad(false);
    try {
      const userCredential = await authProvider.logIn(provider);
      const authState = await authProvider.getUserAuthenData(userCredential.user);
      setOnLoad(true);
      setUserCredentialHelper(authState);
    } catch (error) {
      setError(error)
      setOnLoad(true);
    }
  };
  
  const logOut = async () => {
    setOnLoad(false);
    try {
      await authProvider.logOut();
      setOnLoad(true);
      setUserCredentialHelper();
    } catch (error) {
      setError(error)
      setOnLoad(true);
    }
  };

  const onAuthState = async () => {
    try {
      const authState = await authProvider.onAuthState();
      setOnLoad(true);
      setUserCredentialHelper(authState);
    } catch (error) {
      setError(error)
      setOnLoad(true);
    }
  };

  const setUserCredentialHelper = (authState: UserAuthenticationInfo | void) => {
    if (authState) {
      const [user, token] = authState
      setUserCredential({
        status: 'in',
        user: authProvider.toUserEntity(user),
        token
      });
    } else {
      setUserCredential({
        status: 'out',
        user: null,
        token: null
      });
    };
  }

  return {
    onLoad,
    error,
    logIn,
    logOut,
    onAuthState
  };
};