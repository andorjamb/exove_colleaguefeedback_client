import React from "react";

// Components and pages
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

/** Layout for feedback pages, containing sidebar nav */

const LayoutAdmin = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};

export default LayoutAdmin;
