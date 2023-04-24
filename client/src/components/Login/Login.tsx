//React
import React, { useState, useEffect } from "react";

import axios from "axios";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

// Styling
import styles from "./Login.module.css";

//connects with LDAP server to check login details and assign privileges

interface ILoginParams {
  userName: string;
  password: string;
}

const Login = () => {
  const { t, i18n } = useTranslation(["login"]);
  const loginEndpoint = process.env.REACT_APP_LOGIN_ENDPOINT as string;

  const [loginParams, setLoginParams] = useState<ILoginParams>({
    userName: "",
    password: "",
  });
  const [submitReady, setSubmitReady] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setLoginParams({
      ...loginParams,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e: any) => {
    e.preventDefault();
    console.log("login parameters:", loginParams);
    setSubmitReady(true);
  };

  async function ldapQuery() {
    try {
      await axios
        .post(loginEndpoint, { loginParams })
        .then((res) => console.log(res.data()));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    ldapQuery();
    //eslint-disable-next-line
  }, [submitReady]);

  return (
    <>
      <section className={styles.loginContainer}>
        <div className={styles.login}>
          <h1 className={styles.h1}>{t("loginTitle")}</h1>

          <div></div>

          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formElements}>
                <label className={styles.label} htmlFor="userName">
                  {t("userName")}
                </label>
                <input
                  type="text"
                  className={styles.input}
                  name="userName"
                  id="userName"
                  onChange={handleChange}
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
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles.formElements}>
                <button
                  className={[styles.button, styles.loginButton].join(" ")}
                  type="submit"
                  onClick={(e) => submitLogin(e)}
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
