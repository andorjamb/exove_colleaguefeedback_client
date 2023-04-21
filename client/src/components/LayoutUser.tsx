import React from "react";

// Components and pages
import Header from "./Header/Header";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import "../styles/Layout.css";

/** Layout for feedback pages, containing sidebar nav */

const LayoutUser = () => {
  return (
    <div className="container h-screen grid grid-cols-4">
      <Header />
      <Sidebar />
      <Main />
    </div>
  );
};

export default LayoutUser;
