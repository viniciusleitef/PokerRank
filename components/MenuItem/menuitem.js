import styles from "./menuitem.module.css";

function MenuItem({ text, icon, isCompact}) {
  return (
    <>
      {isCompact ? (
        <div className={`${styles.box} ${styles.boxCompact}`}>{icon}</div>
      ) : (
        <div className={styles.box}>
          {icon}
          {text && <p>{text}</p>}
        </div>
      )}
    </>
  );
}

export default MenuItem;
