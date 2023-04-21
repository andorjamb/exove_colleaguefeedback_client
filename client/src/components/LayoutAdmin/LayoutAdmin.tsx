import React from "react";

// Components and pages
import Header from "../Header/Header";
import Main from "../Main/Main";

//Styling
import styles from "./components/LayoutAdmin.module.css";

/** Layout for Admin view  */

const LayoutAdmin = () => {
  return (
    
    <div className="layout">
      <Header />
      <Main />
    </div>
  );
};

export default LayoutAdmin;
