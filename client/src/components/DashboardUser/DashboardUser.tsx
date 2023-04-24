//React
import React, { useState } from "react";

import axios from "axios";

//Pages and Components
import Sidebar from "../Sidebar/Sidebar";
import Card from "../Card/Card";

//Styling
import styles from "./DashboardUser.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Types
import { IUserData } from "../../types/users";

const DashboardUser = () => {
  const { t, i18n } = useTranslation(["dashboardUser"]);

  const employees: IUserData[] = [];
  /** fetch employees list from db  */

  const testEmployeeData: IUserData[] = [
    {
      id: "anna01",
      firstName: "Anna",
      surname: "Petelin",
      email: "anna@fakemail.com",
      displayName: "Anna Petelin",
      personal: {
        honorific: "",
        shortBirthDate: "",
        gender: "",
      },
      about: {
        avatar:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
        hobbies: [""],
      },
      work: {
        reportsTo: {
          id: "",
          firstName: "",
          surname: "",
          email: "",
        },
        title: "Junior Developer",
        department: "IT",
        site: "Helsinki",
        startDate: "",
      },
    },
  ];

  const [selection, setSelection] = useState([]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div>
          <h3>{t("title")}</h3>
        </div>
        <div>
          <input type="search" className={styles.searchBar} />
          <button className={styles.done}>{t("done")}</button>
        </div>
        <div className={styles.selectionGrid}>
          {testEmployeeData?.map((item) => (
            <Card employee={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
