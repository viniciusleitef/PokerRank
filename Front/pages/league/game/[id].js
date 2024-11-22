import withAuth from "../../../services/withAuth";
import { useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import gameService from "../../../services/gameService";
import leagueService from "../../../services/leagueService";
import SideMenu from "../../../components/SideMenu/sideMenu";
import styles from "../../../styles/league/game/game.module.css";
import MemberBox from "../../../components/MemberBox/memberBox";
import { FaDeleteLeft } from "react-icons/fa6";

function game() {
  const router = useRouter();
  const { id } = router.query; //ID da liga
  const [pageNotFound, setPageNotFound] = useState(false);
  const [game, setGame] = useState(null);
  const [leagueMembers, setLeagueMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [buyInValue, setBuyInValue] = useState(null);
  const [buyinDigited, setBuyinDigited] = useState(null);
  const [rebuyValue, setRebuyValue] = useState(null);
  const [rebuyList, setRebuyList] = useState([]);
  const [rebuyTotalValue, setRebuyTotalValue] = useState(null);
  const [totalMoney, setTotalMoney] = useState(null);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    setPageNotFound(false);
    async function fetchGameData() {
      setGame(await gameService.getGameById(id));
      return;
    }

    async function fetchLeagueMembers() {
      const storedMembers = localStorage.getItem("userLeagueMembers");
      if (storedMembers) {
        setLeagueMembers(JSON.parse(storedMembers));
      } else {
        const fetchedMembers =
          await leagueService.getLeagueParticipantsByGameId(id);
        localStorage.setItem(
          "userLeagueMembers",
          JSON.stringify(fetchedMembers),
        );
        setLeagueMembers(fetchedMembers);
      }
    }

    if (id) {
      fetchGameData();
      fetchLeagueMembers();
      return;
    }

    setPageNotFound(true);
  }, [id]);

  useEffect(() => {
    setTotalMoney(Number(buyInValue) + Number(rebuyTotalValue));
  }, [buyInValue, rebuyTotalValue]);

  const selectMember = (member) => {
    if (selectedMember) {
      setLeagueMembers((prevMembers) => [...prevMembers, selectedMember]);
    }
    setLeagueMembers((prevMembers) =>
      prevMembers.filter((m) => m.username !== member.username),
    );
    setSelectedMember(member);
  };

  const addRebuy = () => {
    if (rebuyValue) {
      if (rebuyValue < 1 || rebuyValue > 100000) {
        return;
      }
      setRebuyList((prevList) => [...prevList, Number(rebuyValue)]);
      setRebuyTotalValue((prevList) => prevList + Number(rebuyValue));
    }
  };

  const addBuyin = () => {
    if (buyinDigited) {
      if (buyinDigited < 1 || buyinDigited > 100000) {
        setBuyInValue(null);
        return;
      }

      setBuyInValue(buyinDigited);
    }
  };

  const removeRebuy = (index, rebuy) => {
    setRebuyList((prevList) => prevList.filter((_, v) => v !== index));
    rebuyTotalValue - Number(rebuy) == 0
      ? setRebuyTotalValue(null)
      : setRebuyTotalValue(rebuyTotalValue - Number(rebuy));
  };

  const handleRebuyChange = (e) => {
    const value = e.target.value;
    const numericValue = Number(value);

    setRebuyValue(numericValue);
  };

  const handleBuyInChange = (e) => {
    const value = e.target.value;
    setBuyinDigited(value);
  };

  const sendData = async (e) => {
    e.preventDefault();
    setDataError(null);
    if (!selectedMember) {
      setDataError("Selecione um membro para adicionar");
      return;
    }

    if (!buyInValue) {
      setDataError("Escolha o valor do buy in");
      return;
    }

    const data = {
      game_id: Number(id),
      user_id: selectedMember.id,
      rebuy_value_list: rebuyList,
      buy_in_value: Number(buyInValue),
      totalMoney: Number(totalMoney),
    };

    console.log(data);
    try {
      const response = await gameService.addPlayerGame(data);
      console.log(response)
    } catch (error) {
      setDataError(error.message)
    }
  };

  if (pageNotFound) {
    return <h1>Jogo não encontrado</h1>;
  }
  return (
    <div className={styles.body}>
      <SideMenu />
      <div className={styles.main}>
        <div className={styles.contentBox}>
          <div className={styles.infoBox}>
            {game && (
              <div className={styles.info}>
                <div>
                  <h1 className={styles.title}>{game.name}</h1>
                </div>
                <div className={styles.tuplaBox}>
                  <p className={styles.tupla}>
                    Local do jogo: <span>{game.location}</span>
                  </p>
                  <p className={styles.tupla}>
                    Duração do jogo: <span>{game.duration} hora(s)</span>
                  </p>
                  <p className={styles.tupla}>
                    Quantidade de buy ins: <span>{game.buyIns}</span>
                  </p>
                  <p className={styles.tupla}>
                    Quantidade de rebuys: <span>{game.rebuys}</span>
                  </p>
                  <p className={styles.tupla}>
                    Quantidade de dinheiro: <span>{game.totalMoney}</span>
                  </p>
                  <p className={styles.tupla}>
                    Quantidade de Jogadores<span>{game.qntPlayers}</span>
                  </p>
                  <p className={styles.tupla}>
                    Data do Jogo: <span>{game.gameDate}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.addBox}>
            <h1 className={styles.title}>Adicionar membro</h1>
            <div className={styles.memberArea}>
              <div className={styles.addMembersBox}>
                {leagueMembers.map((member, index) => (
                  <div key={index} onClick={() => selectMember(member)}>
                    <MemberBox
                      name={member.username}
                      add={true}
                      img="/images/noPerfil.avif"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.memberArea2}>
              <div className={styles.memberAreaHeader}>
                {selectedMember && (
                  <MemberBox
                    name={selectedMember?.username}
                    img="/images/noPerfil.avif"
                  />
                )}
              </div>
              <form className={styles.form} onSubmit={(e) => sendData(e)}>
                <div className={styles.fields}>
                  <div className={styles.fieldHeader}>
                    <div className={styles.inputBox}>
                      <label>Adicionar rebuy:</label>
                      <input
                        type="number"
                        min="1"
                        max="100000"
                        step="1"
                        placeholder="valor"
                        onChange={(e) => handleRebuyChange(e)}
                      />
                      <button
                        className={styles.inputButton}
                        type="button"
                        onClick={addRebuy}
                      >
                        Adicionar rebuy
                      </button>
                    </div>

                    <div className={styles.inputBox}>
                      <label>Adicionar Buy in: </label>
                      <input
                        type="number"
                        min="1"
                        max="100000"
                        step="1"
                        placeholder="valor"
                        onChange={(e) => handleBuyInChange(e)}
                      />
                      <button
                        className={styles.inputButton}
                        type="button"
                        onClick={addBuyin}
                      >
                        Adicionar Buyin
                      </button>
                    </div>
                  </div>
                  <div className={styles.fieldResult}>
                    <div className={styles.rebuyListBox}>
                      {rebuyList.length > 0 &&
                        rebuyList.map((rebuy, index) => (
                          <div key={index}>
                            <p>
                              1 Rebuy de:{" "}
                              <span className={styles.rose}>{rebuy} </span>
                            </p>
                            <FaDeleteLeft
                              className={styles.deleteIcon}
                              onClick={() => removeRebuy(index, rebuy)}
                            />
                          </div>
                        ))}
                      {rebuyTotalValue && (
                        <p className={styles.totalRebuy}>
                          Total em Rebuys:{" "}
                          <span className={styles.rose}>{rebuyTotalValue}</span>
                        </p>
                      )}
                    </div>

                    <div className={styles.buyInResult}>
                      {buyInValue && (
                        <p>
                          1 BuyIn de:{" "}
                          <span className={styles.rose}>{buyInValue}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <h2>
                  Dinheiro Total:{" "}
                  <span className={styles.rose}>
                    {totalMoney && totalMoney}
                  </span>
                </h2>
                <button className={styles.inputButton} type="submit">
                  Adicionar jogador
                </button>

                <div className={styles.dataError}>{dataError && dataError}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(game);
