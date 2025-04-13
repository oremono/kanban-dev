import { createContext, useContext, useState } from 'react';

interface AppContextType {
  activeDetails?: null | string;
  setActiveDetails?: (value: null | string) => void;
}

const AppContext = createContext<AppContextType>({});

export const AppWrapper = ({ children }: any) => {
  const [activeDetails, setActiveDetails] = useState<null | string>(null);

  const sharedState: AppContextType = {
    activeDetails,
    setActiveDetails
  };
  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
};

const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};

export default useAppContext;
