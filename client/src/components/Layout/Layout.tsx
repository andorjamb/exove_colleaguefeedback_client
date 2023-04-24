//React
import React from "react";

//Components and Pages
import Header from "../Header/Header";
import Main from "../Main/Main";

//Styling
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  );
};

export default Layout;
