import React from "react";

//Styling
import styles from "./Searchbar.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

interface Props {
  onChange: any;
}

const Searchbar = ({ onChange }: Props) => {
  const { t, i18n } = useTranslation(["dashboardUser"]);
  return (
    <div className={styles.container}>
      <label style={{ display: "flex", width: "75vw" }}>
        <input type="search" className={styles.searchBar} onChange={onChange} />
        <div className={styles.searchIconDiv}>
          <span className={styles.materialIcons}>search</span>
        </div>
      </label>
      <button className={styles.doneButton}>{t("done")}</button>
    </div>
  );
};

export default Searchbar;
