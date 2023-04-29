import React from "react";

//styles
import styles from "./Nav.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

const Nav = () => {
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
          <a className={styles.a} href="/admin/template">
            {t("")}
          </a>
        </li>
        <li className={styles.li}>
          <a className={styles.a} href="/">
            {t("")}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
