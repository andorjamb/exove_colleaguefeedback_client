import React, { useState, useEffect } from "react";

//Pages and Components
import DashboardAdmin from "../../components/DashboardAdmin/DashboardAdmin";
import DashboardUser from "../../components/DashboardUser/DashboardUser";
import DashboardManager from "../../components/DashboardManager/DashboardManager";

// Types
import { loggedInUser } from "../../types/users";

// Functions
import { getSecureUserUid } from "../../functions/secureUser";

//Styling
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [currentUserInfo, setCurrentUserInfo] = useState<loggedInUser>();
  const [isHR, setIsHR] = useState<boolean | undefined>();

  const getUserInfo = async () => {
    const userDetails: loggedInUser = await getSecureUserUid();
    setCurrentUserInfo(userDetails);
  };

  useEffect(() => {
    try {
      getUserInfo();
    } catch (err) {
      console.log("error getting user", err);
    }
  }, []);

  useEffect(() => {
    // When user info is ready, determine if user is HR
    if (!currentUserInfo) {
      return;
    }
    if (currentUserInfo.roleLevel < 3) setIsHR(true);
    else setIsHR(false);
  }, [currentUserInfo]);

  if (!currentUserInfo) return <p>user info loading...</p>;

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      {isHR ? (
        <DashboardAdmin />
      ) : (
        <DashboardUser currentUserInfo={currentUserInfo} />
      )}
    </div>
  );
};

export default Dashboard;
