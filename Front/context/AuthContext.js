import { createContext } from "react";

export const AuthContext = createContext({});

export function AuthProvider({children}) {
  const isAuthenticated = false;

  const login = async () => {
    // Chamada api
    //
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
