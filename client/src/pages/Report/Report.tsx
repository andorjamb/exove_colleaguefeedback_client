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

  /** organise the map according to role of reviewer */
  /** iterated for each key/value pair of map */
  function mapByRole(values: IFCategory[], key: any) {
    if (key[1] === revieweeId) {
      console.log("self evaluation:", values); //array of feedback objects
      values.forEach((value) => {
        mappedCategories?.forEach((category: any) => {
          if (category.category === value.category) {
            console.log("category chart data:", category.chartData);
            console.log(value.questions);
            value.questions.forEach((question) => {
              //make new
              console.log(question.question, question.answer);
            });
          }
        });

        //transformQuestions(value.questions);
      });
    }
    if (key[0] < 5) {
      console.log("CM evaluation: by ", key[1], values); //array of feedback objects

      setCM((CM) => key[1]);
    } else {
      console.log("colleague evaluation");
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
