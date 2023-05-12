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

  const [searchInput, setSearchInput] = useState<string>("");
  const serverEndpoint = "https://exove.vercel.app/api";
  const [userInfo, setUserInfo] = useState<loggedInUser>();
  const usersData = useGetAllUsersQuery();
  const employeesList: IUserDataGet[] = [];

  const [selected, setSelected] = useState<IUserDataGet[]>([]);
  const [currentUserInfo, setCurrentUserInfo] = useState<loggedInUser>();

  const submitHandler = () => {
    console.log("Submitting:", selected); //debugging
    axios.patch(`${serverEndpoint}/picks/${userInfo?.uid}`, {});
  };

  const doneHandler = (picksSelected: IUserDataGet[]) => {
    setSelected([...picksSelected]);
    if (selected.length < 6) {
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDetails: loggedInUser = await getSecureUserUid();
        if (userDetails) {
          setUserInfo(userDetails);
          console.log(userDetails);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    //eslint-disable-next-line
  }, []);

  if (usersData.isFetching) return <p>Loading...</p>;
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
