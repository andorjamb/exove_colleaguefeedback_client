//React
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../features/userApi";
import {
  useGetAllRequestPicksQuery,
  useSubmitPickMutation,
} from "../../features/requestPicksApi";
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
import { IRequestPicks } from "../../types/picks";
import Submitted from "./Submitted";

const DashboardUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(["dashboardUser"]);
  const serverEndpoint = "https://exove.vercel.app/api";
  const usersData = useGetAllUsersQuery();
  const picksData = useGetAllRequestPicksQuery();
  const [submitPick] = useSubmitPickMutation();
  const employeesList: IUserDataGet[] = [];
  const [selected, setSelected] = useState<IUserDataGet[]>([]);
  const [currentUserInfo, setCurrentUserInfo] = useState<loggedInUser>();
  const [currentUserPick, setCurrentUserPick] = useState<IRequestPicks>();
  const [submitted, setSubmitted] = useState(false);

  const getUserInfo = async () => {
    if (picksData.isFetching || !picksData.data) return;
    const userDetails: loggedInUser = await getSecureUserUid();
    setCurrentUserInfo(userDetails);
    console.log("loggedInUser", userDetails);
    console.log(
      "Pick for this user found:",
      picksData.data.find((pick) => pick.requestedTo === currentUserInfo?.uid)
    );
    setCurrentUserPick(
      picksData.data.find((pick) => pick.requestedTo === currentUserInfo?.uid)
    );
  };

  useEffect(() => {
    try {
      getUserInfo();
      // getting 403 error here
    } catch (err) {
      console.log("error getting user", err);
    }
  }, []);

  // Differenciate between loading and no pick found?
  if (usersData.isFetching || !usersData.data || !currentUserInfo)
    return <p>Loading...</p>;

  const submitHandler = async () => {
    if (!currentUserPick) return;
    console.log("Submitting:", selected); //debugging
    const submitBodies = selected.map((user) => {
      return { userId: user.ldapUid, roleLevel: 5 };
    });
    /* "userId": "einstein",
        "roleLevel": 6 */
    setSubmitted(true);
    // Check uniqueness
    submitBodies.forEach((submitBody) =>
      submitPick({ body: submitBody, id: currentUserPick._id })
    );
    /*  axios.patch(`${serverEndpoint}/picks/${currentUserInfo.uid}`, {});
    axios.patch(`${serverEndpoint}/picks/${currentUserInfo}`, {}); */
  };

  const doneHandler = (picksSelected: IUserDataGet[]) => {
    setSelected([...picksSelected]);
  };

  return (
    <div className={styles.container}>
      {submitted ? (
        <Submitted />
      ) : (
        <div className={styles.mainContent}>
          <UserPickBlock
            users={usersData.data.filter(
              (user) => user.ldapUid !== currentUserInfo.uid
            )}
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
      )}
    </div>
  );
};

export default DashboardUser;
