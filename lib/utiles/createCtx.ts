import React from "react";

export function createCtx<ContextType>(): Readonly<
  [() => ContextType, React.Context<ContextType>]
> {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }
  return [useCtx, ctx] as const;
}
