import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { User } from "../entity";
import { ContextProviderType } from "@/utiles/contextProviderType";
import { useUser } from "@/hooks/useUser";

export interface UserContextType extends ContextProviderType {
  user: User;
  create: (user:User) => null;
  update: (use:User) => null;
};

const [useUserContext, UserContext] = createCtx<UserContextType>();

const UserProvider: React.FC = ({ children }) => {
  const user = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export { useUserContext, UserContext, UserProvider };