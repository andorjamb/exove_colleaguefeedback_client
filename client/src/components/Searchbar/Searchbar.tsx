import React from "react";

//Styling
import styles from "./Searchbar.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);
  return (
    <div className={styles.container}>
      <input type="search" className={styles.searchBar} />
      <button className={styles.doneButton}>{t("done")}</button>
    </div>
  );
};

export default Searchbar;
