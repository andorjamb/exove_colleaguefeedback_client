import React from "react";

// Components and pages
import AdminNav from "../AdminNav/AdminNav";
import Nav from "../Nav/Nav";

/** if user == admin, return AdminNav, else return Nav */

const Header = () => {
  return (
    <div className="container col-span-4 flex h-3">
      <AdminNav />
    </div>
  );
};

export default Header;
