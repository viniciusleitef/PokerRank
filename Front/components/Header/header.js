import styles from "./header.module.css";
import { FaDice } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import React, { useState, useEffect } from "react";
import Link from "next/link";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700 ) { // 700px definido no css 
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.headerbox}>
      <header className={styles.header}>
        <Link href={'/'} className={styles.nolink}>
          <div className={styles.logo}>
            <FaDice />
            PokerRank
          </div>
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up</Link>
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
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Sign Up</Link>
      </div>
    </div>
  );
}

export default Header;
