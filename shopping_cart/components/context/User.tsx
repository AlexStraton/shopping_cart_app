import React, { createContext, useState, ReactNode } from 'react';
interface User {
  user_id: number;
}
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const User = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({ user_id: 1 });

  return (
    <User.Provider value={{ user, setUser }}>
      {children}
    </User.Provider>
  );
};
