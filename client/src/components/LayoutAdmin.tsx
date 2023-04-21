import React from "react";

// Components and pages
import Header from "./Header/Header";
import Main from "./Main/Main";

import "../styles/Layout.css";

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
