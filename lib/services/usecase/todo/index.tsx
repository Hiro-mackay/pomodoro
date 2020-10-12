import React from 'react';
import {Todo, TodoContextType} from '@/context'

export const useTodoUsecase = (): TodoContextType => {
  const [todo, setTodo] = React.useState<Todo | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const add = (todo: Todo): null => {
    return null
  };

  const update = (todoId: Todo['id'], title: Todo['title']): null => {
    return null
  };

  const remove = (): null => {
    return null
  };

  return {
    todo,
    loading,
    onLoad,
    error,
    add,
    update,
    remove
  };
};
