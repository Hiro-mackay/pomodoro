import React from 'react'
import { TimerContextType, Timer } from '@/context';


export const useTimerUsecase = (): TimerContextType => {
  const [timer, setTimer] = React.useState<Timer | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false);
  const [onLoad, setOnLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const start = (): null => {
    return null
  };

  const stop = (): null => {
    return null
  };

  const reset = (): null => {
    return null
  };

  const create = (): null => {
    return null
  };

  return {
    timer,
    loading,
    onLoad,
    error,
    start,
    stop,
    reset,
    create,
  }
};
