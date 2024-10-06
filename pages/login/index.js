import styles from "../../styles/login.module.css";
import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import Filter from "../../components/Filter/filter.js";

function login() {
  return (
    <>
      <Header />
      <div className={styles.loginFormSection}>
        <Filter>
          <div className={styles.loginFormBox}>
            <form className={styles.form}>
              <h2>Login</h2>

              <input type="text" id="username" name="username" required placeholder="username" />

              <input type="password" id="password" name="password" required placeholder="password"/>

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
