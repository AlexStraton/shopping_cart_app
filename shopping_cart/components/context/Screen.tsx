import React, { createContext, useState, ReactNode } from "react";

export interface ScreenContextType {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

export const Screen = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<string>("ProductCards");

  return (
    <Screen.Provider value={{ screen, setScreen }}>
      {children}
    </Screen.Provider>
  );
};

