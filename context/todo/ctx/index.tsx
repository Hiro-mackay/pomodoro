import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { Todo } from "../entity";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { useTodo } from "@/hooks/useTodo";

export interface TodoContextType extends ContextCommonType {
  todo: Todo | null;
  add: (todo:Todo) => null;
  remove: (todoId: Todo['id']) => null;
  update: (todoId: Todo['id'], title: Todo['title']) => null;
};

const [useTodoContext, TodoContext] = createCtx<TodoContextType>();

const TodoProvider: React.FC = ({ children }) => {
  const todo = useTodo();
  return <TodoContext.Provider value={todo}>{children}</TodoContext.Provider>
};

export { useTodoContext, TodoContext, TodoProvider };