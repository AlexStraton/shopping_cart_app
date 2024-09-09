import { createContext, useState } from 'react';

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({user_id: 1});

  return (
    <User.Provider value={{ user, setUser }}>
      {children}
    </User.Provider>
  );
};