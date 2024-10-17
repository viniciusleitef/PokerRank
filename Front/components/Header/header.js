import styles from "./header.module.css";
import { FaDice } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.headerbox}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <FaDice />
          PokerRank
        </div>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/about">Sign Up/Login</a>
          <a href="/contact">LeagueCreation/Tracking</a>
        </nav>

        <div className={styles.responsiveNavIcon} onClick={handleMenuToggle}>
          {
            isMenuOpen? (
              <IoMdClose size={30} color="white" />
            ) : (
              <IoMdMenu size={30} color="white" />
            )
          }
        </div>
  
      </header>

      <div className={`${styles.responsiveNav} ${isMenuOpen? styles.responsiveNavActive: styles.responsiveNavNoActive}`}>
        <a href="/">Home</a>
        <a href="/about">Sign Up/Login</a>
        <a href="/contact">LeagueCreation/Tracking</a>
      </div>
    </div>
  );
}

export default Header;
