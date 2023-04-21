import React from "react";

const AdminNav = () => {
  return (
    <nav className="col-span-4 flex flex-wrap justify-between p-4">
      <ul className="flex">
        <li className="block">
          <a href="/admin/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin/template">Templates</a>
        </li>
        <li>
          <a href="/user/">Go to user view</a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
