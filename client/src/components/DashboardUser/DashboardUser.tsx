// API, redux
import { useGetAllFeedbacksQuery } from "../../features/feedbackApi";
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
  useGetRequestPicksByUserFeedbacksQuery,
} from "../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../features/userApi";
import { useGetActiveTemplateQuery } from "../../features/templateApi";

import CustomSpinner from "../CustomSpinner/CustomSpinner";
import styles from "./DashboardUser.module.css";
//
import PicksUser from "./PicksUser";
import { loggedInUser } from "../../types/users";
import { NavLink } from "react-router-dom";

const DashboardUser: React.FC<{ currentUserInfo: loggedInUser }> = ({
  currentUserInfo,
}) => {
  const feedbackData = useGetAllFeedbacksQuery();
  const picksData = useGetAllRequestPicksQuery();
  const activeTemplateData = useGetActiveTemplateQuery();
  const feedbacksNeededData = useGetRequestPicksByUserFeedbacksQuery(
    currentUserInfo.uid
  );
  const usersData = useGetAllUsersQuery();

  if (
    activeTemplateData.isFetching ||
    feedbackData.isFetching ||
    picksData.isFetching ||
    !picksData.data ||
    feedbacksNeededData.isFetching ||
    !feedbacksNeededData.data ||
    usersData.isFetching ||
    !usersData.data
  )
    return (
      <div className="loading_container">
        <CustomSpinner />
        <p>Loading your dashboard...</p>
      </div>
    );

  if (!activeTemplateData.data)
    return <h1>No feedback action going on right now. Yay!</h1>;

  if (!picksData || !feedbackData.data)
    return (
      <h1>
        Nothing to do here yet, you will be notified when any action is needed.
      </h1>
    );

  // Feedbacks from current user on current template
  const userFeedbacks = feedbackData.data.filter(
    (feedback) =>
      feedback.userId === currentUserInfo.uid &&
      feedback.template === activeTemplateData.data?._id
  );

  console.log("Feedbacks given by user:", userFeedbacks);
  console.log("feedbacksNeededData.data", feedbacksNeededData.data);

  const feedbacksNum = feedbacksNeededData.data.reduce(
    (sum, pick) => sum + pick.SelectedList.length,
    0
  );

  const getRoleTitle = (pickRoleLevel: number) => {
    let title = "";
    switch (pickRoleLevel) {
      case 6:
        title = "subordinate";
        break;
      case 5:
        title = "colleague";
        break;
      case 4:
        title = "project manager";
        break;
      case 3:
        title = "competence manager";
        break;
      default:
        title = "colleague";
    }
    return title;
  };

  return (
    <div className={styles.user_dashboard}>
      <h1>Hi, {currentUserInfo.displayName}!</h1>
      <div className={styles.user_dashboard_block}>
        <PicksUser />
      </div>
      <div className={styles.user_dashboard_block}>
        <h2>
          Please give {feedbacksNum}{" "}
          <span className={styles.keyword}>feedbacks</span> to{" "}
          {feedbacksNeededData.data.length} people:
        </h2>
        <p></p>
        <ul className={styles.feedbacks_needed_list}>
          {feedbacksNeededData.data
            .filter(
              (firstPick) => firstPick.requestedTo === currentUserInfo.uid
            )
            .map((pick) => (
              <NavLink
                to={`/feedback?id=${pick._id}&to=${currentUserInfo.uid}&role=5`}
              >
                <li>Evaluate your own performance</li>
              </NavLink>
            ))}
          {feedbacksNeededData.data
            .filter(
              (firstPick) => firstPick.requestedTo !== currentUserInfo.uid
            )
            .map((pick) =>
              pick.SelectedList.map((feedbackNeeded) => (
                <li>
                  <NavLink
                    to={`/feedback?id=${pick._id}&to=${pick.requestedTo}&role=${feedbackNeeded.roleLevel}`}
                  >
                    Give feedback to {pick.requestedTo} as a{" "}
                    <span className={styles.keyword}>
                      {getRoleTitle(feedbackNeeded.roleLevel)}
                    </span>
                  </NavLink>
                </li>
              ))
            )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardUser;
