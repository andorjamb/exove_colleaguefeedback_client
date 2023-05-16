//React
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

//styles
import styles from "./Report.module.css";

//Types
import { IReportData, IReportCategory, IChartData } from "../../types/report";
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
import { testFeedbackData } from "../../testdata/testFeedbackData";
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
  let pickId = "52e103e0-1c23-4220-9a47-bed14056cfe3"; //for testing
  const { t } = useTranslation(["report"]);
  const reportRoot = useRef<HTMLDivElement>(null);
  const doc = new jsPDF("landscape", "pt", "a4");
  const [revieweeId, setUserId] = useState<string | undefined>("");

  /** jsPDF requires inline styles, doesn't support external css? (seems to be working though)
  //pick-id eg)  52e103e0-1c23-4220-9a47-bed14056cfe3
  // 8f7ed873-29f1-42d3-8337-1a5ad2af56af
  //pick.requestedTo ->ldapUid
*/
  //const allUsers = useGetAllUsersQuery().data;
  const getPick = useGetRequestPickByDocIdQuery(pickId as any).data;
  const activeTemplate = useGetActiveTemplateQuery().data;
  const templateTitle = activeTemplate?.templateTitle;
  const categories = activeTemplate?.categories;
  const userData = useGetUserByLdapUidQuery(revieweeId as any).data;
  const date = new Date().getFullYear();
  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(
    revieweeId as any
  );
  let feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    revieweeId as any
  ).data;
  console.log("reviewee", revieweeId);

  if (feedbacks && feedbacks?.length === 0) {
    feedbacks = testFeedbackData;
  }
  console.log("feedbacks", feedbacks); //debugging

  let mappedCategories: any;
  let chartDataArray = [];
  let CM: string = "";

  if (categories) {
    mappedCategories = categories?.map((category) => {
      return {
        categoryName: category.category.categoryName,
        categoryId: category.category._id,
        chartData: [],
        comments: [],
      };
    });
    console.log("line 90", mappedCategories);
  }

  /** organise the map according to role of reviewer */
  /** iterated for each key/value pair of map */
  function mapByRole(values: IFCategory[], key: any) {
    if (key[1] === revieweeId) {
      console.log("self evaluation:", values); //array of feedback objects
      values.forEach((value) => {
        mappedCategories.forEach((category: any) => {
          if (category.category === value.category) {
            console.log("category chartdata:", category.chartData);
            console.log(value.questions);
            value.questions.forEach((question) => {
              //make new
            });
          }
        });

        transformQuestions(value.questions);
      });
    }
    if (key[0] < 5) {
      console.log("CM evaluation: by ", key[1], values); //array of feedback objects
      CM = key[1];
    }
  }

  function transformQuestions(questions: IQuestionLang[]) {
    let questionMap = questions.map((question) => {
      return {
        ...question,
        question: question.question,
      };
    });
    return questionMap;
  }

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

  useEffect(() => {
    /** create a map from all feedbacks for this reviewee  */
    let mappedSet = new Map(
      feedbacks?.map((feedback) => {
        let key = [feedback.roleLevel, feedback.userId];
        return [key, feedback.categories];
      })
    );
    console.log("mappedSet", mappedSet);
    mappedSet.forEach(mapByRole);

    //eslint-disable-next-line
  }, [feedbacks]);

  useEffect(() => {
    setUserId(getPick?.requestedTo);
  }, [getPick]);

  /*   useEffect(() => {
    makeReportCategoriesData(feedbacks);
  }, [feedbacks]); */

  if (isLoading || isFetching) {
    return <CustomSpinner />;
  }

  return (
    <div className={styles.container}>
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
