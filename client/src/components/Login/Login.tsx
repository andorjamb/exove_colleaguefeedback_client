import React from "react";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

// Styling
import styles from "./Login.module.css";

//Pages and Components
import Header from "../Header/Header";

//connects with LDAP server to check login details and assign privileges

const Login = () => {
  const { t, i18n } = useTranslation(["login"]);

  const selectEng = () => {
    i18n.changeLanguage("en");
  };
  const selectFi = () => {
    i18n.changeLanguage("fi");
  };

  return (
    <>
      <section className={styles.loginContainer}>
        <Header />
        <div className={styles.login}>
          <h1 className={styles.h1}>{t("loginTitle")}</h1>

          <div></div>

          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formElements}>
                <label className={styles.label} htmlFor="email">
                  {t("email")}
                </label>
                <input
                  type="email"
                  className={styles.input}
                  name="email"
                  id="email"
                ></input>
              </div>
              <div className={styles.formElements}>
                <label className={styles.label} htmlFor="password">
                  {t("password")}
                </label>
                <input
                  type="password"
                  className={styles.input}
                  name="password"
                  id="password"
                ></input>
              </div>
              <div className={styles.formElements}>
                <button
                  className={[styles.button, styles.loginButton].join(" ")}
                >
                  {t("signIn")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
