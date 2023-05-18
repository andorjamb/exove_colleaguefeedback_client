//React
import React from "react";
//Styles
import styles from "../../pages/Profile/Profile.module.css";
//Types
import { IUserDataGet } from "../../types/users";
//Components
import UserPickBlock from "../DashboardUser/UserPickBlock";
//translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

interface Props {
  user: IUserDataGet | undefined;
}
const UserProfile = ({ user }: Props) => {
  const { t } = useTranslation(["userProfile"]);
  return (
    <div>
      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}></div>
        <div>
          <h1>{user?.firstName + " " + user?.surname}</h1>
          <h4>{user?.title}</h4>
          <button className={styles.buttonOrange}> {t("sendAllRequests")}</button>
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
        </section>
        {/*   <UserPickBlock
          doneHandler={}
          editHandler={}
          heading={}
          defaultEditing={}
          defaultSelection={}
        /> */}
      </div>
    </div>
  );
};

export default UserProfile;
