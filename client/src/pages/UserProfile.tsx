import React from "react";

//translations
import "../translations/i18next";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const { t, i18n } = useTranslation(["userProfile"]);

  return (
    <div className="container h-full">
      <div>
        <div>
          <div>Profile image</div>
          <h1>Username</h1>
          <h3>Title</h3>
          <button> {t("sendAllRequests")}</button>
        </div>
        ±
      </div>
    </div>
  );
};

export default UserProfile;
