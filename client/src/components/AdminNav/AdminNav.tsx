//React
import React from "react";

//Styling
import styles from "./AdminNav.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

const AdminNav = () => {
  const { t } = useTranslation(["header"]);
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <a className={styles.a} href="/dashboard">
            {t("dashboard")}
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="/template">
            {t("templates")}
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="/dashboard">
            {t("userView")}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
