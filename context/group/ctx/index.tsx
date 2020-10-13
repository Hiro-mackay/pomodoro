import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { Group } from '../entity';
import { ContextCommonType } from "@/utiles/contextCommonType";
import { useGroupUsecase } from "@/usecase/group";
import { Timer } from "@/context";
import { User } from "@/userCtx";

export interface GroupContextType extends ContextCommonType {
  group: Group | null;
  create: (timer: Timer, owner: User) => null;
  add: (member: User) => null;
  remove: (userID: User["id"]) => null;

};

const [useGroupContext, GroupContext] = createCtx<GroupContextType>();

const GroupProvider: React.FC = ({ children }) => {
  const group = useGroupUsecase();
  return <GroupContext.Provider value={group}>{children}</GroupContext.Provider>
};

export { useGroupContext, GroupContext, GroupProvider };