import axios from "axios";

// Components
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

// Redux, API
import {
  useCreatePickMutation,
  useGetAllRequestPicksQuery,
} from "../../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../../features/userApi";

// Styles
import styles from "./BulkButtons.module.css";
import { IRequestPicks } from "../../../types/picks";
import { IUserDataGet } from "../../../types/users";

interface IBulkButtonsProps {
  allPicks: IRequestPicks[];
  allUsers: IUserDataGet[];
}

const BulkButtons: React.FC<IBulkButtonsProps> = ({ allPicks, allUsers }) => {
  const [createPick] = useCreatePickMutation();
  const newPick1 = {
    requestedTo: "tempt",
  };

  const requestPicks = async (newPick: { requestedTo: string }) => {
    await createPick(newPick);
  };

  const requestAllPicks = async () => {
    const usersWithoutRequests = allUsers.filter(
      (user) =>
        allPicks.find((pick) => pick.requestedTo === user.ldapUid) === undefined
    );
    console.log("users with no request picks created", usersWithoutRequests);
    for (const user of usersWithoutRequests) {
      await requestPicks({ requestedTo: user.ldapUid });
    }
  };

  return (
    <div className={styles.buttons_container}>
      <Tooltip
        TransitionComponent={Fade}
        title="Request colleague picks from all users"
        placement="bottom-start"
      >
        <button onClick={requestAllPicks} className={styles.request}>
          <span className="material-symbols-outlined">group_add</span>
          <span className="material-symbols-outlined">send</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Remind all users to pick colleagues"
        placement="bottom-start"
      >
        <button className={styles.remind}>
          <span className="material-symbols-outlined">group_add</span>
          <span className="material-symbols-outlined">timer</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Request feedbacks from all users"
        placement="bottom-start"
      >
        <button className={styles.request}>
          <span className="material-symbols-outlined">rate_review</span>
          <span className="material-symbols-outlined">send</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Remind all users to give feedbacks"
        placement="bottom-start"
      >
        <button className={styles.remind}>
          <span className="material-symbols-outlined">rate_review</span>
          <span className="material-symbols-outlined">timer</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Generate all complete reports and make them available to competence managers"
        placement="bottom-start"
      >
        <button className={styles.approve}>
          <span className="material-symbols-outlined">description</span>
        </button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        title="Generate all reports (including incomplete) and make them available to competence managers"
        placement="bottom-start"
      >
        <button className={styles.warning}>
          <span className="material-symbols-outlined">description</span>
        </button>
      </Tooltip>
    </div>
  );
};

export default BulkButtons;
