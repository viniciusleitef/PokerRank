import styles from "./memberBox.module.css";
import { IoMdAddCircle } from "react-icons/io";
//add optional props
function MemberBox({ name, img, status = false, add = false }) {
  return (
    <div className={styles.body}>
      <div className={styles.memberPhoto}>
        <img src={img} width={40} height={40}></img>
      </div>
      <div className={styles.memberInfo}>{name}</div>
      {status && <div className={styles.memberStatus}></div>}
      {add && <div className={styles.add}><IoMdAddCircle/></div>}
    </div>
  );
}

export default MemberBox;
