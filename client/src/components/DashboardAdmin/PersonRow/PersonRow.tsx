// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

// Redux
import {
  useApprovePickMutation,
  useCreatePickMutation,
  useDeletePickMutation,
  useGetAllRequestPicksQuery,
} from "../../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../../features/userApi";

// Types
import { IRequestPicks } from "../../../types/picks";
import { IFeedback } from "../../../types/feedback";
import { IUserDataGet } from "../../../types/users";

// Styles
import styles from "./PersonRow.module.css";
import UserPickBlock from "../../DashboardUser/UserPickBlock";

interface IPersonRowProps {
  userPicks: IRequestPicks | undefined;
  user: IUserDataGet;
  userFeedbacks: IFeedback[];
  /* showEditPicks: () => void; */
}

const PersonRow: React.FC<IPersonRowProps> = ({
  user,
  userPicks,
  userFeedbacks,
  /* showEditPicks, */
}) => {
  const [expand, setExpand] = useState(false);
  const [createPick] = useCreatePickMutation();
  const [approvePick] = useApprovePickMutation();
  const [deletePick] = useDeletePickMutation();
  const [showModal, setShowModal] = useState(false);
  const usersData = useGetAllUsersQuery();

  if (usersData.isFetching || !usersData.data) return <p>Loading...</p>;

  if (user.ldapUid === "curie") console.log("userPicks", userPicks);

  const requestPicks = async (newPick: { requestedTo: string }) => {
    await createPick(newPick);
  };

  const remindToPick = async () => {
    console.log("reminding");
  };

  const approvePicks = async () => {
    if (!userPicks) return;
    await approvePick(userPicks._id);
  };

  const toggleExpand = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  const showEditPicksHandler = () => {
    setShowModal(true);
  };

  const getUserArrayByRoleLevel = (level: number) => {
    if (!userPicks) return [];
    let res: IUserDataGet[] = [];
    const filteredPicks = userPicks.SelectedList.filter(
      (pick) => pick.roleLevel === level && pick.userId !== user.ldapUid
    );
    filteredPicks.forEach((pick) => {
      const userFound = usersData.data!.find(
        (user) => user.ldapUid === pick.userId
      );
      if (userFound) res.push(userFound);
    });
    return res;
  };

  const updatePicks = async (newSelection: IUserDataGet[]) => {
    const deletedPicks = userPicks?.SelectedList.filter((pick) =>
      newSelection.find((user) => user.ldapUid === pick.userId)
    );
    const addedPicks = newSelection.filter(
      (pick) =>
        userPicks?.SelectedList.find((user) => user.userId === pick.ldapUid) ===
        undefined
    );
    deletedPicks?.forEach((pick) => {
      console.log("pick to delete", pick);
    });
    // await????
    addedPicks.forEach((pick) => {
      console.log("pick to add", pick);
      createPick({ requestedTo: pick.ldapUid });
    });
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
            userPicks.SelectedList &&
            userPicks.SelectedList.filter(
              (pick) => pick.roleLevel === 5 && pick.userId !== user.ldapUid
            ).length}
        </td>
        <td>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter((pick) => pick.roleLevel === 6)
              .length}
        </td>
        <td>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter((pick) => pick.roleLevel === 4)
              .length}
        </td>
        <td>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter((pick) => pick.roleLevel === 3)
              .length}
        </td>
        <td>
          <div className={styles.picks_container}>
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
              <button onClick={showEditPicksHandler} className={styles.edit}>
                <span className="material-symbols-outlined">edit</span>
              </button>
            )}
            {/* If fewer than 5 collagues are picked, display remind button */}
            {userPicks &&
              userPicks.SelectedList &&
              userPicks.SelectedList.filter(
                (pick) => pick.roleLevel === 5 && pick.userId !== user.ldapUid
              ).length < 5 && (
                <button className={styles.remind} onClick={remindToPick}>
                  <span className="material-symbols-outlined">timer</span>
                </button>
              )}
            {/* If enough collagues picked, display approve option */}
            {userPicks && userPicks.SelectedList && !userPicks.submitted && (
              <button className={styles.approve} onClick={approvePicks}>
                <span className="material-symbols-outlined">done</span>
              </button>
            )}
            {userPicks && userPicks.submitted && <p>Picks finalised</p>}
          </div>
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
        userPicks.SelectedList &&
        userPicks.SelectedList.filter(
          (pick) => pick.roleLevel === 5 && pick.userId !== user.ldapUid
        ).map((pick) => (
          <tr className={styles.table_row_sub}>
            <td>{pick.userId}</td>
            <td>
              <div className={styles.dot_container}>
                <div className={styles.dot}></div>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      {expand &&
        userPicks &&
        userPicks.SelectedList &&
        userPicks.SelectedList.filter((pick) => pick.roleLevel === 6).map(
          (pick) => (
            <tr className={styles.table_row_sub}>
              <td>{pick.userId}</td>
              <td></td>
              <td>
                <div className={styles.dot_container}>
                  <div className={styles.dot}></div>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        )}

      {expand &&
        userPicks &&
        userPicks.SelectedList &&
        userPicks.SelectedList.filter((pick) => pick.roleLevel === 4).map(
          (pick) => (
            <tr className={styles.table_row_sub}>
              <td>{pick.userId}</td>
              <td></td>
              <td></td>
              <td>
                <div className={styles.dot_container}>
                  <div className={styles.dot}></div>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        )}

      {expand &&
        userPicks &&
        userPicks.SelectedList &&
        userPicks.SelectedList.filter((pick) => pick.roleLevel === 3).map(
          (pick) => (
            <tr className={styles.table_row_sub}>
              <td>{pick.userId}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <div className={styles.dot_container}>
                  <div className={styles.dot}></div>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        )}

      {showModal && (
        <div className={styles.modal_container}>
          {" "}
          <div className={styles.modal}>
            <button
              className={styles.close_modal_button}
              onClick={() => setShowModal(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h1>Edit picks for {user.displayName}</h1>
            <UserPickBlock
              editHandler={() => {}}
              doneHandler={updatePicks}
              heading="Colleagues"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(5)}
            />
            <UserPickBlock
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="Subordinates"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(6)}
            />
            <UserPickBlock
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="PM"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(4)}
            />
            <UserPickBlock
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="CM"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(3)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PersonRow;
