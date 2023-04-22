//React
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// Components and pages
import AdminNav from "../AdminNav/AdminNav";
import Nav from "../Nav/Nav";

//Styling
import styles from "./Header.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

/** if user == admin, return AdminNav, else return Nav */

const Header = () => {
  const lang = useSelector((state: any) => state.header.lang);
  const { t, i18n } = useTranslation(["header"]);

  const selectEng = () => {
    i18n.changeLanguage("en");
  };
  const selectFi = () => {
    i18n.changeLanguage("fi");
  };

  return (
    <div className={styles.container}>
      <AdminNav />
      <div className={styles.langButtonDiv}>
        <button className={styles.button} onClick={selectEng}>
          EN
        </button>
        <button
          className={[styles.button, styles.langButton].join(" ")}
          onClick={selectFi}
        >
          FI
        </button>
      </div>

      <button className={styles.signout}> {t("signOut")}</button>
    </div>
  );
};

export default Header;
