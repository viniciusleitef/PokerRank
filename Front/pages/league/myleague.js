import SideMenu from "../../components/SideMenu/sideMenu.js";
import withAuth from "../../services/withAuth.js";

import styles from "../../styles/league/myleague.module.css";

function league() {
  return (
    <div className={styles.body}>
      <SideMenu />
      <div className={styles.main}>
        <div className={styles.topContentBox}>
          <div className={styles.leftContent}></div>
          <div className={styles.rightContent}></div>
        </div>

        <div className={styles.bottomContentBox}></div>
      </div>
    </div>
  );
}

export default withAuth(league);
