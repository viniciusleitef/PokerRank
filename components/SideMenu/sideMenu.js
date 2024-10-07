import styles from "./sideMenu.module.css";
import MenuItem from "../../components/MenuItem/menuitem.js";
import { useRouter } from 'next/router';
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
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {isMenuOpen ? (
        <div>
          <div className={`${styles.sideMenu} ${styles.sideMenuOpen}`}>
            <FaArrowLeft className={styles.arrowL} size={20} onClick={handleMenuToggle}/>
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
              <MenuItem route="/home"text="Home" icon={<FaHome size={22} />} />
              <MenuItem route="/" text="League" icon={<GiChampions size={22} />} />
              <MenuItem route="/" text="My Performance" icon={<CgPerformance size={22} />} />
              <MenuItem route="/" text="My leagues" icon={<BsGraphUp size={22} />} />
              <MenuItem route="/" text="My Games" icon={<IoTrophySharp size={22} />} />
            </div>

            <div className={styles.sideMenuFooter}>
              <MenuItem route="/" text="Settings" icon={<IoMdSettings size={22} />} />
              <MenuItem route="/" text="Logout" icon={<MdOutlineLogout size={22} />} />
            </div>
          </div>
          <div className={styles.responsiveSideMenu}></div>
        </div>
      ) : (
        <div>
          <div className={`${styles.sideMenu} ${styles.sideMenuClosed}`}>
            <FaArrowLeft className={styles.arrowR} size={20} onClick={handleMenuToggle}/>
            <div className={styles.perfil}>
              <div className={`${styles.imgBox} ${styles.imgBoxCompact}`}>
                <img src="/images/noPerfil.avif" width={40} height={40}></img>
              </div>
            </div>
            <div className={styles.menu}>
              <MenuItem route="/" icon={<FaHome size={22}/>} isCompact={true} />
              <MenuItem route="/" icon={<GiChampions size={22} />} isCompact={true}/>
              <MenuItem route="/" icon={<CgPerformance size={22} />} isCompact={true}/>
              <MenuItem route="/" icon={<BsGraphUp size={22} />} isCompact={true}/>
              <MenuItem route="/" icon={<IoTrophySharp size={22} />} isCompact={true}/>
            </div>

            <div className={styles.sideMenuFooter}>
              <MenuItem route="/" icon={<IoMdSettings size={22} />} isCompact={true}/>
              <MenuItem route="/" icon={<MdOutlineLogout size={22} />} isCompact={true}/>
            </div>
          </div>
          <div className={styles.responsiveSideMenu}></div>
        </div>
      )}
    </>
  );
}

export default SideMenu;
