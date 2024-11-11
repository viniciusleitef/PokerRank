import SideMenu from "../../../components/SideMenu/sideMenu";
import styles from "../../../styles/league/createLeague/createleague.module.css";
import withAuth from "../../../services/withAuth.js";
import { useForm } from "react-hook-form";

function createLeague() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
              required: "Este campo é obrigatório",
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
        </form>
      </div>
    </div>
  );
}

export default withAuth(createLeague);
