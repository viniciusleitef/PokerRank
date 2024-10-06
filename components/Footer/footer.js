import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.footerbox}>
      <footer className={styles.footer}>
        <p>@2024 PokerRank. All rights reserved</p>
        <div className={styles.nav}>
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
