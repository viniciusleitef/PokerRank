import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import Filter from "../../components/Filter/filter.js";

import styles from "../../styles/login.module.css";

import {useForm} from "react-hook-form"

function login() {
  const { register, handleSubmit } = useForm();
  const handleLogin = (data) => {
    console.log(data);
  }

  return (
    <>
      <Header />
      <div className={styles.loginFormSection}>
        <Filter>
          <div className={styles.loginFormBox}>
            <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
              <h2>Login</h2>

              <input type="text" id="username" name="email" required placeholder="email" {...register('email')}/>

              <input type="password" id="password" name="password" required placeholder="password" {...register('password')}/>

              <button type="submit">Login</button>
              <a href="#">Forgot Password?</a>
            </form>
          </div>
        </Filter>
      </div>
      <Footer/>
    </>
  );
}

export default login;
