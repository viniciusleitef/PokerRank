import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import Filter from "../../components/Filter/filter.js";

import styles from "../../styles/login.module.css";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import authService from "../../services/authService.js";

function login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      console.log(data)
      const response = await authService.login(data);

      localStorage.setItem("token", response.access_token);

      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
              <a href="#">Forgot Password?</a>
            </form>
          </div>
        </Filter>
      </div>
      <Footer />
    </>
  );
}

export default login;
