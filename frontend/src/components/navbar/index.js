import React, { useEffect } from 'react';
import styles from './navbar.module.scss';

/*global google*/
function Navbar() {

  useEffect(() => {

  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <p>Rappi Clon</p>
      </div>
      <div className={styles.menu}>
        <button className={styles.menuButton}>
          <i className="fa-solid fa-right-to-bracket">
          </i>
          Ingreso
        </button>
      </div>
    </nav>
  );
}

export default Navbar;