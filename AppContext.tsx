// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  code: string | null;
  username: string | null;
  host: boolean | null;
  lastTask: string | null;
}

interface AppContextProps {
  userData: UserData;
  storeCode: (code: string) => void;
  storeUsername: (username: string) => void;
  storeHost: (host: boolean) => void;
  storeLastTask: (lastTask: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    code: null,
    username: null,
    host: false,
    lastTask: null,
  });

  const storeCode = (code: string) => {
    setUserData((prevData) => ({ ...prevData, code }));
  };

  const storeUsername = (username: string) => {
    setUserData((prevData) => ({ ...prevData, username }));
  };

  const storeHost = (host: boolean) => {
    setUserData((prevData) => ({ ...prevData, host }));
  };

  const storeLastTask = (lastTask: string) => {
    setUserData((prevData) => ({ ...prevData, lastTask }));
  }

  return (
    <AppContext.Provider value={{ userData, storeCode, storeUsername, storeHost, storeLastTask }}>
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
