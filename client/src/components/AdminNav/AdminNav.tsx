//React
import React from "react";
import { Link } from "react-router-dom";

//Styling
import styles from "./AdminNav.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

const AdminNav = () => {
  const { t, i18n } = useTranslation(["header"]);
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <a className={styles.a} href="/dashboard">
            {t("dashboard")}
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="/admin_dashboard">
            {t("Admin dashboard")}
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="/admin/template">
            {t("templates")}
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="/">
            {t("userView")}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
