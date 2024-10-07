import styles from "./menuitem.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function MenuItem({ route, text, icon, isCompact }) {
  const router = useRouter();
  // Verifica se "pathname" atual corresponde ao link do menu. Se sim return true
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <>
      {isCompact ? (
        <Link className={styles.link} href={route}>
          <div className={`${styles.box} ${styles.boxCompact}`}>{icon}</div>
        </Link>
      ) : (
        <Link className={styles.link} href={route}>
          <div
            className={`${styles.box} ${isActive(route) ? styles.active : ""}`}
          >
            {icon}
            {text && <p>{text}</p>}
          </div>
        </Link>
      )}
    </>
  );
}

export default MenuItem;
