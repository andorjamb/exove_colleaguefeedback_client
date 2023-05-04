import styles from "./DashboardAdmin.module.css";

import { IRequestPicks } from "../../types/picks";
import PersonRow from "./PersonRow/PersonRow";
import Questions from "../Questions";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import { IFeedback } from "../../types/feedback";
import BulkButtons from "./BulkButtons/BulkButtons";
import { useGetAllFeedbacksQuery } from "../../features/feedbackApi";
import { ITemplateGet } from "../../types_updated/template";
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
}

/* 
const leraPicks: IRequestPicks = {
  _id: "pick1",
  requestedTo: "user1",
  requestedBy: "hr1",
  requestedOn: new Date(),
  selectedList: [
    {
      userId: "user4",
      selectionStatus: false, // for HR to approve
      selectedBy: "hr1",
      selectedRole: "pm",
      feedBackSubmitted: false,
    },
  ],
  submitted: false,
  submittedOn: new Date(),
};

const annaPicks: IRequestPicks = {
  _id: "pick2",
  requestedTo: "user2",
  requestedBy: "hr1",
  requestedOn: new Date(),
  selectedList: [
    {
      userId: "user2",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user3",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user4",
      selectionStatus: false, // for HR to approve
      selectedBy: "hr1",
      selectedRole: "pm",
      feedBackSubmitted: false,
    },
  ],
  submitted: false,
  submittedOn: new Date(),
};

const jessePicks: IRequestPicks = {
  _id: "pick3",
  requestedTo: "user3",
  requestedBy: "hr1",
  requestedOn: new Date(),
  selectedList: [
    {
      userId: "user2",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user3",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user4",
      selectionStatus: false, // for HR to approve
      selectedBy: "hr1",
      selectedRole: "pm",
      feedBackSubmitted: false,
    },
  ],
  submitted: false,
  submittedOn: new Date(),
};

const dibyaPicks: IRequestPicks = {
  _id: "pick4",
  requestedTo: "user4",
  requestedBy: "hr1",
  requestedOn: new Date(),
  selectedList: [
    {
      userId: "user2",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user3",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user2",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user3",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user2",
      selectionStatus: false, // for HR to approve
      selectedBy: "user1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "user4",
      selectionStatus: false, // for HR to approve
      selectedBy: "hr1",
      selectedRole: "pm",
      feedBackSubmitted: false,
    },
  ],
  submitted: false,
  submittedOn: new Date(),
};

const lera: IUserData = {
  id: "user1",
  firstName: "Valeria",
  surname: "Vagapova",
  email: "lera.vagapova@gmail.com",
  displayName: "Lera",
  personal: {
    honorific: "ms",
    shortBirthDate: "23.03",
    gender: "female",
  },
  about: {
    avatar: "url",
    hobbies: ["mushrooms", "plants", "running"],
  },
  work: {
    reportsTo: {
      id: "user2",
      firstName: "Anna",
      surname: "Petelin",
      email: "anna.petelin@exove.com",
    },
    title: "trainee",
    department: "ICT",
    site: "",
    startDate: "28.04.2023",
  },
  active: true,
};

const anna: IUserData = {
  id: "user2",
  firstName: "Anna",
  surname: "Petelin",
  email: "anna@gmail.com",
  displayName: "Anna",
  personal: {
    honorific: "ms",
    shortBirthDate: "24.03",
    gender: "female",
  },
  about: {
    avatar: "url",
    hobbies: ["mushrooms", "plants", "running"],
  },
  work: {
    reportsTo: {
      id: "user10",
      firstName: "James",
      surname: "Narraway",
      email: "james@exove.com",
    },
    title: "developer",
    department: "ICT",
    site: "",
    startDate: "28.04.2023",
  },
  active: true,
};

const jesse: IUserData = {
  id: "user3",
  firstName: "Jesse",
  surname: "Mwangi",
  email: "jesse@gmail.com",
  displayName: "Jesse",
  personal: {
    honorific: "m2",
    shortBirthDate: "25.03",
    gender: "male",
  },
  about: {
    avatar: "url",
    hobbies: ["coding", "plants", "running"],
  },
  work: {
    reportsTo: {
      id: "user2",
      firstName: "Anna",
      surname: "Petelin",
      email: "anna.petelin@exove.com",
    },
    title: "trainee",
    department: "ICT",
    site: "",
    startDate: "28.04.2023",
  },
  active: true,
};

const dibya: IUserData = {
  id: "user4",
  firstName: "Dibya",
  surname: "Dahal",
  email: "dibya@gmail.com",
  displayName: "Dibya",
  personal: {
    honorific: "m2",
    shortBirthDate: "25.03",
    gender: "male",
  },
  about: {
    avatar: "url",
    hobbies: ["coding", "plants", "running"],
  },
  work: {
    reportsTo: {
      id: "user2",
      firstName: "Anna",
      surname: "Petelin",
      email: "anna.petelin@exove.com",
    },
    title: "trainee",
    department: "ICT",
    site: "",
    startDate: "28.04.2023",
  },
  active: true,
};

const roles = {
  roleName: "lera",
  roleLevel: 5,
  roleStatus: true,
};
 */
const DashboardAdmin = () => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [picks, setPicks] = useState<IRequestPicks[]>([]);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const feedbackData = useGetAllFeedbacksQuery();
  console.log(feedbackData.data);

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("curr search:", e.currentTarget.value);
    setSearchInput(e.currentTarget.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.surname.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.displayName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://exove.vercel.app/api/users", {
        withCredentials: true,
      });
      setUsers(data);
      console.log("USERS", data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPicks = async () => {
    try {
      const { data } = await axios.get("https://exove.vercel.app/api/picks", {
        withCredentials: true,
      });
      setPicks(data);
      console.log("PICKS", data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(
        "https://exove.vercel.app/api/feedback",
        {
          withCredentials: true,
        }
      );
      setFeedbacks(data);
      console.log("FEEDBACKS", data);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    fetchUsers();
    fetchPicks();
    fetchFeedbacks();
    // postData();
  }, []);

  return (
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
          {filteredUsers.map((currUser) => {
            return (
              <PersonRow
                key={currUser._id}
                user={currUser}
                userPicks={picks.find(
                  (pick) => pick.requestedTo === currUser.ldapUid
                )}
                userFeedbacks={feedbacks.filter(
                  (feedback) => feedback.feedbackTo === currUser.ldapUid
                )}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
