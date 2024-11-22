import { createContext, useState, useContext, useEffect} from "react";
import jwtDecode from "jwt-decode"; 

// Contexto de autenticação
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Variável para armazenar os dados do usuário

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedUser = jwtDecode(token);

        setIsAuthenticated(true);
        setUser(decodedUser);
      } catch (error) {
        console.error("Erro ao decifrar token:", error);
      }
    }
  }, []);  // Esse useEffect roda uma vez, ao carregar o componente

  const login = (token) => {
    try {
      // Decifra o token JWT
      const decodedUser = jwtDecode(token);
      setIsAuthenticated(true);
      setUser(decodedUser); 
    } catch (error) {
      console.error("Erro ao decifrar token:", error);
    }
  };

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsAuthenticated(false);
    setUser(null); 
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
