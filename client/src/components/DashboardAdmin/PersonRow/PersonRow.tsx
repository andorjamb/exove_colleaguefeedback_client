// React
import { useEffect, useState } from "react";

// Axios
import axios from "axios";

// Redux
import {
  useApprovePickMutation,
  useCreatePickMutation,
  useDeletePickMutation,
  useFinalPickSubmitMutation,
  useGetAllRequestPicksQuery,
  useSubmitPickMutation,
} from "../../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../../features/userApi";

// Components
import UserPickBlock from "../../DashboardUser/UserPickBlock";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

// Types
import { IRequestPicks } from "../../../types/picks";
import { IFeedback } from "../../../types/feedback";
import { IUserDataGet } from "../../../types/users";

// Styles
import styles from "./PersonRow.module.css";

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
  const [submitPick] = useSubmitPickMutation();
  const [approvePick] = useApprovePickMutation();
  const [finalPickSubmit] = useFinalPickSubmitMutation();
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
    await finalPickSubmit({ id: userPicks._id });
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

  const updateColleaguePicks = async (newSelection: IUserDataGet[]) => {
    const colleaguePicks = userPicks?.SelectedList.filter(
      (pick) => pick.roleLevel === 5
    );
    if (!userPicks) return;
    const deletedPicks = colleaguePicks?.filter((pick) =>
      newSelection.find((user) => user.ldapUid === pick.userId)
    );
    const addedPicks = newSelection.filter(
      (pick) =>
        colleaguePicks?.find((user) => user.userId === pick.ldapUid) ===
        undefined
    );
    console.log("added picks", addedPicks);
    console.log("deleted picks", deletedPicks);
    deletedPicks?.forEach((pick) => {
      console.log("pick to delete", pick);
    });
    // await????
    addedPicks.forEach((pick) => {
      console.log("pick to add", pick);
      submitPick({
        body: { userId: pick.ldapUid, roleLevel: 5 },
        id: userPicks?._id,
      });
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
              <Tooltip
                TransitionComponent={Fade}
                title={`Request colleague picks from ${user.displayName}`}
                placement="bottom-start"
              >
                <button
                  className={styles.request}
                  onClick={() => requestPicks({ requestedTo: user.ldapUid })}
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </Tooltip>
            )}
            {/* If picks have been requested but not approved yet, display edit button */}
            {userPicks && !userPicks.submitted && (
              <Tooltip
                TransitionComponent={Fade}
                title={`Edit picks for ${user.displayName}`}
                placement="bottom-start"
              >
                <button onClick={showEditPicksHandler} className={styles.edit}>
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </Tooltip>
            )}
            {/* If fewer than 5 collagues are picked, display remind button */}
            {userPicks &&
              userPicks.SelectedList &&
              userPicks.SelectedList.filter(
                (pick) => pick.roleLevel === 5 && pick.userId !== user.ldapUid
              ).length < 5 && (
                <Tooltip
                  TransitionComponent={Fade}
                  title={`Remind ${user.displayName} to pick colleagues`}
                  placement="bottom-start"
                >
                  <button className={styles.remind} onClick={remindToPick}>
                    <span className="material-symbols-outlined">timer</span>
                  </button>
                </Tooltip>
              )}
            {/* If enough collagues picked, display approve option */}
            {userPicks && userPicks.SelectedList && !userPicks.submitted && (
              <Tooltip
                TransitionComponent={Fade}
                title={`Approve ${user.displayName}'s picks`}
                placement="bottom-start"
              >
                <button className={styles.approve} onClick={approvePicks}>
                  <span className="material-symbols-outlined">done</span>
                </button>
              </Tooltip>
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
              users={usersData.data.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={updateColleaguePicks}
              heading="Colleagues"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(5)}
            />
            <UserPickBlock
              users={usersData.data.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="Subordinates"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(6)}
            />
            <UserPickBlock
              users={usersData.data.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="PM"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(4)}
            />
            <UserPickBlock
              users={usersData.data.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
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
