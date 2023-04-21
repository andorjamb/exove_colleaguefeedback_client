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

  /*   const selectEng = () => {
    i18n.changeLanguage("en");
  };
  const selectFi = () => {
    i18n.changeLanguage("fi");
  }; */

  return (
    <div className={styles.container}>
      <AdminNav />

      <button className={styles.signout}> {t("signOut")}</button>
    </div>
  );
};

export default Header;
