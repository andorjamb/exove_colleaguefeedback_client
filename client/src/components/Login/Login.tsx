//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//
import { setLoggedIn } from "../../features/headerSlice";
import { loginUser } from "../../features/authSlice";

// Styling
import styles from "./Login.module.css";

interface ILoginParams {
  userName: string;
  password: string;
}

const Login = () => {
  const { t, i18n } = useTranslation(["login"]);
  const dispatch = useDispatch();
  const {error } = useSelector((state:any)=>state.auth);
  const loginEndpoint =
    `${process.env.REACT_APP_SERVER_ENDPOINT}/ldap` as string;

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

  const fakeLogin = (e: any) => {
    // temporary placeholder for ui testing
    e.preventDefault();
    dispatch(setLoggedIn(true));
  };

  const login = (e: any) => {
    /** use when LDAP endpoint is ready */
    e.preventDefault();
    console.log("login parameters:", loginParams);
   //dispatch(loginUser(loginParams));
   //setSubmitReady(true);
  };

  /*   async function ldapQuery() {
    try {
      await axios
        .post(loginEndpoint, { loginParams })
        .then((res) => console.log(res.data()));
      dispatch(setLoggedIn(true));
    } catch (err) {
      console.log(err);
    }
  } */

  useEffect(() => {
    // ldapQuery();
    loginUser(loginParams);
    //eslint-disable-next-line
  }, [submitReady]);

  return (
    <>
      <section className={styles.loginContainer}>
        <div className={styles.login}>
          <h1 className={styles.h1}>{t("loginTitle")}</h1>
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
                  onClick={(e) => fakeLogin(e)} //replace with real function
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
