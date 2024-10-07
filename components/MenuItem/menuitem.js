import styles from "./menuitem.module.css";

function MenuItem({ text, icon }) {
  return (
    <div className={styles.box}>
      {icon}
      <p>{text}</p>
    </div>
  );
}

export default MenuItem;
