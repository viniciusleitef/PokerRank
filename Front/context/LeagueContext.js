import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { LEAGUE_API_ROUTES } from '../services/apiConfig';

// Criando o contexto
const LeagueContext = createContext();

// Provider para envolver a aplicação e fornecer o contexto
export function LeagueProvider({ children }) {
  const [leagueData, setLeagueData] = useState(null); // Dados da liga

  const fetchLeagueData = async () => {
    try {
      const response = await axios.get(`${LEAGUE_API_ROUTES.GET_LEAGUE_BY_ID}/1`)
      const data = await response.json();
      setLeagueData(data);
      // Armazena os dados no localStorage para persistência
      localStorage.setItem('leagueData', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao buscar dados da liga:', error);
    }
  };

  return (
    <LeagueContext.Provider value={{ leagueData, fetchLeagueData }}>
      {children}
    </LeagueContext.Provider>
  );
}

// Hook para acessar o contexto da liga
export const useLeague = () => useContext(LeagueContext);
