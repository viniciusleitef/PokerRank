import styles from "./popup.module.css";
import { useState, useEffect } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Popup({icon, text, background, color, loading, time}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (time) {
      const timeout = setTimeout(() => {
        setVisible(false); 
      }, time);

      
      return () => clearTimeout(timeout);
    }
  }, [time]);

  if (!visible) return null
  
  return (
    <div
      className={styles.box}
      style={{ backgroundColor: background, color: color }}
    >
      {icon}
      <p>{text}</p>
      {loading && <AiOutlineLoading3Quarters className={styles.spinner}/> }
    </div>
  );
}

export default Popup;
