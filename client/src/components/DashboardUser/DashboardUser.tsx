// API, redux
import { useGetAllFeedbacksQuery } from "../../features/feedbackApi";
import {
  useGetAllRequestPicksQuery,
  useGetRequestPickByUserIdQuery,
} from "../../features/requestPicksApi";
import { useGetAllUsersQuery } from "../../features/userApi";
import { useGetActiveTemplateQuery } from "../../features/templateApi";

import CustomSpinner from "../CustomSpinner/CustomSpinner";

//
import PicksUser from "./PicksUser";
import { loggedInUser } from "../../types/users";

const DashboardUser: React.FC<{ currentUserInfo: loggedInUser }> = ({
  currentUserInfo,
}) => {
  const feedbackData = useGetAllFeedbacksQuery();
  const picksData = useGetAllRequestPicksQuery();
  const activeTemplateData = useGetActiveTemplateQuery();

  if (
    activeTemplateData.isFetching ||
    feedbackData.isFetching ||
    picksData.isFetching ||
    !picksData.data
  )
    return (
      <>
        <CustomSpinner />
        <p>Loading dashboard...</p>
      </>
    );

  if (!activeTemplateData.data)
    return <p>No feedback action is going on right now.</p>;

  if (!picksData || !feedbackData.data)
    return <p>Nothing to yet, please wait for HR to notify you</p>;

  // Feedbacks from current user on current template
  const userFeedbacks = feedbackData.data.filter(
    (feedback) =>
      feedback.userId === currentUserInfo.uid &&
      feedback.template === activeTemplateData.data?._id
  );

  console.log("Feedbacks given by user:", userFeedbacks);

  return (
    <div>
      <h1>User dashboard</h1>
      <h2>Picks</h2>
      <PicksUser />
      <h2>Feedbacks to do</h2>
    </div>
  );
};

export default DashboardUser;
