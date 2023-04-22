import React from "react";

// Components and pages
import Header from "../Header/Header";
import Main from "../Main/Main";
import Sidebar from "../Sidebar/Sidebar";

///Styling
import styles from "./LayoutUser.module.css";

/** Layout for feedback pages, containing sidebar nav */

const LayoutUser = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};

export default LayoutUser;
