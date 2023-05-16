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
import { useGetUserByLdapUidQuery } from "../../features/userApi";
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

/** jsPDF requires inline styles, doesn't support external css? (seems to be working though
 */

const Report = () => {
  //const { userId } = useParams();
  //const { pickId } = useParams();
  let pickId = "52e103e0-1c23-4220-9a47-bed14056cfe3"; //for testing
  const { t } = useTranslation(["report"]);
  const reportRoot = useRef<HTMLDivElement>(null);
  const doc = new jsPDF("landscape", "pt", "a4");

  const [revieweeId, setRevieweeId] = useState<string | undefined>("");
  const [CM, setCM] = useState<string | undefined>("");
  const [mappedCategories, setMappedCategories] = useState<any>([]);

  const getPick = useGetRequestPickByDocIdQuery(pickId as any).data;
  const activeTemplate = useGetActiveTemplateQuery().data;
  const templateTitle = activeTemplate?.templateTitle;
  const categories = activeTemplate?.categories;
  const revieweeData = useGetUserByLdapUidQuery(revieweeId as any).data;
  const CMData = useGetUserByLdapUidQuery(CM as any).data;
  const date = new Date().getFullYear();
  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(
    revieweeId as any
  );
  console.log("reviewee", revieweeId);

  let feedbacks = testFeedbackData;
  console.log("feedbacks", feedbacks); //debugging
  /*   let feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    revieweeId as any
  ).data; */

  /*   if (feedbacks && feedbacks?.length === 0) {
    feedbacks = testFeedbackData;
  } */

  //let mappedCategories: any;
  let chartDataArray = [];

  /** create a map from all feedbacks for this reviewee  */
  function prepareFeedbacks(feedbacks: IFeedback[]) {
    let mappedSet = new Map(
      feedbacks.map((feedback) => {
        let key = [feedback.roleLevel, feedback.userId];
        return [key, feedback.categories];
      })
    );
    console.log("mappedSet", mappedSet);
    return mappedSet;
  }

  /*   export interface IChartData {
    question: string;
    colleagueAverage: number;
    colleagues: number[];
    CM: number;
    self: number;
  } */

  /*   categoryName: string | undefined;
  chartData: IChartData[] | undefined;
  comments: { self: string; CM: string; colleagues: string[] }; */

  /** organise the map according to role of reviewer */
  /** iterated for each key/value pair of map */

  function mapByRole(
    values: IFCategory[],
    key: (string | number | undefined)[],
    map: Map<(string | number | undefined)[], IFCategory[]>
  ) {
    //for each category of one feedback:
    values.forEach((value) => {
      mappedCategories?.forEach((category: any) => {
        //select where categoryId values correspond:
        if (category.categoryId === value.category) {
          console.log("category chart data:", category.chartData); //debugging:  empty array?
          //for each question of the matching category:

          value.questions.forEach((question) => {
            //make a new chart data object:
            let bla: IChartData = {
              question: "",
              colleagueAverage: 0,
              colleagues: [],
              CM: 0,
              self: 0,
            };
            bla.question = question.question as string;

            if (key[1] && key[1] === revieweeId) {
              console.log("self evaluation:", values); //array of feedback objects
              if (question.type === "number" && question.answer) {
                bla.self = +question?.answer as number;
              }
              if (question.type === "string") {
                //add comment to category's comment object
                category.comments = {
                  ...category.comments,
                  self: question.answer,
                };
              }
            }

            if (key[0] && key[0] < 5) {
              console.log("CM evaluation: by ", key[1], values); //array of feedback objects
              setCM((CM) => key[1] as string | undefined);
              if (question.type === "number" && question.answer) {
                bla.CM = +question.answer as number;
              }
              if (question.type === "string") {
                //add comment to category's comment object
                category.comments = {
                  ...category.comments,
                  CM: question.answer,
                };
              }
            } else {
              console.log("colleague evaluation");
              if (question.type === "number" && question.answer) {
                bla.colleagues.push(+question.answer as number);
              }
              if (question.type === "string") {
                category.comments = {
                  /*   ...category.comments,
                  colleagues: [...[colleagues], question.answer], */
                };
              }
            }
          });
        }
      });
    });
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
          await doc.save(`report_${revieweeId}_${date}`);
        },
      });
    }
  }

  useEffect(() => {
    /** create a map from all feedbacks for this reviewee  */
    let mappedSet = prepareFeedbacks(feedbacks);
    mappedSet.forEach(mapByRole);
    //eslint-disable-next-line;
  }, [feedbacks]);

  useEffect(() => {
    let mappedCategories = categories?.map((category) => {
      return {
        categoryName: category.category.categoryName,
        categoryId: category.category._id,
        chartData: [],
        comments: [],
      };
    });
    console.log("mapped catogories", mappedCategories);
    setMappedCategories(mappedCategories);
  }, [categories]);

  useEffect(() => {
    setRevieweeId(getPick?.requestedTo);
  }, [getPick]);

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
            <p>
              Competence Manager: {CMData?.firstName + " " + CMData?.surname}
            </p>
            <p>
              Reviewee: {revieweeData?.firstName + " " + revieweeData?.surname}
            </p>
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
