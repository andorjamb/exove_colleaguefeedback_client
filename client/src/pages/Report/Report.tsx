//React
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

//styles
import styles from "./Report.module.css";

//Types
import { IReportData, IReportCategory, rangeResult } from "../../types/report";
import { IFeedback, IFCategory } from "../../types/feedback";
import { IUserDataGet } from "../../types/users";

//Redux
import { useSelector } from "react-redux";
import { useGetRequestPickByDocIdQuery } from "../../features/requestPicksApi";
import { useGetFeedbacksByNameQuery } from "../../features/feedbackApi";
import {
  useGetUserByLdapUidQuery,
  useGetAllUsersQuery,
} from "../../features/userApi";
import { useGetActiveTemplateQuery } from "../../features/templateApi";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Components
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import ChartBar from "../../charts/ChartBar";
import ChartRadar from "../../charts/ChartRadar";
import { ReportClass, ChartDataClass } from "../../functions/reportFunctions";
//import { testChartData } from "../../testdata/testChartData";
import { IQuestionLang } from "../../types/questions";

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
  const { userId } = useParams();
  //const { pickId } = useParams();
  const { t } = useTranslation(["report"]);
  const reportRoot = useRef<HTMLDivElement>(null);
  const doc = new jsPDF("landscape", "pt", "a4");
  // const [userId, setUserId] = useState<string | undefined>("");

  /** jsPDF requires inline styles, doesn't support external css? (seems to be working though)
  //pick-id eg)  52e103e0-1c23-4220-9a47-bed14056cfe3
  // 8f7ed873-29f1-42d3-8337-1a5ad2af56af
  //pick.requestedTo ->ldapUid
*/
  const allUsers = useGetAllUsersQuery().data;
  //const getPick = useGetRequestPickByDocIdQuery(pickId as any).data;
  const activeTemplate = useGetActiveTemplateQuery().data;
  const templateTitle = activeTemplate?.templateTitle;
  const categories = activeTemplate?.categories;
  const userData = useGetUserByLdapUidQuery(userId as any).data;
  const date = new Date().getFullYear();
  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(userId as any);
  const feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    userId as any
  ).data;
  let mappedCategories: any;

  //can you get feedbacks by pickId?

  let rangeResult = [];
  let stringResult = [];
  let CM: string = "";
  /*   if (userData?.workId) {
    console.log("workId object:", userData.workId);
  } */
  // console.log(allUsers);

  console.log("feedbacks", feedbacks);
  if (categories) {
    mappedCategories = categories?.map((category) => {
      return {
        categoryName: category.category.categoryName,
        categoryId: category.category._id,
        rangeDataGroups: [],
        stringDataGroups: [],
      };
    });
  }

  /*  */
  /*   useEffect(() => {
    setUserId(getPick?.requestedTo);
  }, [getPick]); */

  /*   useEffect(() => {
    makeReportCategoriesData(feedbacks);
  }, [feedbacks]); */

  function getName(para: string) {
    for (const cat of mappedCategories) {
      if (cat.categoryId === para) {
        return cat.categoryName;
      }
    }
  }
  /*
questions: object array
{
answer: "false",
answeredOn: "2023-05-12T07:38:42.115Z",
question: "The person produces high quality product",
type: "boolean",
_id: "6454aa0d971f4982fdd21b29"
*/

  function transformQuestions(questions: IQuestionLang[]) {
    let questionMap = questions.map((question) => {
      return {
        ...question,
        question: question.question,
      };
    });
    return questionMap;
  }

  function makeReportCategoriesData(feedbacks: IFeedback[]) {
    let CMFeedback = feedbacks?.find((feedback) => feedback.userId === CM);
    console.log(CMFeedback);
    let selfFeedback = feedbacks.filter(
      (feedback) => feedback.userId === feedback.feedbackTo
    )[0];
    let reduction = feedbacks.reduce((accumulator: any, currentValue: any) => {
      return {
        ...accumulator,
        ...{ [currentValue.user._id]: currentValue.categories },
      };
    }, {});
    console.log("reduction", reduction);
  }

  let mappedSet = new Map(
    feedbacks?.map((feedback) => [feedback.userId, feedback.categories])
  );
  console.log("mappedSet", mappedSet);

  /*feedback.cagories:[]
  {
    category: 'b10e82d5-03be-45c3-85a5-363f2533a908', 
    questions: Array(0), 
    _id: '645e25c0235706de4691dcf1'
  },
  category: "b10e82d5-03be-45c3-85a5-363f2533a908"
  questions: []
  _id: "645e25c0235706de4691dcf1"
  */
  let chartDataArray = [];

  function transformMap(values: IFCategory, key: string | undefined) {
    switch (key) {
      case userId:
        console.log("self evaluation");
        transformQuestions(values.questions);
        break;
      case CM:
        console.log("CM evaluation");
        break;
      default:
        console.log("colleague evaluation");

        return {};
    }
  }

  mappedSet.forEach(transformMap);

  mappedSet.forEach((item) => {
    console.log(item.length);
    let m = item.map((category) => {
      return {
        categoryId: category.category,
        chartData: transformQuestions(category.questions),
      };
    });
    console.log(m);
    chartDataArray.push(m);
  });

  /**OBJECT ARRAY
   * mappedcategories = [
   * {categoryName: "",
   * chartData: [{
            question: "Q1",
            colleagueAverage: 4,
            colleagues: [3, 4, 5, 1],
            CM: 3,
            self: 5,
          },{},{},{}],
      comments: {self: "",
    CM: "",
  colleagues: ["",""]}
        },
        {},
        {}
   * ] 
   */

  function makePdf() {
    if (reportRoot.current) {
      doc.html(reportRoot.current, {
        html2canvas: { scale: 0.8 },
        async callback(doc) {
          await doc.save(`report_${userId}`);
        },
      });
    }
  }

  if (isLoading || isFetching) {
    return <CustomSpinner />;
  }
  return (
    <div className={styles.container}>
      {/*  <div className={styles.sidebar}>
        <h3>Sections</h3>
        <ul></ul>
      </div> */}
      <div className={styles.report} ref={reportRoot}>
        <div className={styles.reportHeader}></div>
        <section>
          <h2>{date} Colleague Feedback Report</h2>
          <div className={styles.feedbackInfo}>
            <h4>{templateTitle}</h4>
            <p>Reports to: {CM}</p>
            <p>Reviewee: {userData?.firstName + " " + userData?.surname}</p>
          </div>
        </section>
        {mappedCategories?.map((item: any) => (
          <section className={styles.section}>
            <h3>{item.categoryName}</h3>
            {/* <ChartBar barChartData={barChartData} />*/}
            <div className={styles.openComments}>
              <ChartRadar radarChartData={item.chartData} />
              <p>
                <span>Own comments: {item.comments?.self}</span>
              </p>
              <p>
                <span>Other comments:{item.comments?.CM}</span>
              </p>
            </div>
          </section>
        ))}

        <button className={styles.buttonOrange} onClick={makePdf}>
          {" "}
          {t("generatePdf")}
        </button>
      </div>
    </div>
  );
};

export default Report;
