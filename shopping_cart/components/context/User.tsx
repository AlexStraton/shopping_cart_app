import React, { createContext, useState, ReactNode } from 'react';
export interface UserType {
  user_id: number;
}
export interface UserContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export const User = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>({ user_id: 1 });

  return (
    <User.Provider value={{ user, setUser }}>
      {children}
    </User.Provider>
  );
};
