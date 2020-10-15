import { Timer } from "@/context";
import { Group, GroupContextType } from "@/groupCtx";
import { User } from "@/userCtx";
import React from "react";

export const useGroupUsecase = (): GroupContextType => {
  const [group, setGroup] = React.useState<Group | null>(null);
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const create = (timer: Timer, owner: User): null => {
    return null;
  };
  const add = (member: User): null => {
    return null;
  };
  const remove = (userID: User["id"]): null => {
    return null;
  };

  return {
    group,
    onLoad,
    error,
    create,
    add,
    remove,
  };
};
