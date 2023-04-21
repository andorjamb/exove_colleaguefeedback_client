import React from "react";

// Components and pages
import Header from "./Header";
import Main from "./Main";
import "../styles/Layout.css";

/** Layout for Admin view  */

const LayoutA = () => {
  return (
    <div className="layout">
      <Header />
      <Main />
    </div>
  );
};

export default LayoutA;
