//React
import React from "react";

//Styling
import styles from "./AdminNav.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  const { t } = useTranslation(["header"]);
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? `${styles.navlink} ${styles.pending}`
              : isActive
              ? `${styles.navlink} ${styles.active}`
              : styles.navlink
          }
          to="/dashboard"
        >
          <li className={styles.li}>{t("dashboard")}</li>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? `${styles.navlink} ${styles.pending}`
              : isActive
              ? `${styles.navlink} ${styles.active}`
              : styles.navlink
          }
          to="/template"
        >
          <li className={styles.li}>{t("templates")}</li>
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? `${styles.navlink} ${styles.pending}`
              : isActive
              ? `${styles.navlink} ${styles.active}`
              : styles.navlink
          }
          to="/dashboard"
        >
          <li className={styles.li}>
            <a className={styles.a} href="/dashboard">
              {t("userView")}
            </a>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default AdminNav;
