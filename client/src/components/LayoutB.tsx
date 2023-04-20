import React from "react";

// Components and pages
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

/** Layout for feedback pages, containing sidebar nav */

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  );
};

export default Layout;
