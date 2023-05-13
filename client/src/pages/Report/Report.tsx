//React
import React from "react";
import { useParams } from "react-router-dom";

//styles
import styles from "./Report.module.css";

//Redux
import { useSelector } from "react-redux";
import {
  useGetFeedbackByDocIdQuery,
  useGetFeedbacksByNameQuery,
  useGetUserTotalFeedbacksQuery,
} from "../../features/feedbackApi";
import {
  useGetUserByLdapUidQuery,
  useGetAllUsersQuery,
} from "../../features/userApi";
import { useGetActiveTemplateQuery } from "../../features/templateApi";
//need all users?

//Components
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";

//(manager and HR only view)
//check user: if not correct role level, navigate to login

/**
 *
 * roleLevels:
 * 5 = colleague  //how to differentiate between colleague and subordinate?
 * 2 = HR?
 * 3,4 = manager ?
 */
/**
 *
 * Endpoints:
 *
 * feedback/  - get all
 * feedback/:id - get one by doc Id /? or requestPick id?)
 * feedback/name/name  -  get feedbacks by userId (ldapuid?)
 * POST feedback/:id -  post feedback by requestId
 * DELETE feedback/:id -
 * PATCH feedback/submit/:id - requestPicksId: submits a feedback (is this action completed by Essi after approval?)
 */

const Report = () => {
  const { userId } = useParams(); //id will be docId ?? or requestPicksId ? or user LdapUID ?
  console.log("userID :", userId);
  const getUsers = useGetAllUsersQuery();
  const users = getUsers.data;
  //const userId = "";
  //const { data } = useGetFeedbackByDocIdQuery(id as any);
  const ActiveTemplateId = useSelector(
    (state: any) => state.template.activeTemplateId
  );
  const getUserFeedbacks = useGetFeedbacksByNameQuery(userId as any);
  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(userId as any);

  const getActiveTemplate = useGetActiveTemplateQuery();
  const templateTitle = getActiveTemplate.data?.templateTitle;

  const userFeedbacks = getUserFeedbacks.data;
  console.log(userFeedbacks);
  const date = new Date().getFullYear();
  if (isLoading || isFetching) {
    return <CustomSpinner />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>Sections</h3>
        <ul></ul>
      </div>
      <div className={styles.report}>
        <div className={styles.reportHeader}></div>
        <section>
          <h2>Colleague Feedback Report</h2>
          <h3>{date}</h3>
          <h4>{templateTitle}</h4>
        </section>
      </div>
    </div>
  );
};

export default Report;
