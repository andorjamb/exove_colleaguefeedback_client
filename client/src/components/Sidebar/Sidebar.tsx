import React from "react";

//Styling
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div>
        <nav id="sidebar" className={styles.sidebar}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <a href="/" className={styles.a}>
                link
              </a>
            </li>
            <li className={styles.li}>
              <a className={styles.a} href="/">
                link
              </a>
            </li>
            <li className={styles.li}>
              <a href="/" className={styles.a}>
                link
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
