import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextProps {
  children: ReactNode;
}


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({ user: {}, saveUserData: () => {} });

export default function AuthContextProvider(props: AuthContextProps) {
  const [user, setUser] = useState({});

  const saveUserData = () => {
    try {
      const encodedToken = localStorage.getItem("userToken");
      if (encodedToken) {
        const decodedToken = jwtDecode(encodedToken);
        setUser(decodedToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ saveUserData, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}
