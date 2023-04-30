//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Functions and Hooks
import { setIsAdmin, setLoggedIn } from "../../features/authSlice";
import { loginUser } from "../../features/authSlice";
import { useGetUserDataQuery } from "../../features/userApi";

// Styling
import styles from "./Login.module.css";
import { AppDispatch } from "../../app/store";

interface ILoginParams {
  username: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation(["login"]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  //const { error } = useSelector((state: any) => state.auth);

  const devLoginEndpoint = "http://localhost:4000/testpost";
  // `${process.env.REACT_APP_SERVER_URL}/api/login` as string;
  const prodLoginEndpoint = "https://exove.vercel.app/api/login";

  const [loginParams, setLoginParams] = useState<ILoginParams>({
    username: "",
    password: "",
  });

  async function picksHandler(e: any) {
    e.preventDefault();
    await axios
      .get("https://exove.vercel.app/api/picks", { withCredentials: true })
      .then((res) => console.log(res));
  }

  const handleChange = (e: any) => {
    setLoginParams({
      ...loginParams,
      [e.target.name]: e.target.value,
    });
  };

  const userLogin = async (e: any) => {
    e.preventDefault();
    console.log({ loginParams }); //debugging

    try {
      console.log(prodLoginEndpoint, loginParams); //debugging
      await axios
        .post(prodLoginEndpoint, loginParams, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          if (res.data?.rolesId?.roleLevel < 3) {
            sessionStorage.setItem("isAdmin", "true");
            dispatch(setIsAdmin(true));
          }
        })
        .then(() => {
          sessionStorage.setItem("loggedIn", "true");
          dispatch(setLoggedIn(true));
        });
      // setLoginParams({ username: "", password: "" });
    } catch (err) {
      console.log(err);
      setLoginParams({ username: "", password: "" });
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn]);

  return (
    <>
      <section className={styles.loginContainer}>
        <div className={styles.login}>
          <h1 className={styles.h1}>{t("loginTitle")}</h1>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formElements}>
                <label className={styles.label} htmlFor="username">
                  {t("username")}
                </label>
                <input
                  type="text"
                  className={styles.input}
                  name="username"
                  id="username"
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
                  onClick={(e) => userLogin(e)}
                >
                  {t("signIn")}
                </button>
                <button onClick={picksHandler}>get picks</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
