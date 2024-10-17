import styles from "../styles/home.module.css";
import Header from "../components/Header/header.js";
import Footer from "../components/Footer/footer.js";
import Filter from "../components/Filter/filter.js";

function Home() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Filter>
          <div className={styles.main}>
            <h1>Welcome to PokerRank!</h1>
            <p>
              Join the ultimate poker community. Track your leagues, Increase
              your rank, and connect with poker enthusiasts worldwide.
            </p>
            <div className={styles.buttonsbox}>
              <button>Sign Up</button>
              <button>Login</button>
            </div>
          </div>
        </Filter>
      </div>
      <Footer/>
    </>
  );
}

export default Home;
