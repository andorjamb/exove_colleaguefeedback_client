import React from "react";

const AdminNav = () => {
  return (
    <nav className="border-gray-200 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <ul className="bg-gray">
        <li>
          <a href="/admin/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin/template">Templates</a>
        </li>
        <li>
          <a href="/user/">Go to user view</a>
        </li>
      </ul>
      Admin navbar
    </nav>
  );
};

export default AdminNav;
