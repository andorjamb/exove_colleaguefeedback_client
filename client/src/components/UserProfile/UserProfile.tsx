//React
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Redux
import { useGetAllUsersQuery } from "../../features/userApi";
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
} from "../../features/requestPicksApi";
import { getSecureUserUid } from "../../functions/secureUser";
import { useGetReportSummaryByIdQuery } from "../../features/reportApi";
import { useGetUserByLdapUidQuery } from "../../features/userApi";

//Styles
//import styles from "../../pages/Profile/Profile.module.css";
import styles from "./UserProfile.module.css";
//Types
import { IUserDataGet, loggedInUser } from "../../types/users";

//Components
import UserPickBlock from "../DashboardUser/UserPickBlock";
import Card from "../../components/Card/Card";

//translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

type selectedList = {
  userId: string;
  selectionStatus: boolean;
  roleLevel: number;
  feedBackSubmitted: boolean;
  selectedBy: string;
  _id: string;
};

const UserProfile = () => {
  const { t } = useTranslation(["userProfile"]);
  const { userId } = useParams();
  console.log(userId);
  const getUser = useGetUserByLdapUidQuery(userId as any);
  const userPicks = useGetRequestPickByUserIdQuery(userId as any).data;
  const user = getUser.data;
  console.log("userPicks", userPicks);

  const usersData = useGetAllUsersQuery();
  const allPicks = useGetAllRequestPicksQuery().data;
  const [currentUserInfo, setCurrentUserInfo] = useState<loggedInUser>();
  const [selectedUserData, setSelectedUserData] = useState<IUserDataGet[]>([]);
  const [selectedListArray, setSelectedListArray] = useState<selectedList[]>(
    []
  );
  const [selectedIdArray, setSelectedIdArray] = useState<string[]>([]);
  console.log(user);
  console.log("all picks", allPicks);
  const getUserInfo = async () => {
    //if (picksData.isFetching || !picksData.data) return;
    const userDetails: loggedInUser = await getSecureUserUid();
    setCurrentUserInfo(userDetails);
  };
  //requestedBy = HR
  let userSelectedPicks = userPicks[0].SelectedList


  console.log("users picks", userSelectedPicks);
  console.log();
  const doneHandler = (picksSelected: IUserDataGet[]) => {
    setSelectedUserData([...picksSelected]);
  };

  useEffect(() => {
    let selectedUserIdArray = userPicks[0].SelectedList.map((item)=>item.userId)
    console.log("array", selectedUserIdArray);
    setSelectedIdArray(selectedUserIdArray);
  }, [allPicks, userPicks]);

  useEffect(() => {
    try {
      getUserInfo();
    } catch (err) {
      console.log("error getting user", err);
    }
  }, []);

  return (
    <div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarDiv}>
          {user?.imageUrl ? (
            <img
              className={styles.avatarLarge}
              src={user.imageUrl}
              alt="avatar"
            />
          ) : (
            <img
              className={styles.avatarLarge}
              src="https://www.exove.com/app/uploads/2021/06/Exove-employee-no-image.png"
              alt="avatar"
            />
          )}
        </div>
        <div className={styles.headerTitleDiv}>
          <h1>{user?.firstName + " " + user?.surname}</h1>
          <h4>{user?.title}</h4>
        </div>
        <div className={styles.headerButtonDiv}>
          <button className={styles.buttonOrange}>
            {t("sendAllRequests")}
          </button>
        </div>
      </div>
      <div className={styles.selectionContainer}>
        <section className={styles.selectionBlock}>
          <h2>{t("competenceManager")}</h2>
        </section>
        <section className={styles.selectionBlock}>
          <h2>{t("projectManager")}</h2>
        </section>
        <section className={styles.selectionBlock}>
          <h2>{t("subordinates")}</h2>
        </section>
        <section className={styles.selectionBlock}>
          <h2>{t("colleagues")}</h2>

          {usersData.data && currentUserInfo ? (
            <UserPickBlock
              users={usersData.data.filter((user) =>
                selectedIdArray.includes(user.ldapUid)
              )}
              editHandler={doneHandler}
              doneHandler={() => {
                console.log("placeholder");
              }}
              heading={""}
              defaultEditing={true}
              defaultSelection={[]}
            />
          ) : (
            <p>..... loading .....</p>
          )}
        </section>
        <div className={styles.mainContent}></div>
      </div>
    </div>
  );
};

export default UserProfile;
