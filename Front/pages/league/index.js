import SideMenu from "../../components/SideMenu/sideMenu.js";
import withAuth from "../../services/withAuth.js";
import Link from "next/link";

import styles from "../../styles/league/league.module.css";

function league() {
  return (
    <div className={styles.body}>
      <SideMenu />
      <div className={styles.menubox}>
        <div className={styles.topContentBox}>
          <div className={styles.leftContent}>
            <Link className={styles.link} href={"/league/create"}>Create League</Link>
          </div>

          <div className={styles.rightContent}>
            <Link className={styles.link} href={"/league/join"}>Join League</Link>
          </div>
        </div>

        <div className={styles.bottomContentBox}>
          <Link className={styles.link} href={"/league/myleague"}>See my League</Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(league);
