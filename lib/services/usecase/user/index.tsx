import React from 'react';
import { User, UserContextType } from '@/context';

export const useUserUsecase = (): UserContextType => {
  const [user, setUser] = React.useState<User | null>(null);
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const create = (user: User): null => {
    return null
  };

  const update = (user: User): null => {
    return null
  };

  return {
    user,
    onLoad,
    error,
    create,
    update
  };
};
