import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { User } from "../entity";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { useUserUsecase } from "@/usecase/user";

export interface UserContextType extends ContextCommonType {
  user: User;
  create: (user: User) => null;
  update: (use: User) => null;
};

const [useUserContext, UserContext] = createCtx<UserContextType>();

const UserProvider: React.FC = ({ children }) => {
  const user = useUserUsecase();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export { useUserContext, UserContext, UserProvider };