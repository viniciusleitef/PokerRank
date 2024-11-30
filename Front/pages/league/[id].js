import SideMenu from "../../components/SideMenu/sideMenu.js";
import withAuth from "../../services/withAuth.js";

import styles from "../../styles/league/myLeague/myleague.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import Modal from "../../components/Modal/modal.js";
import { useForm } from "react-hook-form";
import gameService from "../../services/gameService.js";
import leagueService from "../../services/leagueService.js";
import authService from "../../services/authService.js";
import Link from "next/link.js";
import MemberBox from "../../components/MemberBox/memberBox.js";
import RankingTables from "../../components/RankingTable/rankingTable.js";

function myLeague() {
  const router = useRouter();
  const { id } = router.query; //ID da liga
  const [actualLeague, setActualLeague] = useState(null);
  const [pageNotFound, setPageNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [gameError, setGameError] = useState("");
  const [games, setGames] = useState(null);
  const [trigger, setTrigger] = useState(0);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [ranking, setRankings] = useState([]);
  const [rankingFields, setRankingsFields] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //Efeito da luz que segue o mouse
    const handleMouseMove = (event) => {
      document.documentElement.style.setProperty("--x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Verificar se o id da página corresponde a alguma liga do usuário logado
        const userLeagues =
          JSON.parse(localStorage.getItem("userLeagues")) || [];
        for (let i = 0; i < userLeagues.length; i++) {
          if (userLeagues[i].id == id) {
            setActualLeague(userLeagues[i]);
            try {
              setGames(await gameService.getAllGamesByLeagueId(id));
            } catch (error) {
              console.log(error);
            }
            return;
          }
        }
        setPageNotFound(true);
      }
    };

    fetchData();
  }, [id, trigger]);

  useEffect(() => {
    if (query.length > 0) {
      const debounce = setTimeout(() => {
        fetchUsers(query);
      }, 200); // Aguarda Xms antes de enviar a requisição
      return () => clearTimeout(debounce); // Limpa o timeout para evitar múltiplas chamadas
    } else {
      setUsers([]); // Limpa os resultados se o campo estiver vazio
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await leagueService.getLeagueParticipants(id);
          fetchRanking()
          console.log(response);
          setMembers(response);
          setFilteredMembers(response);
          //add localstorage
          localStorage.setItem("userLeagueMembers", JSON.stringify(response));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [id]);

  const fetchRanking = async () =>{
    setRankings(await leagueService.getLeagueRankingByLeagueId(id))
    setRankingsFields(["username", "profit", "games_played", "games_won", "games_lost", "games_drawn"])
  }

  const fetchUsers = async (query) => {
    setUsers(await authService.getLimitedUsers(query));
  };

  const changeModalState = () => {
    console.log(games);
    setModalOpen(!modalOpen);
    setGameError("");
  };

  const createGame = async (data) => {
    if (data.gameDate == "") {
      data.gameDate = null;
    }
    const gameSchema = {
      league_id: id,
      name: data.name,
      location: data.location,
      duration: data.duration,
      gameDate: data.gameDate,
    };
    console.log(gameSchema);
    try {
      await gameService.createGame(gameSchema);
      setTrigger(trigger + 1);
      //setModalOpen(false);
    } catch (err) {
      setGameError(err.message);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchLocal = (e) => {
    const search = e.target.value;
    setFilteredMembers(
      members.filter((member) =>
        member.username.toLowerCase().startsWith(search),
      ),
    );
    console.log(search);
  };

  const addUserInLeague = (user) => {
    //enviar solicitação para usuário
    console.log(user);
  };

  if (pageNotFound) {
    return <h1>404: Página não encontrada</h1>;
  }

  return (
    <div className={styles.body}>
      <SideMenu />
      <Modal modalOpen={modalOpen} changeModalState={changeModalState}>
        <div className={styles.modalBox}>
          <h1>Criar jogo</h1>
          <form onSubmit={handleSubmit(createGame)}>
            <input
              {...register("name", {
                required: "Este campo é obrigatório",
                minLength: {
                  value: 2,
                  message: "Um nome deve ter no mínimo 2 caracteres",
                },
              })}
              placeholder="Nome"
              type="text"
            />
            <div className={styles.error}>
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <input
              {...register("location", {
                required: "Este campo é obrigatório",
                minLength: {
                  value: 2,
                  message: "Um local deve ter no mínimo 2 caracteres",
                },
              })}
              placeholder="Local"
              type="text"
            />
            <div className={styles.error}>
              {errors.location && <p>{errors.location.message}</p>}
            </div>
            <input
              {...register("duration")}
              placeholder="Duração em horas (Opcional)"
              type="number"
              min={1}
              max={24}
            />
            <div className={styles.error}></div>
            <input
              {...register("gameDate")}
              placeholder="Data do jogo (Opcional)"
              type="date"
            />

            <div className={styles.error}>
              {gameError && <p>{gameError}</p>}
            </div>

            <button type="submit">Criar Jogo</button>
          </form>
        </div>
      </Modal>

      <div className={styles.main}>
        <div className={styles.topContentBox}>
          <div className={styles.leftContent}>
            <div className={styles.leftContentHeader}>
              <h1> {actualLeague && actualLeague.name} </h1>
              <button onClick={changeModalState}>Criar Jogo</button>
            </div>
            {games ? (
              <div className={styles.gameSection}>
                <div className={styles.gameSectionTitle}>
                  <h2>Jogos: </h2>
                </div>

                <div className={styles.gameBoxBox}>
                  {games.map((game) => (
                    <Link
                      className={styles.nolink}
                      href={`/league/game/${game.id}`}
                      key={game.id}
                    >
                      <div className={styles.gameBox}>
                        <h3>{game.name}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className={styles.noGames}>Nenhum jogo criado</div>
            )}

            <div className={styles.rankingSection}> 
              <h1>Ranking da liga:</h1>
              <div className={styles.rankingTable}>
                <RankingTables tuplaArray={ranking} fieldsArray={rankingFields} type="league"/>
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <h1> Membros </h1>
            <div className={styles.memberSection}>
              <div className={styles.membersInputBox}>
                <input
                  type="text"
                  placeholder="Buscar Membros"
                  onChange={handleSearchLocal}
                  className={styles.membersInput}
                />
                {filteredMembers.length > 0 && (
                  <div className={styles.members}>
                    {filteredMembers.map((member) => (
                      <MemberBox
                        key={member.id}
                        name={member.username}
                        status={true}
                        img="/images/noPerfil.avif"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.addMember}>
                <input
                  type="text"
                  placeholder="Adicionar Jogadores"
                  onChange={handleSearch}
                  className={styles.membersInput}
                />
                <div className={styles.members}>
                  {users &&
                    users.map((user) => (
                      <div
                        onClick={() => addUserInLeague(user)}
                        className={styles.memberBox}
                        key={user.id}
                      >
                        <MemberBox
                          name={user.username}
                          img="/images/noPerfil.avif"
                          add={true}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(myLeague);
