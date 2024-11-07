import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import Filter from "../../components/Filter/filter.js";

import styles from "../../styles/login.module.css";
import Popup from "../../components/Popup/popup.js";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import authService from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext";
import { FaInfoCircle } from "react-icons/fa";
import { MdOutlineSmsFailed } from "react-icons/md";

function login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Se o token existir, redireciona para a página inicial
      router.replace("/home");
    } else {
      setLoading(false); // Se não houver token, para de carregar e exibe a página de login
    }
  }, [router]);

  const handleLogin = async (data) => {
    setShowErrorPopup(false);
    try {
      const response = await authService.login(data);

      setShowPopup(true);
      localStorage.setItem("token", response);
      login(response);
      router.push("/home");
    } catch (error) {
      setShowErrorPopup(true);
      console.log(error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Carregando...</div>; // Aqui pode ser um ícone de loading ou qualquer animação
  }

  return (
    <>
      <Header />
      <div className={styles.loginFormSection}>
        <Filter>
          <div className={styles.loginFormBox}>
            <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
              <h2>Login</h2>

              <input
                type="text"
                id="username"
                name="email"
                required
                placeholder="email"
                {...register("email")}
              />

              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="password"
                {...register("password")}
              />

              <button type="submit">Login</button>
              <div className={styles.errorBox}>{error}</div>
              <a href="#">Forgot Password?</a>
            </form>
          </div>
        </Filter>
      </div>
      {showPopup && (
        <Popup
          icon={<FaInfoCircle />}
          text="Login realizado com sucesso!"
          background="#1cbc0f"
          color="white"
          loading={true}
          time={5000}
        />
      )}

      {showErrorPopup && (
        <Popup
          icon={<MdOutlineSmsFailed />}
          text={`Error: ${error}`} 
          background="#d40321"
          color="white"
          loading={false}
          time={5000}
        />
      )}

      <Footer />
    </>
  );
}

export default login;
