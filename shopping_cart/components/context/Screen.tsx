import { createContext, useState } from "react";

export const Screen = createContext();

export const ScreenProvider = ({ children }) => {
  const [screen, setScreen] = useState("ProductCards");

  return (
    <Screen.Provider value={{ screen, setScreen }}>{children}</Screen.Provider>
  );
};
