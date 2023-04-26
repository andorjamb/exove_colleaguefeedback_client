//React
import React, { useState } from "react";

import axios from "axios";

//Pages and Components
import Card from "../Card/Card";
import Searchbar from "../Searchbar/Searchbar";

//Styling
import styles from "./DashboardUser.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Types
import { IUserData } from "../../types/users";

import { testEmployeeData } from "../../testdata/testEmployeeData";

const DashboardUser = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);

  const employees: IUserData[] = [];
  /** fetch employees list from db  */

  const [selection, setSelection] = useState([]);

  function clickHandler(event: React.MouseEvent) {
    console.log("clicked");
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div>
          <h3>{t("title")}</h3>
        </div>
        <Searchbar />
        <div className={styles.selectionGrid}>
          {testEmployeeData?.map((item) => (
            <Card
              key={item.id}
              employee={item}
              clickHandler={(e: any) => clickHandler(e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
