import React from "react";

//react-router-dom
import { Outlet } from "react-router-dom";

//Styling
import styles from "./Main.module.css";

const Main = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default Main;
