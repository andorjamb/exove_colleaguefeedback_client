// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

// Redux
import {
  useCreatePickMutation,
  useGetAllRequestPicksQuery,
} from "../../../features/requestPicksApi";

// Types
import { IRequestPicks } from "../../../types/picks";
import { IFeedback } from "../../../types/feedback";
import { IUserDataGet } from "../../../types_updated/users";

// Styles
import styles from "./PersonRow.module.css";

interface IPersonRowProps {
  userPicks: IRequestPicks | undefined;
  user: IUserDataGet;
  userFeedbacks: IFeedback[];
}

const PersonRow: React.FC<IPersonRowProps> = ({
  user,
  userPicks,
  userFeedbacks,
}) => {
  const [expand, setExpand] = useState(false);
  const [createPick] = useCreatePickMutation();
  const { refetch } = useGetAllRequestPicksQuery();

  useEffect(() => {
    if (
      !userPicks ||
      !userPicks.selectedList ||
      userPicks.selectedList.filter((pick) => pick.roleLevel === 4).length > 0
    )
      return;
    const cm = user.workId.find((work) => work.workReportStatus)?.reportsTo;
    if (!cm) return;
    const newSelectedUser = {
      userId: cm,
      selectionStatus: false, // for HR to approve
      roleLevel: 4,
    };
    userPicks.selectedList.push(newSelectedUser);
    console.log(userPicks.selectedList);
  }, []);

  const requestPicks = async (newPick: { requestedTo: string }) => {
    await createPick(newPick);
    refetch();
  };

  const remindToPick = () => {
    console.log("reminding");
  };

  const approvePicks = () => {
    userPicks?.selectedList.forEach((pick) => (pick.selectionStatus = true));
    if (userPicks) userPicks.submitted = true;
  };

  const toggleExpand = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  return (
    <>
      <tr className={styles.table_row}>
        <td className={styles.first_cell} onClick={toggleExpand}>
          <div>
            {expand ? (
              <span className="material-symbols-outlined">expand_more</span>
            ) : (
              <span className="material-symbols-outlined">chevron_right</span>
            )}
            {user.firstName} {user.surname}
          </div>
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.roleLevel === 5)
              .length}
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.roleLevel === 6)
              .length}
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.roleLevel === 3)
              .length}
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.roleLevel === 4)
              .length}
        </td>
        <td>
          {/* There is no picks yet */}
          {!userPicks && (
            <button
              className={styles.request}
              onClick={() => requestPicks({ requestedTo: user.ldapUid })}
            >
              Request picks
            </button>
          )}
          {/* If picks have been requested but not approved yet, display edit button */}
          {userPicks && !userPicks.submitted && (
            <button className={styles.edit}>
              <span className="material-symbols-outlined">edit</span>
            </button>
          )}
          {/* If fewer than 5 collagues are picked, display remind button */}
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.roleLevel === 5)
              .length < 5 && (
              <button onClick={remindToPick}>Remind user to pick</button>
            )}
          {/* If enough collagues picked, display approve option */}
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.roleLevel === 5)
              .length >= 5 && (
              <button onClick={approvePicks}>Approve picks</button>
            )}
          {userPicks && userPicks.submitted && <p>Picks finalised</p>}
        </td>
        <td>
          {!userPicks?.submitted && (
            <p className={styles.not_available}>Approve picks first</p>
          )}
          {userPicks?.submitted && userFeedbacks.length === 0 && (
            <button className={styles.request}>Request reviews</button>
          )}
        </td>
        <td>reports</td>
      </tr>
      {expand &&
        userPicks &&
        userPicks.selectedList &&
        userPicks.selectedList
          .filter((pick) => pick.roleLevel === 5)
          .map((pick) => (
            <tr>
              <td></td>
              <td></td>
              <td>{pick.userId}</td>
            </tr>
          ))}
      {expand &&
        userPicks &&
        userPicks.selectedList &&
        userPicks.selectedList
          .filter((pick) => pick.roleLevel === 6)
          .map((pick) => (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>{pick.userId}</td>
            </tr>
          ))}

      {expand &&
        userPicks &&
        userPicks.selectedList &&
        userPicks.selectedList
          .filter((pick) => pick.roleLevel === 3)
          .map((pick) => (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{pick.userId}</td>
            </tr>
          ))}

      {expand &&
        userPicks &&
        userPicks.selectedList &&
        userPicks.selectedList
          .filter((pick) => pick.roleLevel === 4)
          .map((pick) => (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{pick.userId}</td>
            </tr>
          ))}
    </>
  );
};

export default PersonRow;
