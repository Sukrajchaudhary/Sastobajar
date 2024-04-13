import {createContext, useContext, useState } from "react";
export const authContext = createContext();
export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [userInfo,setuserInfo]=useState({})
  return (
    <authContext.Provider value={{ isAuth, setisAuth,userInfo,setuserInfo }}>
      {children}
    </authContext.Provider>
  );
};
