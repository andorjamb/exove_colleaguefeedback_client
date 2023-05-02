// Styles
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { IRequestPicks } from "../../../types/picks";
import styles from "./PersonRow.module.css";
import { IFeedback } from "../../../types/feedback";

interface IPersonRowProps {
  userPicks: IRequestPicks | undefined;
  user: IUserData;
  userFeedbacks: IFeedback[];
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

const PersonRow: React.FC<IPersonRowProps> = ({
  user,
  userPicks,
  userFeedbacks,
}) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (
      !userPicks ||
      !userPicks.selectedList ||
      userPicks.selectedList.filter((pick) => pick.selectedRole === "cm")
        .length > 0
    )
      return;
    const newSelectedUser = {
      userId: user.work.reportsTo.id,
      selectionStatus: false, // for HR to approve
      selectedBy: "",
      selectedRole: "cm",
      feedBackSubmitted: false,
    };
    userPicks.selectedList.push(newSelectedUser);
    console.log(userPicks.selectedList);
  }, []);

  const requestPicks = () => {
    console.log("send picks pls");
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
            userPicks.selectedList.filter(
              (pick) => pick.selectedRole === "colleague"
            ).length}
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter(
              (pick) => pick.selectedRole === "subordinate"
            ).length}
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.selectedRole === "pm")
              .length}
        </td>
        <td>
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter((pick) => pick.selectedRole === "cm")
              .length}
        </td>
        <td>
          {/* There is no picks yet */}
          {!userPicks && (
            <button className={styles.request} onClick={requestPicks}>
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
            userPicks.selectedList.filter(
              (pick) => pick.selectedRole === "colleague"
            ).length < 5 && (
              <button onClick={remindToPick}>Remind user to pick</button>
            )}
          {/* If enough collagues picked, display approve option */}
          {userPicks &&
            userPicks.selectedList &&
            userPicks.selectedList.filter(
              (pick) => pick.selectedRole === "colleague"
            ).length >= 5 && (
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
          .filter((pick) => pick.selectedRole === "colleague")
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
          .filter((pick) => pick.selectedRole === "subordinate")
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
          .filter((pick) => pick.selectedRole === "pm")
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
          .filter((pick) => pick.selectedRole === "cm")
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
