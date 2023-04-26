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

//Testing data
import { testEmployeeData } from "../../testdata/testEmployeeData";

const DashboardUser = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);

  const employees: IUserData[] = [];
  /** fetch employees list from db  */

  const [selected, setSelected] = useState<string[]>([]);

  function clickHandler(e: React.MouseEvent) {
    console.log("clicked");
    e.currentTarget.classList.toggle("selectedClass");
  }

  function submitHandler() {}

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
        <div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={submitHandler}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
