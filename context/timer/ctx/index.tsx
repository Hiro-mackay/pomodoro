import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { Timer } from "../entityType";
import { ContextProviderType } from "@/utiles/contextProviderType";
import { useTimer } from "@/hooks/useTimer";

export interface TimerContextType extends ContextProviderType {
  timer: Timer;
  start: () => null;
  stop: () => null;
  reset: () => null;
  create: () => null;
};

const [useTimerContext, TimerContext] = createCtx<TimerContextType>();

const TimerProvider: React.FC = ({ children }) => {
  const timer = useTimer();
  return <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
};

export { useTimerContext, TimerContext, TimerProvider };