import styles from "./modal.module.css";

function Modal({ modalOpen, changeModalState, children }) {
  if (!modalOpen) {
    return null;
  }

  return (
    <div onClick={changeModalState} className={styles.filter}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
