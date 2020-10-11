import React,{createContext, useContext, } from 'react';
import { createCtx } from '@/utiles/createCtx';
import { Credintial } from '@/authCtx/entityType';
import {ContextProviderType} from '@/utiles/contextProviderType'


interface AuthProviderType extends ContextProviderType {
  credintial: Credintial;
  setCredential: any;
  logIn: any;
  signUp: any;
  logOut: any
}

const [useAuthContext, authContext] = createCtx<AuthProvAuthProviderTypeiderType>();
const authProvider = authContext.Provider

export { useAuthContext , authContext, authProvider};
