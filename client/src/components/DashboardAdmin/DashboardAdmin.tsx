// React
import { useEffect, useState } from "react";
import axios from "axios";

// API, redux
import { useGetAllFeedbacksQuery } from "../../features/feedbackApi";
import { useGetAllRequestPicksQuery } from "../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../features/userApi";
import { useGetActiveTemplateQuery } from "../../features/templateApi";

// Components
import BulkButtons from "./BulkButtons/BulkButtons";
import SearchBar from "./SearchBar/SearchBar";
import PersonRow from "./PersonRow/PersonRow";
import CustomSpinner from "../CustomSpinner/CustomSpinner";

// Types
import { IUserDataGet } from "../../types/users";

// Styles
import styles from "./DashboardAdmin.module.css";

const DashboardAdmin = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const feedbackData = useGetAllFeedbacksQuery();
  const usersData = useGetAllUsersQuery();
  const picksData = useGetAllRequestPicksQuery();
  const activeTemplateData = useGetActiveTemplateQuery();
  console.log("activeTemplateData", activeTemplateData.data);
  const [showModal, setShowModal] = useState(false);

  if (
    activeTemplateData.isFetching ||
    !usersData ||
    usersData.isFetching ||
    !usersData.data ||
    feedbackData.isFetching ||
    picksData.isFetching ||
    !picksData.data
  )
    return (
      <>
        <CustomSpinner />
        <p>Loading...</p>
      </>
    );

  if (!activeTemplateData.data)
    return <p>No active templates. Create one here</p>;

  // Filtering picks to only contain active ones

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value);
  };

  let filteredUsers: IUserDataGet[];

  if (!usersData.isFetching && usersData.data)
    filteredUsers = usersData.data
      .filter((user) => user.userStatus)
      .filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.surname.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.displayName.toLowerCase().includes(searchInput.toLowerCase())
      );

  if (!usersData.data)
    return (
      <>
        <CustomSpinner />
        <p>Loading...</p>
      </>
    );

  return (
    <div className={styles.dashboard_wrapper}>
      <div className={styles.dashboard_container}>
        <div className={styles.search_buttons_container}>
          <SearchBar
            inputValue={searchInput}
            onChangeHandler={searchChangeHandler}
          />
          <BulkButtons allPicks={picksData.data} allUsers={usersData.data} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee name</th>
              <th>Coll.</th>
              <th>Sub.</th>
              <th>PM</th>
              <th>CM</th>
              <th>Picks</th>
              <th>Feedbacks</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers!.map((currUser) => {
              return (
                <PersonRow
                  key={currUser._id}
                  currentTemplateId={activeTemplateData.data!._id}
                  user={currUser}
                  userPicks={picksData.data!.find(
                    (pick) => pick.requestedTo === currUser.ldapUid
                  )}
                  userFeedbacks={feedbackData.data!.filter(
                    (feedback) => feedback.feedbackTo === currUser.ldapUid
                  )}
                  allUsersData={usersData.data ? usersData.data : []}
                  /* showEditPicks={() => setShowModal(true)} */
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAdmin;
