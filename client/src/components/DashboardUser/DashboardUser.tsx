//React
import React, { useEffect, useState } from "react";
import axios from "axios";

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
import { IUserDataGet } from "../../types/users";
import { loggedInUser } from "../../types/users";

const DashboardUser = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;
  const usersData = useGetAllUsersQuery();
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
