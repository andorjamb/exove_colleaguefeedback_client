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
  allUsersData: IUserDataGet[];
  /* showEditPicks: () => void; */
}

const PersonRow: React.FC<IPersonRowProps> = ({
  user,
  userPicks,
  userFeedbacks,
  allUsersData,
  /* showEditPicks, */
}) => {
  const [expand, setExpand] = useState(false);
  const [createPick] = useCreatePickMutation();
  const [submitPick] = useSubmitPickMutation();
  const [approvePick] = useApprovePickMutation();
  const [finalPickSubmit] = useFinalPickSubmitMutation();
  const [deletePick] = useDeletePickMutation();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("user feedbacks for", user.displayName, userFeedbacks);

  const requestPicks = async (newPick: { requestedTo: string }) => {
    setIsLoading(true);
    await createPick(newPick);
    setIsLoading(false);
  };

  const remindToPick = async () => {
    console.log("reminding");
  };

  const approvePicks = async () => {
    if (!userPicks) return;
    setIsLoading(true);
    await finalPickSubmit(userPicks._id);
    setIsLoading(false);
  };

  const toggleExpand = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  const showEditPicksHandler = () => {
    setShowModal(true);
  };

  // Returns an array of picked users with given level
  const getUserArrayByRoleLevel = (level: number) => {
    if (!userPicks) return [];
    let res: IUserDataGet[] = [];
    const filteredPicks = userPicks.SelectedList.filter(
      (pick) => pick.roleLevel === level && pick.userId !== user.ldapUid
    );
    filteredPicks.forEach((pick) => {
      const userFound = allUsersData.find(
        (user) => user.ldapUid === pick.userId
      );
      if (userFound) res.push(userFound);
    });
    return res;
  };

  // Deletes/deativates a pick
  const deactivatePick = async (userId: string, pickRoleLevel: number) => {
    if (!userPicks) return;
    const pickFound = userPicks.SelectedList.find(
      (pick) => pick.userId === userId && pick.roleLevel === pickRoleLevel
    );
    if (!pickFound) return;
    const requestBody = {
      userId: userId,
      selectionStatus: false,
    };
    await approvePick({ body: requestBody, id: userPicks._id });
  };

  // Adds/activates a pick
  const activatePick = async (userId: string, pickRoleLevel: number) => {
    if (!userPicks) return;
    const pickFound = userPicks.SelectedList.find(
      (pick) => pick.userId === userId && pick.roleLevel === pickRoleLevel
    );
    if (pickFound) {
      if (pickFound.selectionStatus === true) return;
      else {
        const requestBody = {
          userId: userId,
          selectionStatus: true,
        };
        await approvePick({ body: requestBody, id: userPicks._id });
      }
    } else {
      const requestBody = {
        userId: userId,
        roleLevel: pickRoleLevel,
      };
      await submitPick({ body: requestBody, id: userPicks._id });
    }
  };

  const updateColleaguePicks = async (newSelection: IUserDataGet[]) => {
    if (!userPicks) return;
    const colleaguePicks = userPicks.SelectedList.filter(
      (pick) => pick.roleLevel === 5
    );
    console.log("colleaguePicks", colleaguePicks);
    const deletedPicks = colleaguePicks.filter((pick) =>
      newSelection.find((user) => user.ldapUid === pick.userId)
    );
    const addedPicks = newSelection.filter(
      (pick) =>
        colleaguePicks.find((user) => user.userId === pick.ldapUid) ===
        undefined
    );
    console.log("added picks", addedPicks);
    console.log("deleted picks", deletedPicks);
    deletedPicks.forEach((pick) => {
      deactivatePick(pick.userId, 5);
      console.log("pick to delete", pick);
    });
    // await????
    addedPicks.forEach((pick) => {
      console.log("pick to add", pick);
      activatePick(pick.ldapUid, 5);
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
          {!userPicks?.submitted && (
            <div className={styles.buttons_container}>
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
                  <button
                    onClick={showEditPicksHandler}
                    className={styles.edit}
                  >
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
          )}
        </td>
        <td>
          <div className={styles.buttons_container}>
            {!userPicks?.submitted && (
              <p className={styles.not_available}>unavailable</p>
            )}
            {
              /* userPicks?.submitted && userFeedbacks.length === 0  &&*/ <Tooltip
                TransitionComponent={Fade}
                title={`Request feedbacks for ${user.displayName}`}
                placement="bottom-start"
              >
                <button className={styles.request}>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </Tooltip>
            }
            {
              /* userPicks &&
              userPicks?.SelectedList.length > userFeedbacks.length && */ <Tooltip
                TransitionComponent={Fade}
                title={`Remind everyone to feedback ${user.displayName}`}
                placement="bottom-start"
              >
                <button className={styles.remind}>
                  <span className="material-symbols-outlined">timer</span>
                </button>
              </Tooltip>
            }
          </div>
        </td>
        <td>
          <div className={styles.buttons_container}>
            <Tooltip
              TransitionComponent={Fade}
              title={`Preview ${user.displayName}'s report`}
              placement="bottom-start"
            >
              <button className={styles.edit}>
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </Tooltip>
            <Tooltip
              TransitionComponent={Fade}
              title="Generate report and make it available to competence manager"
              placement="bottom-start"
            >
              <button className={styles.approve}>
                <span className="material-symbols-outlined">description</span>
              </button>
            </Tooltip>
          </div>
        </td>
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
          <div className={styles.modal}>
            <button
              className={styles.close_modal_button}
              onClick={() => setShowModal(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h1>Edit picks for {user.displayName}</h1>
            <UserPickBlock
              users={allUsersData.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={updateColleaguePicks}
              heading="Colleagues"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(5)}
            />
            <UserPickBlock
              users={allUsersData.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="Subordinates"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(6)}
            />
            <UserPickBlock
              users={allUsersData.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={() => {}}
              heading="PM"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(4)}
            />
            <UserPickBlock
              users={allUsersData.filter(
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
