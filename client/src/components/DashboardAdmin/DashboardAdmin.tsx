import styles from "./DashboardAdmin.module.css";

import { IRequestPicks } from "../../types/picks";
import PersonRow from "./PersonRow/PersonRow";

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
  /* this is a model of the JSON object used by Exove */
  id: string;
  firstName: string;
  surname: string;
  email: string;
  displayName: string;
  personal: {
    honorific: string;
    shortBirthDate: string;
    gender: string;
  };
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

const picks: IRequestPicks = {
  _id: "pick1",
  requestedTo: "person1",
  requestedBy: "hr1",
  requestedOn: new Date(),
  selectedList: [
    {
      userId: "person2",
      selectionStatus: false, // for HR to approve
      selectedBy: "person1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "person3",
      selectionStatus: false, // for HR to approve
      selectedBy: "person1",
      selectedRole: "colleague",
      feedBackSubmitted: false,
    },
    {
      userId: "person4",
      selectionStatus: false, // for HR to approve
      selectedBy: "hr1",
      selectedRole: "pm",
      feedBackSubmitted: false,
    },
  ],
  submitted: false,
  submittedOn: new Date(),
};

const DashboardAdmin = () => {
  return (
    <div className={styles.dashboard_container}>
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
          <PersonRow userPicks={picks} />
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
