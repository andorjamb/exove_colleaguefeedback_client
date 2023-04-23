import React from "react";

//Styling
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div>
        <nav id="sidebar" className={styles.sidebar}>
          <ul className={styles.ul}>
            <li className={styles.li}>Request feedback</li>
            <li className={styles.li}>List item</li>
            <li className={styles.li}>List item</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
