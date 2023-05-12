//React
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../features/userApi";
import { useGetAllRequestPicksQuery } from "../../features/requestPicksApi";
import { getSecureUserUid } from "../../functions/secureUser";
import { useGetRequestPickByUserIdQuery } from "../../features/requestPicksApi";

//Pages and Components
import Card from "../Card/Card";
import SearchBar from "../DashboardAdmin/SearchBar/SearchBar";
import UserPickBlock from "./UserPickBlock";

//Styling
import styles from "./DashboardUser.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Types
import { IUserDataGet, loggedInUser } from "../../types/users";

const DashboardUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["dashboardUser"]);

  const serverEndpoint = "https://exove.vercel.app/api";
  const usersData = useGetAllUsersQuery();
  const employeesList: IUserDataGet[] = [];

  const [selected, setSelected] = useState<IUserDataGet[]>([]);
  const [currentUserInfo, setCurrentUserInfo] = useState<loggedInUser>();

  const getUserInfo = async () => {
    const userDetails: loggedInUser = await getSecureUserUid();
    setCurrentUserInfo(userDetails);
    console.log("loggedInUser", userDetails);
  };

  useEffect(() => {
    try {
      getUserInfo();
    } catch (err) {
      console.log("error getting user", err);
    }
  }, []);
  if (usersData.isFetching || !currentUserInfo) return <p>Loading...</p>;

  const submitHandler = () => {
    console.log("Submitting:", selected); //debugging
    axios.patch(`${serverEndpoint}/picks/${currentUserInfo.uid}`, {});
    axios.patch(`${serverEndpoint}/picks/${currentUserInfo}`, {});
  };

  const doneHandler = (picksSelected: IUserDataGet[]) => {
    setSelected([...picksSelected]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <UserPickBlock
          editHandler={doneHandler}
          doneHandler={() => {}}
          heading={t("title")}
          defaultEditing={true}
          defaultSelection={[]}
        />
        <div className={styles.submit_container}>
          <button
            type="button"
            className={`${styles.submitButton} ${
              selected.length < 5 && styles.inactive
            }`}
            disabled={selected.length < 5}
            onClick={submitHandler}
          >
            {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
