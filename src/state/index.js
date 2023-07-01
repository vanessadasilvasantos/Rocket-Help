import React from "react";
import { useState, createContext } from "react";

export const StateContext = createContext();

export function StateProvider({ children }) {
  const [solucao, setSolucao] = useState("");

  return (
    <StateContext.Provider value={{ solucao, setSolucao }}>
      {children}
    </StateContext.Provider>
  );
}
