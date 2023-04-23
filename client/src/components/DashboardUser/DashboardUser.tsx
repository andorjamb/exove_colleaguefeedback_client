//React
import React, { useState } from "react";

//Styling
import styles from "./DashboardUser.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

const DashboardUser = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);

  const [selection, setSelection] = useState([]);

  return (
    <div className={styles.container}>
      <div>
        <h3>{t("title")}</h3>
      </div>
      <div>
        <input type="search" className={styles.searchBar} />
        <button>{t("done")}</button>
      </div>
      <div className={styles.grid}></div>
    </div>
  );
};

export default DashboardUser;
