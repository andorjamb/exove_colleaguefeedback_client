//React
import React from "react";
import { useParams } from "react-router-dom";

//styles
import styles from "./Report.module.css";

//Redux
import { useSelector } from "react-redux";
import { useGetRequestPickByUserIdQuery } from "../../features/requestPicksApi";
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
import ChartBar from "../../charts/Chart_Bar";
import ChartRadar from "../../charts/Chart_Radar";
import { ReportClass } from "../../functions/reportFunctions";

//(manager and HR only view)
//check user: if not correct role level, navigate to login

/**
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
  const { userId } = useParams(); //assume user LdapUid
  const ActiveTemplateId = useSelector(
    (state: any) => state.template.activeTemplateId
  );
  /*   const getUsers = useGetAllUsersQuery();
      const users = getUsers.data; */
  const barChartData = [
    { question: "Queston1", colleagues: 4, CM: 3, self: 5 },
    { question: "Question2", colleagues: 5, CM: 4, self: 4 },
    { question: "Question3", colleagues: 1, CM: 4, self: 4 },
    { question: "Question4", colleagues: 3, CM: 3, self: 5 },
    { question: "Question5", colleagues: 3, CM: 2, self: 3 },
  ];

  const radarChartData = [
    { question: "Q1", colleagueAverage: 4, CM: 3, self: 5 },
    { question: "Q2", colleagueAverage: 5, CM: 4, self: 4 },
    { question: "Q3", colleagueAverage: 1, CM: 4, self: 4 },
    { question: "Q4", colleagueAverage: 3, CM: 3, self: 5 },
    { question: "Q5", colleagueAverage: 3, CM: 2, self: 3 },
  ];

  const getActiveTemplate = useGetActiveTemplateQuery();
  const templateTitle = getActiveTemplate.data?.templateTitle;
  const getUserFeedbacks = useGetFeedbacksByNameQuery(userId as any);
  const getPick = useGetRequestPickByUserIdQuery(userId as any);
  const getUserData = useGetUserByLdapUidQuery(userId as any);
  const userFeedbacks = getUserFeedbacks.data;
  const userData = getUserData.data;
  const pickId = getPick?.data?._id;
  const activeTemplate = getActiveTemplate.data;

  console.log("userID :", userId);
  console.log(pickId);
  console.log(userFeedbacks);

  const date = new Date().getFullYear();
  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(userId as any);
  const CM = userData?.workId[0].reportsTo;

  /**
   * feedbacks.forEach((feedback)=>{})
   * OR use templateSelection
   */
  //should there be an array of feedbackIds in reportClass?

  let report = new ReportClass(pickId, userId, CM, [], []);

  function makeChartData() {}

  if (isLoading || isFetching) {
    return <CustomSpinner />;
  }
  return (
    <div className={styles.container}>
      {/*  <div className={styles.sidebar}>
        <h3>Sections</h3>
        <ul></ul>
      </div> */}
      <div className={styles.report}>
        <div className={styles.reportHeader}></div>
        <section>
          <h2>{date} Colleague Feedback Report</h2>
         <div className={styles.feedbackInfo}><h4>{templateTitle}</h4>
          <p>For the attention of: {report.reportsTo}</p><p>{userData?.firstName + ' ' + userData?.surname}</p></div>
        </section>
        <section>
          <ChartBar barChartData={barChartData} />
          <ChartRadar radarChartData={radarChartData} />
        </section>
      </div>
    </div>
  );
};

export default Report;
