import React from "react";

// Components and pages
import AdminNav from "./AdminNav";
import Nav from "./Nav";

/** if user == admin, return AdminNav, else return Nav */

const Header = () => {
  return (
    <div>
      <AdminNav />
    </div>
  );
};

export default Header;
