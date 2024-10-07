import styles from "./sideMenu.module.css";
import MenuItem from "../../components/MenuItem/menuitem.js";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { GiChampions } from "react-icons/gi";
import { CgPerformance } from "react-icons/cg";
import { BsGraphUp } from "react-icons/bs";
import { IoTrophySharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {isMenuOpen ? (
        <div>
          <div className={`${styles.sideMenu} ${styles.sideMenuOpen}`}>
            <FaArrowLeft className={styles.arrowL} size={20} />
            <div className={styles.perfil}>
              <div className={styles.imgBox}>
                <img src="/images/noPerfil.avif" width={40} height={40}></img>
                <div className={styles.textBox}>
                  <p>Welcome !</p>
                  <p>User Name</p>
                </div>
              </div>
            </div>
            <div className={styles.menu}>
              <MenuItem text="Home" icon={<FaHome size={22} />} />
              <MenuItem text="League" icon={<GiChampions size={22} />} />
              <MenuItem text="Home" icon={<CgPerformance size={22} />} />
              <MenuItem text="My leagues" icon={<BsGraphUp size={22} />} />
              <MenuItem text="My Games" icon={<IoTrophySharp size={22} />} />
            </div>

            <div className={styles.sideMenuFooter}>
              <MenuItem text="Settings" icon={<IoMdSettings size={22} />} />
              <MenuItem text="Logout" icon={<MdOutlineLogout size={22} />} />
            </div>
          </div>
          <div className={styles.responsiveSideMenu}></div>
        </div>
      ) : (
        <div>
          <div className={`${styles.sideMenu} ${styles.sideMenuClosed}`}>
            <FaArrowLeft className={styles.arrowR} size={20} />
            <div className={styles.perfil}>
              <div className={styles.imgBox}>
                <img src="/images/noPerfil.avif" width={40} height={40}></img>
                <div className={styles.textBox}>
                </div>
              </div>
            </div>
            <div className={styles.menu}>
              <MenuItem icon={<FaHome size={22} isCompact/>} />
              <MenuItem icon={<GiChampions size={22} isCompact/>} />
              <MenuItem icon={<CgPerformance size={22} />} />
              <MenuItem icon={<BsGraphUp size={22} />} />
              <MenuItem icon={<IoTrophySharp size={22} />} />
            </div>

            <div className={styles.sideMenuFooter}>
              <MenuItem icon={<IoMdSettings size={22} />} />
              <MenuItem icon={<MdOutlineLogout size={22} />} />
            </div>
          </div>
          <div className={styles.responsiveSideMenu}></div>
        </div>
      )}
    </>
  );
}

export default SideMenu;
