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
import SearchBar from "../DashboardAdmin/SearchBar/SearchBar";
import { useGetAllUsersQuery } from "../../features/userApi";

const DashboardUser = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { t, i18n } = useTranslation(["dashboardUser"]);
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT; //
  const emp_id = ""; //replace with actual uid when available

  const usersData = useGetAllUsersQuery();
  const employees: IUserData[] = [];
  /** this will be fetched using RTK Query */

  const [selected, setSelected] = useState<string[]>([]);

  if (usersData.isFetching) return <p>Loading...</p>;

  console.log("selected", selected);

  const filteredUsersData = usersData.data
    ?.filter((user) => user.userStatus)
    .filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchInput.toLowerCase())
    );

  function clickHandler(e: React.MouseEvent<HTMLDivElement>, id: string) {
    console.log(e.currentTarget); //debugging
    console.log(id); //debugging
    setSelected((selected) => [...selected, id]);
  }

  function submitHandler() {
    console.log(selected); //debugging
    axios.patch(`${serverEndpoint}/picks/${emp_id}`, {});
  }

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("curr search:", e.currentTarget.value);
    setSearchInput(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div>
          <h3>{t("title")}</h3>
        </div>
        <SearchBar
          onChangeHandler={searchChangeHandler}
          inputValue={searchInput}
        />
        <div className={styles.selectionGrid}>
          {filteredUsersData!.map((item) => (
            <Card
              key={item._id}
              employee={item}
              clickCallback={(e: any) => clickHandler(e, item._id)}
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
