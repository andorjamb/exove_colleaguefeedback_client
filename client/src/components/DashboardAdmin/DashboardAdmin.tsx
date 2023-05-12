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

// Types
import { ITemplateGet } from "../../types/template";
import { IFeedback } from "../../types/feedback";
import { IRequestPicks } from "../../types/picks";
import { IUserDataGet } from "../../types/users";

// Styles
import styles from "./DashboardAdmin.module.css";

interface IUser {
  _id: {
    type: string;
    required: true;
    unique: true;
  };
  email: {
    type: string;
    required: true;
  };
  displayName: StaticRangeInit;
  firstName: { type: string; required: true };
}

interface IUserRoles {
  _id: string;
  userId: string;
  roleId: string;
}

interface IUserData {
  _id: string;
  ldapUid: string;
  firstName: string;
  surname: string;
  email: string;
  displayName: string;
  phone: string;
  about: {
    avatar: string;
    hobbies: string[];
  };
  work: {
    reportsTo: {
      id: string;
      firstName: string;
      surname: string;
      email: string;
    };
    title: string;
    department: string;
    site: string;
    startDate: string;
  };
  userStatus: boolean;
}

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
    usersData.isFetching ||
    feedbackData.isFetching ||
    picksData.isFetching
  )
    return <p>Loading...</p>;

  if (!activeTemplateData.data) return <p>No active templates</p>;

  console.log("picksData from dash", picksData);

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("curr search:", e.currentTarget.value);
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

  const newPick1 = {
    requestedTo: "tempt",
  };

  const newPick2 = {
    requestedTo: "newton",
  };

  const postPick = async (newPick: { requestedTo: string }) => {
    try {
      const { data } = await axios.post(
        "https://exove.vercel.app/api/picks",
        { ...newPick },
        {
          withCredentials: true,
        }
      );
      console.log("Response", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.dashboard_wrapper}>
      <div className={styles.dashboard_container}>
        <SearchBar
          inputValue={searchInput}
          onChangeHandler={searchChangeHandler}
        />
        <BulkButtons />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee name</th>
              <th>Collagues</th>
              <th>Subordinates</th>
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
                  user={currUser}
                  userPicks={picksData.data!.find(
                    (pick) => pick.requestedTo === currUser.ldapUid
                  )}
                  userFeedbacks={feedbackData.data!.filter(
                    (feedback) => feedback.feedbackTo === currUser.ldapUid
                  )}
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
