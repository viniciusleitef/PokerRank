import { useState, useEffect } from "react";
import styles from "./rankingTable.module.css";
function RankingTables({ tuplaArray, fieldsArray, type }) {
  const [fieldSelected, setFieldSelected] = useState([]);
  const [gameRanking, setGameRanking] = useState(tuplaArray);

  useEffect(() => {
    setGameRanking(tuplaArray);
  }, [tuplaArray, fieldsArray, type]);

  const changeName = (field) => {
    switch (field) {
      case "username":
        return "Nome do jogador";
      case "stack":
        return "Stack Final";
      case "profit":
        return "Lucro/Prejuízo";
      case "totalInvestment":
        return "Dinheiro Total Investido";
      case "qnt_rebuy":
        return "Quantidade de Rebuys";
      case "rebuysValue":
        return "Valor Total em Rebuys";
      case "buyinValue":
        return "Valor do Buy-In";
      case "games_played":
        return "Jogos Jogados";
      case "games_won":
        return "Jogos lucrativos";
      case "games_lost":
        return "Jogos não lucrativos";
      case "games_drawn":
        return "Jogos empatados";

      default:
        "";
        return "error";
    }
  };

  const handleFilter = (field) => {
    function sortData(arr, field) {
      return arr.slice().sort((a, b) => {
        // Verifica se o campo é numérico ou string
        const aValue = a[field];
        const bValue = b[field];

        // Ordena por string (case insensitive)
        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        }

        // Ordena por número
        if (typeof aValue === "number" && typeof bValue === "number") {
          return bValue - aValue; // Decrescente
        }

        // Caso os dois sejam iguais ou ambos não sejam string ou número
        return 0;
      });
    }

    setGameRanking(sortData(tuplaArray, field));
    setFieldSelected(field);
  };

  return (
    <div className={styles.rank}>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            {fieldsArray &&
              fieldsArray.map((field, index) => (
                <th
                  key={index}
                  className={
                    field === fieldSelected ? styles.selectedHeader : null
                  }
                  onClick={() => handleFilter(field)}
                >
                  {changeName(field)}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {gameRanking &&
            type == "game" &&
            gameRanking.map((player) => (
              <tr key={player.id}>
                <td>{player.username}</td>
                <td>{player.stack}</td>
                <td>{player.profit}</td>
                <td>{player.totalInvestment}</td>
                <td>{player.qnt_rebuy}</td>
                <td>{player.rebuysValue}</td>
                <td>{player.buyinValue}</td>
              </tr>
            ))}

          {gameRanking &&
            type == "league" &&
            gameRanking.map((player) => (
              <tr key={player.id}>
                <td>{player.username ? player.username : "AAA"}</td>
                <td>{player.profit}</td>
                <td>{player.games_played}</td>
                <td>{player.games_won}</td>
                <td>{player.games_lost}</td>
                <td>{player.games_drawn}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingTables;
