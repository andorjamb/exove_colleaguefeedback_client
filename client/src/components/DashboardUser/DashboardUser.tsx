//React
import React, { useState } from "react";

//Pages and Components
import Sidebar from "../Sidebar/Sidebar";
import Card from "../Card/Card";

//Styling
import styles from "./DashboardUser.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Types
import { IUser } from "../../types/users";

const DashboardUser = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);

  const employees: IUser[] = [];
  /** fetch employees list form db  */

  const [selection, setSelection] = useState([]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div>
          <h3>{t("title")}</h3>
        </div>
        <div>
          <input type="search" className={styles.searchBar} />
          <button className={styles.done}>{t("done")}</button>
        </div>
      </div>

      <div className={styles.selectionGrid}>
        {employees?.map((item) => (
          <Card />
        ))}
      </div>
    </div>
  );
};

export default DashboardUser;
