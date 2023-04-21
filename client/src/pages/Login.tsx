import React from "react";
import "../translations/i18next";
import { useTranslation } from "react-i18next";

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
    <section className="h-screen">
      <div className="container h-full px-6 py-24 bg-darkblack ">
        <h1 className="text-[#50d71e]">{t("loginTitle")}</h1>

        <div>
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <button
              className="text-white-500 m-3 inline-block rounded px-6 p-2 w-5 text-center"
              onClick={selectEng}
            >
              EN
            </button>
            <button
              className="m-3 inline-block rounded px-6 p-2 w-5 text-center"
              onClick={selectFi}
            >
              FI
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <form>
            <label
              className="pointer-events-none left-3 top-0 mb-0 text-[#50d71e]"
              htmlFor="email"
            >
              {t("email")}
            </label>
            <input
              type="email"
              className="min-h w-full rounded border-0 bg-transparent px-3"
              name="email"
              id="email"
            ></input>
            <label
              className="pointer-events-none left-3 top-0 mb-0 text-[#50d71e]"
              htmlFor="password"
            >
              {t("password")}
            </label>
            <input
              type="password"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem]"
              name="password"
              id="password"
            ></input>
            <button className="mb-3 inline-block rounded px-6 pb-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
