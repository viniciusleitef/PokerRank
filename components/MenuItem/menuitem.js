import styles from "./menuitem.module.css";

function MenuItem({ text, icon, isCompact }) {
  return (
    <div className={styles.box}>
      {isCompact ? (
        // Quando isCompact é verdadeiro, renderiza apenas o ícone
        icon
      ) : (
        // Quando isCompact é falso, renderiza o ícone e o texto
        <>
          {icon}
          {text && <p>{text}</p>}
        </>
      )}
    </div>
  );
}

export default MenuItem;
