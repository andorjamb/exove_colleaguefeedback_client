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
import { IRequestPicks, IRequestPicksPost } from "../../../types/picks";
import { IFeedback } from "../../../types/feedback";
import { IUserDataGet } from "../../../types/users";

// Styles
import styles from "./PersonRow.module.css";

interface IPersonRowProps {
  userPicks: IRequestPicks | undefined;
  user: IUserDataGet;
  userFeedbacks: IFeedback[];
  allUsersData: IUserDataGet[];
  currentTemplateId: string;
  /* showEditPicks: () => void; */
}

const PersonRow: React.FC<IPersonRowProps> = ({
  user,
  userPicks,
  userFeedbacks,
  allUsersData,
  currentTemplateId,
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

  const requestPicks = async () => {
    setIsLoading(true);
    const newPick = {
      requestedTo: user.ldapUid,
      template: currentTemplateId,
    };
    console.log("creating new pick", newPick);
    await createPick(newPick as IRequestPicksPost);
    setIsLoading(false);
  };
  const remindToPick = async () => {
    console.log("reminding");
  };

  const approvePicks = async () => {
    if (!userPicks) return;
    console.log("approving the following pick object", userPicks);
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

  const getDotColour = (userId: string, pickRoleLevel: number) => {
    let colour = "black";
    if (userPicks && userPicks.submitted) {
      const feedbackFound = userFeedbacks.find(
        (feedback) =>
          feedback.requestpicksId === userPicks._id &&
          feedback.roleLevel === pickRoleLevel
      );
      if (feedbackFound) colour = "green";
      else colour = "red";
    }
    return colour;
  };

  // Returns an array of picked users with given level
  const getUserArrayByRoleLevel = (level: number) => {
    if (!userPicks) return [];
    let res: IUserDataGet[] = [];
    const filteredPicks = userPicks.SelectedList.filter(
      (pick) =>
        pick.roleLevel === level &&
        pick.userId !== user.ldapUid &&
        pick.selectionStatus
    );
    if (user.ldapUid === "euler") console.log("filteredPicks", filteredPicks);
    filteredPicks.forEach((pick) => {
      console.log("pick.userId", pick.userId);

      let userFound = allUsersData.find((userData) => {
        console.log("userData", userData);
        return userData.ldapUid === pick.userId;
      });
      if (pick.userId === "galileo")
        userFound = allUsersData.find((userData) => {
          console.log("userData", userData);
          return userData.ldapUid === "galieleo";
        });
      if (pick.userId === "eintein")
        userFound = allUsersData.find((userData) => {
          console.log("userData", userData);
          return userData.ldapUid === "einstein";
        });
      console.log("user found", userFound);
      if (userFound) res.push(userFound);
    });
    console.log("res", level, res);
    return res;
  };

  // Deletes/deativates a pick
  const deactivatePick = async (userId: string, pickRoleLevel: number) => {
    if (!userPicks) return;
    const pickFound = userPicks.SelectedList.find(
      (pick) => pick.userId === userId && pick.roleLevel === pickRoleLevel
    );
    if (!pickFound || !pickFound.selectionStatus) return;
    const requestBody = {
      userId: userId,
      selectionStatus: false,
      roleLevel: pickRoleLevel,
    };
    // approvePick
    await approvePick({ body: requestBody, id: userPicks._id });
  };

  // Adds/activates a pick
  const activatePick = async (userId: string, pickRoleLevel: number) => {
    if (!userPicks) return;
    const pickFound = userPicks.SelectedList.find(
      (pick) => pick.userId === userId && pick.roleLevel === pickRoleLevel
    );
    if (pickFound) {
      if (pickFound.selectionStatus) return;
      else {
        const requestBody = {
          userId: userId,
          selectionStatus: true,
          roleLevel: pickRoleLevel,
        };
        setIsLoading(true);
        await approvePick({ body: requestBody, id: userPicks._id });
        setIsLoading(false);
      }
    } else {
      const requestBody = {
        userId: userId,
        roleLevel: pickRoleLevel,
        selectionStatus: true,
      };
      setIsLoading(true);
      await submitPick({ body: requestBody, id: userPicks._id });
      setIsLoading(false);
    }
  };

  // Updates picks according to new selection
  const updateColleaguePicks = async (newSelection: IUserDataGet[]) => {
    await updatePicksByRoleLevel(newSelection, 5);
  };

  const updateSubordinatePicks = async (newSelection: IUserDataGet[]) => {
    await updatePicksByRoleLevel(newSelection, 6);
  };

  const updatePMPicks = async (newSelection: IUserDataGet[]) => {
    await updatePicksByRoleLevel(newSelection, 4);
  };

  const updateCMPicks = async (newSelection: IUserDataGet[]) => {
    await updatePicksByRoleLevel(newSelection, 3);
  };

  const updatePicksByRoleLevel = async (
    newSelection: IUserDataGet[],
    pickRoleLevel: number
  ) => {
    console.log("new Selection", newSelection);
    if (!userPicks) return;
    // Filter picks to only have active pick of needed level
    const levelPicks = userPicks.SelectedList.filter(
      (pick) => pick.roleLevel === pickRoleLevel && pick.selectionStatus
    );
    const deletedPicks = levelPicks.filter(
      (pick) =>
        newSelection.find((user) => user.ldapUid === pick.userId) === undefined
    );
    const addedPicks = newSelection.filter(
      (pick) =>
        levelPicks.find((user) => user.userId === pick.ldapUid) === undefined
    );
    console.log("deletedPicks", deletedPicks);
    console.log("addedPicks", addedPicks);
    setIsLoading(true);
    for (const pick of deletedPicks) {
      await deactivatePick(pick.userId, pickRoleLevel);
    }
    for (const pick of addedPicks) {
      await activatePick(pick.ldapUid, pickRoleLevel);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <tr>
        <td>Row is updating.....</td>
      </tr>
    );

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
        <td onClick={toggleExpand}>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter(
              (pick) =>
                pick.roleLevel === 5 &&
                pick.userId !== user.ldapUid &&
                pick.selectionStatus
            ).length}
        </td>
        <td onClick={toggleExpand}>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter(
              (pick) => pick.roleLevel === 6 && pick.selectionStatus
            ).length}
        </td>
        <td onClick={toggleExpand}>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter(
              (pick) => pick.roleLevel === 4 && pick.selectionStatus
            ).length}
        </td>
        <td onClick={toggleExpand}>
          {userPicks &&
            userPicks.SelectedList &&
            userPicks.SelectedList.filter(
              (pick) => pick.roleLevel === 3 && pick.selectionStatus
            ).length}
        </td>
        <td onClick={toggleExpand}>
          {!userPicks?.submitted && (
            <div className={styles.buttons_container}>
              {/* There is no picks yet */}
              {!userPicks && (
                <Tooltip
                  TransitionComponent={Fade}
                  title={`Request colleague picks from ${user.displayName}`}
                  placement="bottom-start"
                >
                  <button className={styles.request} onClick={requestPicks}>
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
            {userPicks?.submitted && !userFeedbacks && (
              <Tooltip
                TransitionComponent={Fade}
                title={`Request feedbacks for ${user.displayName}`}
                placement="bottom-start"
              >
                <button className={styles.request}>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </Tooltip>
            )}
            {userPicks &&
              userPicks?.submitted &&
              userPicks?.SelectedList.filter((pick) => pick.selectionStatus)
                .length > userFeedbacks.length && (
                <Tooltip
                  TransitionComponent={Fade}
                  title={`Remind everyone to feedback ${user.displayName}`}
                  placement="bottom-start"
                >
                  <button className={styles.remind}>
                    <span className="material-symbols-outlined">timer</span>
                  </button>
                </Tooltip>
              )}
          </div>
        </td>
        <td>
          <div className={styles.buttons_container}>
            <Tooltip
              TransitionComponent={Fade}
              title={`Finalise ${user.displayName}'s feedback process`}
              placement="bottom-start"
            >
              <button className={styles.request}>
                <span className="material-symbols-outlined">description</span>
              </button>
            </Tooltip>
            <Tooltip
              TransitionComponent={Fade}
              title={`View ${user.displayName}'s report`}
              placement="bottom-start"
            >
              <button className={styles.edit}>
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </Tooltip>
            <Tooltip
              TransitionComponent={Fade}
              title={`Make ${user.displayName}'s report available to CM`}
              placement="bottom-start"
            >
              <button className={styles.approve}>
                <span className="material-symbols-outlined">
                  supervisor_account
                </span>
              </button>
            </Tooltip>
          </div>
        </td>
      </tr>
      {expand &&
        userPicks &&
        userPicks.SelectedList &&
        userPicks.SelectedList.filter(
          (pick) =>
            pick.roleLevel === 5 &&
            pick.userId !== user.ldapUid &&
            pick.selectionStatus
        ).map((pick) => (
          <tr key={pick._id} className={styles.table_row_sub}>
            <td>{pick.userId}</td>
            <td>
              <div className={styles.dot_container}>
                <div
                  className={`${styles.dot} ${
                    styles[getDotColour(pick.userId, 5)]
                  }`}
                ></div>
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
        userPicks.SelectedList.filter(
          (pick) => pick.roleLevel === 6 && pick.selectionStatus
        ).map((pick) => (
          <tr key={pick._id} className={styles.table_row_sub}>
            <td>{pick.userId}</td>
            <td></td>
            <td>
              <div className={styles.dot_container}>
                <div
                  className={`${styles.dot} ${
                    styles[getDotColour(pick.userId, 6)]
                  }`}
                ></div>
              </div>
            </td>
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
        userPicks.SelectedList.filter(
          (pick) => pick.roleLevel === 4 && pick.selectionStatus
        ).map((pick) => (
          <tr key={pick._id} className={styles.table_row_sub}>
            <td>{pick.userId}</td>
            <td></td>
            <td></td>
            <td>
              <div className={styles.dot_container}>
                <div
                  className={`${styles.dot} ${
                    styles[getDotColour(pick.userId, 4)]
                  }`}
                ></div>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}

      {expand &&
        userPicks &&
        userPicks.SelectedList &&
        userPicks.SelectedList.filter(
          (pick) => pick.roleLevel === 3 && pick.selectionStatus
        ).map((pick) => (
          <tr key={pick._id} className={styles.table_row_sub}>
            <td>{pick.userId}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div className={styles.dot_container}>
                <div
                  className={`${styles.dot} ${
                    styles[getDotColour(pick.userId, 3)]
                  }`}
                ></div>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}

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
              doneHandler={updateSubordinatePicks}
              heading="Subordinates"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(6)}
            />
            <UserPickBlock
              users={allUsersData.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={updatePMPicks}
              heading="PM"
              defaultEditing={false}
              defaultSelection={getUserArrayByRoleLevel(4)}
            />
            <UserPickBlock
              users={allUsersData.filter(
                (pick) => pick.ldapUid !== user.ldapUid
              )}
              editHandler={() => {}}
              doneHandler={updateCMPicks}
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
