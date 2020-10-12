import React from 'react';
import { Credential, AuthProviderType , User} from '@/context';

export const useAuth = (): AuthProviderType => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);


  const logIn = (credential: Credential): User | null => {
    return null
  };

  const signUp = (credential: Credential): User | null => {
    return null
  };

  

  const logOut = (): null => {
    return null
  };

  return {
    loading,
    onLoad,
    error,
    logIn,
    signUp,
    logOut
  };
};