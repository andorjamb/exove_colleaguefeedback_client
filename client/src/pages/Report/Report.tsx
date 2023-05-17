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
import {
  ReportClass,
  ChartDataClass,
  chartsToPdf,
} from "../../functions/reportFunctions";
import { testFeedbackData } from "../../testdata/testFeedbackData";
import { IQuestionLang } from "../../types/questions";

//(manager and HR only view)
//check user: if not correct role level, navigate to login

/** jsPDF requires inline styles, doesn't support external css? (seems to be working though
 */
const testing = [
  {
    question: "Question 1",
    questionId: "",
    colleagueAverage: 4,
    colleagues: 4,
    CM: 4,
    self: 3,
  },
  {
    question: "Question 2",
    questionId: "",
    colleagueAverage: 4,
    colleagues: 5,
    CM: 4,
    self: 2,
  },
  {
    question: "Question 3",
    questionId: "",
    colleagueAverage: 4,
    colleagues: 5,
    CM: 4,
    self: 2,
  },
  {
    question: "Question 4",
    questionId: "",
    colleagueAverage: 3,
    colleagues: 3,
    CM: 4,
    self: 2,
  },
  {
    question: "Question 5",
    questionId: "",
    colleagueAverage: 2,
    colleagues: 1,
    CM: 2,
    self: 4,
  },
];

const Report = () => {
  //const { userId } = useParams();
  //const { pickId } = useParams();
  let pickId = "52e103e0-1c23-4220-9a47-bed14056cfe3"; //for testing
  const { t } = useTranslation(["report"]);
  const reportRoot = useRef<HTMLDivElement>(null);
  const doc = new jsPDF("portrait", "px", "a4");

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

  //let feedbacks = testFeedbackData;
  let feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    revieweeId as any
  ).data;

  if (feedbacks && feedbacks?.length === 0) {
    feedbacks = testFeedbackData;
  }

  console.log("feedbacks", feedbacks); //debugging
  //let mappedCategories: any;

  /** create a map from all feedbacks for this reviewee  */
  function prepareFeedbacks(feedbacks: IFeedback[] | undefined) {
    let mappedSet = new Map(
      feedbacks?.map((feedback) => {
        let key = [feedback.roleLevel, feedback.userId];
        return [key, feedback.categories];
      })
    );
    console.log("mappedSet", mappedSet);
    return mappedSet;
  }

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
          console.log("category chart data:", category.chartData); //debugging
          //for each question of the matching category:
          if (value.questions.length) {
            value.questions.forEach((question) => {
              //first check if question already exists in mappedCategories:

              let chartObj = category.chartData.forEach((datum: any) => {
                if (datum.questionId === question._id) {
                  chartObj = { ...datum };
                } else {
                  //otherwise make a new chart data object:
                  chartObj = {
                    question: question.question as string,
                    questionId: question._id,
                    colleagueAverage: 0,
                    colleagues: [] as number[],
                    CM: 0,
                    self: 0,
                  };
                }
                console.log("getting chartObj values_", chartObj);
                return chartObj;
              });

              chartObj.question = question.question as string;
              /** organise the data according to role of reviewer */
              if (key[1] && key[1] === revieweeId) {
                console.log("self evaluation:", values); //array of feedback objects
                if (question.type === "number" && question.answer) {
                  chartObj.self = +question?.answer as number;
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
                  chartObj.CM = +question.answer as number;
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
                  chartObj.colleagues.push(+question.answer as number);
                }
                if (question.type === "string") {
                  category.comments = {
                    /*   ...category.comments,
                  colleagues: [...[colleagues], question.answer], */
                  };
                }
              }
              console.log(chartObj);
            });
          }
        }
      });
    });
  }

  function makePdf() {
    let charts = document.getElementsByClassName("reportChart");
    if (reportRoot.current) {
      doc.html(reportRoot.current, {
        html2canvas: { scale: 0.5 },
        async callback(doc) {
          await chartsToPdf({ doc, charts }).then(() =>
            setTimeout(()=>doc.save(`report_${revieweeId}_${date}`), 25000)
          );
        },
      });
    }
  }

  useEffect(() => {
    /** create a map from all feedbacks for this reviewee  */
    let mappedSet = prepareFeedbacks(feedbacks);
    mappedSet.forEach(mapByRole);
    //eslint-disable-next-line
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
          <section className={styles.section} key={item.categoryId}>
            <div>
              <h3>{item.categoryName}</h3>
            </div>
            <div className={styles.charts}>
              <ChartBar barChartData={testing} />
              <ChartRadar radarChartData={testing} />
            </div>
            <div className={styles.openComments}>
              <p>
                <span>Own comments: {item.comments?.self}</span>
              </p>
              <p>
                <span>Other comments:{item.comments?.CM}</span>
              </p>
            </div>
          </section>
        ))}

      </div>
        <button className={styles.buttonOrange} onClick={makePdf}>
          {t("generatePdf")}
        </button>

    </div>
  );
};

export default Report;
