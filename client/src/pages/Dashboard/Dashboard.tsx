import React, { useState } from "react";

//Styling
import styles from "./Dashboard.module.css";

//Pages and Components
import DashboardAdmin from "../../components/DashboardAdmin/DashboardAdmin";
import DashboardUser from "../../components/DashboardUser/DashboardUser";

const Dashboard = () => {
  const [admin, setAdmin] =
    useState(false); /** placeholder value for auth state*/
  return (
    <div className={styles.container}>
      {admin ? <DashboardAdmin /> : <DashboardUser />}
    </div>
  );
};

export default Dashboard;
