import React from 'react';
import { AuthContextType, User } from '@/context';
import { AuthProvider } from '@/authentication'
import {PROVIDER_TYPE} from '@/utiles/firebaseAuthProviderInterface'

export const useAuthUsecase = (): AuthContextType => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const authProvider = new AuthProvider();

  const logIn = async (provider: PROVIDER_TYPE): Promise<User | null> => {
    setLoading(true);
    try {
      const userCredential = await authProvider.logIn(provider);
      setLoading(false);
      return authProvider.toUserEntity(userCredential.user)
    } catch (error) {
      setError(error)
    }
  };
  
  const logOut = async (): Promise<void> => {
    try {
      return await authProvider.logOut()
    } catch (error) {
      setError(error)
    }
  };

  const onAuthState = async (): Promise<User | null> => {
    try {
      const user = await authProvider.onAuthState();
      return authProvider.toUserEntity(user);
    } catch (error) {
      setError(error)
    }
  }

  return {
    loading,
    onLoad,
    error,
    logIn,
    logOut,
    onAuthState
  };
};