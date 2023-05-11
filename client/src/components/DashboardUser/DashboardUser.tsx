//React
import React, { useState } from "react";
import axios from "axios";

// Redux
import { useSelector } from "react-redux";

//Pages and Components
import Card from "../Card/Card";
import SearchBar from "../DashboardAdmin/SearchBar/SearchBar";

//Styling
import styles from "./DashboardUser.module.css";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Types
import { IUserDataGet } from "../../types/users";

//Testing data
//import { testEmployeeData } from "../../testdata/testEmployeeData";
import { useGetAllUsersQuery } from "../../features/userApi";
import { useGetAllRequestPicksQuery } from "../../features/requestPicksApi";
import UserPickBlock from "./UserPickBlock";

const DashboardUser = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { t, i18n } = useTranslation(["dashboardUser"]);
  const serverEndpoint = process.env.REACT_APP_SERVER_ENDPOINT;
  const emp_id = ""; //replace with actual uid when available
  const userInfo = useSelector((state: any) => state.auth.user);
  const usersData = useGetAllUsersQuery();
  const employees: IUserDataGet[] = [];
  /** this will be fetched using RTK Query */

  const [selected, setSelected] = useState<IUserDataGet[]>([]);

  if (usersData.isFetching) return <p>Loading...</p>;

  const submitHandler = () => {
    console.log("Submitting:", selected); //debugging
    axios.patch(`${serverEndpoint}/picks/${emp_id}`, {});
  };

  const doneHandler = (picksSelected: IUserDataGet[]) => {
    setSelected([...picksSelected]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <UserPickBlock
          editHandler={doneHandler}
          doneHandler={() => {}}
          heading={t("title")}
          defaultEditing={true}
          defaultSelection={[]}
        />
        <div className={styles.submit_container}>
          <button
            type="button"
            className={`${styles.submitButton} ${
              selected.length < 5 && styles.inactive
            }`}
            disabled={selected.length < 5}
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
