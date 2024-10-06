import styles from "./filter.module.css";

function Filter({children}) {
  return <div className={styles.filter}>{children}</div>;
}

export default Filter;
