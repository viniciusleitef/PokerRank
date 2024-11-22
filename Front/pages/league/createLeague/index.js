import SideMenu from "../../../components/SideMenu/sideMenu";
import styles from "../../../styles/league/createLeague/createleague.module.css";
import withAuth from "../../../services/withAuth.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext.js";
import leagueService from "../../../services/leagueService";
import { useRouter } from "next/router";

function createLeague() {
  const router = useRouter();
  const { user } = useAuth();
  const [requestError, setRequestError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const leagueSchema = {
      user_id: user.id,
      name: data.name,
      description: data.description,
    };
    try {
      await leagueService.createLeague(leagueSchema);
      setRequestError("");
      router.push("/league/allLeagues");
    } catch (error) {
      console.error(error.message);
      setRequestError(error.message);
    }
  };
  return (
    <div className={styles.body}>
      <SideMenu />
      <div className={styles.main}>
        <h1>Criar Liga</h1>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("name", {
              required: "Este campo é obrigatório",
              minLength: {
                value: 2,
                message: "Um título deve ter no mínimo 2 caracteres",
              },
            })}
            type="text"
            placeholder="Nome da liga"
          />
          <div className={styles.error}>
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <input
            {...register("description", {
              minLength: {
                value: 2,
                message: "Um título deve ter no mínimo 2 caracteres",
              },
            })}
            type="text"
            placeholder="Descrição(opcional)"
          />

          <div className={styles.error}>
            {errors.description && <p>{errors.description.message}</p>}
          </div>

          <button type="submit">Criar Liga</button>

          {requestError && <p className={styles.error}>{requestError}</p>}
        </form>
      </div>
    </div>
  );
}

export default withAuth(createLeague);
