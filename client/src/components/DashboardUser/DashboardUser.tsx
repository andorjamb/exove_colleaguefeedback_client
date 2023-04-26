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

  function clickHandler(e: React.MouseEvent<HTMLDivElement>, id: string) {
    console.log(e.currentTarget); //debugging
    console.log(id); //debugging
    setSelected((selected) => [...selected, id]);
  }

  function submitHandler() {
    console.log(selected); //debugging
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
              clickCallback={(e: any) => clickHandler(e, item.id)}
            />
          ))}
        </div>
        <div>
          <button
            type="button"
            className={styles.submitButton}
            onClick={submitHandler}
          >
            {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
