//React
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

//styles
import styles from "./Report.module.css";

//Types
import { IReportData, IReportCategory, IChartData } from "../../types/report";
import { IFeedback, IFCategory } from "../../types/feedback";
import { ITemplate } from "../../types/template";
//import { IUserDataGet } from "../../types/users";

//Redux
import { useSelector } from "react-redux";
import { useGetRequestPickByDocIdQuery } from "../../features/requestPicksApi";
import { useGetFeedbacksByNameQuery } from "../../features/feedbackApi";
import { useGetUserByLdapUidQuery } from "../../features/userApi";
import {
  useGetActiveTemplateQuery,
  useGetAllTemplatesQuery,
} from "../../features/templateApi";
import { useGetReportSummaryByNameQuery } from "../../features/reportApi";

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
  scoreAverage,
} from "../../functions/reportFunctions";
import { testFeedbackData } from "../../testdata/testFeedbackData";
import { IQuestionLang } from "../../types/questions";

//(manager and HR only view)
//TODO: check user: if not correct role level or permissions not allocated, navigate to login

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
  const { t } = useTranslation(["report"]);
  const { revieweeId, pickId } = useParams();
  const reportRoot = useRef<HTMLDivElement>(null);
  const date = new Date().getFullYear();

  //einstein pickId 421bbda0-fb06-4342-a493-2791b87550e3

  const [CompMan, setCompMan] = useState<string | undefined>("");
  const [mappedCategories, setMappedCategories] = useState<any>([]);
  const [template, setTemplate] = useState<ITemplate>();

  const getPick = useGetRequestPickByDocIdQuery(pickId as string).data;
  const activeTemplate = useGetActiveTemplateQuery().data;
  const allTemplates = useGetAllTemplatesQuery().data;
  const templateTitle = template?.templateTitle;
  const categories = template?.categories;
  const revieweeData = useGetUserByLdapUidQuery(revieweeId as string).data;
  const CompManData = useGetUserByLdapUidQuery(CompMan as string).data;
  const reportSummary = useGetReportSummaryByNameQuery(
    revieweeId as string
  ).data;

  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(
    revieweeId as any
  );

  //let feedbacks = testFeedbackData;
  let feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    revieweeId as string
  ).data;

  if (!feedbacks || (feedbacks && feedbacks?.length) === 0) {
    feedbacks = testFeedbackData;
  }

  //console.log("feedbacks", feedbacks); //debugging
  //let mappedCategories: any;

  /** create a map from all feedbacks for this reviewee  */
  function prepareFeedbacks(feedbacks: IFeedback[]) {
    let mappedSet = new Map(
      feedbacks.map((feedback) => {
        let key = [feedback.roleLevel, feedback.userId];
        return [key, feedback.categories];
      })
    );
    console.log("mappedSet", mappedSet); //debugging
    return mappedSet;
  }

  /** iterated for each key/value pair of map */

  function testMap(
    values: IFCategory[],
    key: (string | number | undefined)[],
    map: Map<(string | number | undefined)[], IFCategory[]>
  ) {
    console.log("mappedCategories in testMap:", mappedCategories);
    for (let [value] of map) {
      console.log(
        "value being looped over",
        "key",
        key,
        "value",
        value,
        "map",
        map
      );
      /*    let catIndex = mappedCategories?.findIndex(
        (category) => category.categoryId === value.category
      );
      if (catIndex) {
        console.log(catIndex);
        console.log(mappedCategories[catIndex]); //debugging
      }
      } */
    }
  }

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

          if (value.questions && value.questions.length) {
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

              if (key[0] && +key[0] < 5) {
                console.log("CM evaluation: by ", key[1], values); //array of feedback objects
                setCompMan((CM) => key[1] as string | undefined);
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

  async function makePdf() {
    if (reportRoot.current) {
      const doc = new jsPDF("portrait", "px", "a4");

      console.log(reportRoot.current);
      html2canvas(reportRoot.current).then((canvas) => {
        let pageImage = canvas.toDataURL("image/png");
        let imageDimensions = doc.getImageProperties(pageImage);
        const docWidth = doc.internal.pageSize.getWidth();
        let docHeight =
          (imageDimensions.height * docWidth) / imageDimensions.width;

        doc.addImage(pageImage, "PNG", 0, 0, docWidth, docHeight);
        doc.save(`report_${revieweeId}_${date}`);
      });
    }
  }

  /*   async function mapSet() {
    let mappedSet = await prepareFeedbacks(feedbacks);
    mappedSet.forEach(mapByRole); //Map.prototype.forEach()
  } */

  //// functions called on data loaded ////

  useEffect(() => {
    console.log("report summary", reportSummary);
  }, [reportSummary]);

  /** get data for current template  (may be different to 'active template') */
  useEffect(() => {
    if (allTemplates !== undefined && getPick !== undefined) {
      console.log("template id in getpick", getPick.template);
      console.log("all templates", allTemplates); //debugging
      let currentTemplate: ITemplate = allTemplates.filter(
        (template) => template._id === getPick.template
      )[0];
      console.log("current template:", currentTemplate); //debugging
      currentTemplate
        ? setTemplate(currentTemplate)
        : setTemplate(activeTemplate);
    }
  }, [getPick, allTemplates, activeTemplate]);

  useEffect(() => {
    console.log("feedbacks:", feedbacks);
    /** create a map from all feedbacks for this reviewee  */

    if (mappedCategories !== undefined && feedbacks !== undefined) {
      prepareFeedbacks(feedbacks).forEach(testMap);
    }
    /*  mapSet();*/
    //eslint-disable-next-line
  }, [feedbacks]);

  /** prepare objects for mapping chart data  */
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

  /** set name of competence manager */
  useEffect(() => {
    if (revieweeData !== undefined) {
      let compman = revieweeData.workId[0].reportsTo;
      setCompMan(compman);
    }
  }, [revieweeData]);

  if (isLoading || isFetching) {
    return (
      <div className="loading_container">
        <CustomSpinner />
        <p>Loading reports...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.report} ref={reportRoot}>
        <div className={styles.reportHeader}></div>
        <section>
          <h2>{date} Colleague Feedback Report</h2>

          <div className={styles.feedbackInfo}>
            <h4>Template: {template?.templateTitle}</h4>
            <p>
              Competence Manager:{" "}
              {CompManData?.firstName + " " + CompManData?.surname}
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
                <span className={styles.commentSpan}>
                  Own comments: {item.comments?.self}
                </span>
              </p>
              <p>
                <span className={styles.commentSpan}>
                  Other comments:{item.comments?.CM}
                </span>
              </p>
            </div>
          </section>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonOrange} onClick={makePdf}>
          {t("generatePdf")}
        </button>
      </div>
    </div>
  );
};

export default Report;
