import styles from "../../styles/privhome.module.css";
import SideMenu from "../../components/SideMenu/sideMenu.js";
import withAuth from '../../services/withAuth.js';

function home() {
  return (
    <div className={styles.body}>
      <SideMenu />
      <div className={styles.centerSection}>
        <div className={styles.centerSectionHeader}>
          <h1>PokerRank</h1>
        </div>
        <div className={styles.centerSectionContent}>
          <div className={styles.itemBox}>
            <div className={styles.cardsBox}></div>

            <div className={styles.calendarBox}></div>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}></div>
    </div>
  );
}

export default withAuth(home);
