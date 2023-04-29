import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Styling
import styles from "./Dashboard.module.css";

//Pages and Components
import DashboardAdmin from "../../components/DashboardAdmin/DashboardAdmin";
import DashboardUser from "../../components/DashboardUser/DashboardUser";
import DashboardManager from "../../components/DashboardManager/DashboardManager";

const Dashboard = () => {
  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);

  useEffect(() => {
    //debugging
    console.log("loggedIn:", loggedIn);
    console.log("isAdmin:", isAdmin);
  }, []);
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      {isAdmin ? <DashboardAdmin /> : <DashboardUser />}
    </div>
  );
};

export default Dashboard;
