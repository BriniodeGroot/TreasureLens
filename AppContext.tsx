// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  code: string | null;
  username: string | null;
}

interface AppContextProps {
  userData: UserData;
  storeCode: (code: string) => void;
  storeUsername: (username: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    code: null,
    username: null,
  });

  const storeCode = (code: string) => {
    setUserData((prevData) => ({ ...prevData, code }));
  };

  const storeUsername = (username: string) => {
    setUserData((prevData) => ({ ...prevData, username }));
  };

  return (
    <AppContext.Provider value={{ userData, storeCode, storeUsername }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
