import React from "react";
import { createCtx } from "@/utiles/createCtx";
import { Timer } from "../entity";
import { ContextCommonType } from "@/utiles/contextCommonType";
import { useTimerUsecase } from "@/usecase/timer";

export interface TimerContextType extends ContextCommonType {
  timer: Timer | null;
  start: () => null;
  stop: () => null;
  reset: () => null;
  create: () => null;
};

const [useTimerContext, TimerContext] = createCtx<TimerContextType>();

const TimerProvider: React.FC = ({ children }) => {
  const timer = useTimerUsecase();
  return <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
};

export { useTimerContext, TimerContext, TimerProvider };