import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { Todo } from "../entity";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { useTodoUsecase } from "@/usecase/todo";

export interface TodoContextType extends ContextCommonType {
  todo: Todo | null;
  add: (todo:Todo) => null;
  remove: (todoId: Todo['id']) => null;
  update: (todoId: Todo['id'], title: Todo['title']) => null;
};

const [useTodoContext, TodoContext] = createCtx<TodoContextType>();

const TodoProvider: React.FC = ({ children }) => {
  const todo = useTodoUsecase();
  return <TodoContext.Provider value={todo}>{children}</TodoContext.Provider>
};

export { useTodoContext, TodoContext, TodoProvider };