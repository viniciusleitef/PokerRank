import withAuth from "../../../services/withAuth";
import SideMenu from "../../../components/SideMenu/sideMenu.js";
import styles from "../../../styles/league/allLeagues/allLeagues.module.css";
import leagueService from "../../../services/leagueService.js";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext.js";
import Link from "next/link.js";

function allLeagues() {
  const { user } = useAuth();
  const [requestError, setRequestError] = useState("");
  const [leagues, setLeagues] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await leagueService.getAllLeagues(user.id);
        console.log(response.data);
        setLeagues(response.data);
        localStorage.setItem("userLeagues", JSON.stringify(response.data));
      } catch (error) {
        setRequestError(error.message);
      }
    };

    if (user && user.id) {
      // Certifica-se de que o user está definido
      fetchLeagues();
    }
  }, [user]);

  return (
    <div className={styles.body}>
      <SideMenu />
      <div className={styles.main}>
        <div className={styles.boxContent}>
          <h1>Minhas Ligas</h1>
          {requestError ? (
            <div className={styles.error}>
              <p>{requestError}</p>
            </div>
          ) : (
            <div>
              {leagues &&
                leagues.map((league) => {
                  return (
                    <Link
                      className={styles.nolink}
                      key={league.id}
                      href={`/league/${league.id}`}
                    >
                      <div className={styles.leagueBox}>
                        <div className={styles.leagueHeader}>
                          <p>{league.name}</p>
                          <p>{league.created_at}</p>
                        </div>
                        {league.description && (
                          <div className={styles.leagueDescription}>
                            {league.description}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(allLeagues);
