import Header from "../../components/Header/header.js";
import Footer from "../../components/Footer/footer.js";
import Filter from "../../components/Filter/filter.js";

import styles from "../../styles/register.module.css";

function register() {
  return (
    <>
      <Header />
        <Filter>
          <div className={styles.mainContainer}>
            <div className={styles.photoContainer}>
              <h1>Ready to rank up?</h1>
              <p className={styles.upperSubtitle}>Discover the best poker leagues for every skill</p>
              <img className={styles.photo} src="/images/signUpPhoto.png"></img>
              <p className={styles.bottomSubtitle}>Track your poker progress effortlessly!</p>
            </div>

            <div className={styles.signUpContainer}>
              <h1 className={styles.title}>Sign up for free</h1>
              <p className={styles.subtitle}>Get exclusive access to league features. No obligations.</p>
              <input className={styles.inputBox} placeholder="Enter your full name"></input>
              <input className={styles.inputBox} placeholder="Choose a unique username"></input>
              <input className={styles.inputBox} type="password" placeholder="Create a password"></input>
              <input className={styles.inputBox} type="password" placeholder="Confirm your password"></input>
              <button className={styles.joinButton}>Join now</button>
              <div className={styles.altSignUpTextContainer}>
                <p>or sign up with</p>
              </div>
              <div className={styles.buttonsContainer}>
                <button className={styles.companyButton}>Google</button>
                <button className={styles.companyButton}>Facebook</button>
              </div>
            </div>
          </div>
        </Filter>
      <Footer />
    </>
  )
}

export default register;