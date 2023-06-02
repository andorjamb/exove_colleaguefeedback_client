//React
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

//styles
import styles from "./Report.module.css";

//Types
import { IReportData, IReportCategory, IChartData } from "../../types/report";
import { IFeedback, IFCategory } from "../../types/feedback";
import { ITemplate } from "../../types/template";
import { loggedInUser } from "../../types/users";
import { IQuestionLang } from "../../types/questions";
//import { IUserDataGet } from "../../types/users";

//Redux
import { useSelector } from "react-redux";
import { useGetFeedbacksByNameQuery } from "../../features/feedbackApi";
import { useGetUserByLdapUidQuery } from "../../features/userApi";
import { useGetActiveTemplateQuery } from "../../features/templateApi";
import { useGetReportSummaryByNameQuery } from "../../features/reportApi";
import { useGetAllReportsQuery } from "../../features/reportApi";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

//Components
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import ChartBar from "../../charts/ChartBar";
import ChartRadar from "../../charts/ChartRadar";
import { testFeedbackData } from "../../testdata/testFeedbackData";

//Functions
import { mapByRole } from "../../functions/reportFunctions";
import { printMultiPdf } from "../../functions/printPdf";
import { testing } from "../../testdata/testFeedbackData"; //chart testing only
import { getSecureUserUid } from "../../functions/secureUser";


//(manager and HR only view)
//TODO: check user: if not correct role level or permissions not allocated, navigate to login

type MappedCategories = MappedCategory[];

interface MappedCategory {
  categoryName: string;
  categoryId: string;
  chartData: IChartData[];
  comments: Comments[];
}

interface Comments {
  self: string;
  CM: string;
  colleagues: string[];
}

const Report = () => {
  const { t } = useTranslation(["report"]);
  const { revieweeId } = useParams();
  //const reportRoot = useRef<HTMLDivElement>(null);
  const elementArray = useRef<HTMLDivElement[]>([]);
  const date = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const [CompMan, setCompMan] = useState<string | undefined>("");
  const [mappedCategories, setMappedCategories] = useState<MappedCategories>();
  const [mappedFeedbacks, setMappedFeedbacks] = useState<Map<(string | number | undefined)[],IFCategory[] >>();  //
  const [template, setTemplate] = useState<ITemplate>();
  const [userInfo, setUserInfo] = useState<loggedInUser>();
/*  MappedFeedbacks:
  values: IFCategory[],
  key: (string | number | undefined)[],
  map: Map<(string | number | undefined)[], IFCategory[]> */

  
  const activeTemplate = useGetActiveTemplateQuery().data;
  const revieweeData = useGetUserByLdapUidQuery(revieweeId as string).data;
  const CompManData = useGetUserByLdapUidQuery(CompMan as string).data;
  const reportSummary = useGetReportSummaryByNameQuery(
    revieweeId as string
    ).data;
  const reportsData = useGetAllReportsQuery().data;
  const categories = template?.categories;

  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(
    revieweeId as string
  );

  let feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    revieweeId as string
  ).data;

  if (!feedbacks || (feedbacks && feedbacks?.length) === 0) {
    feedbacks = testFeedbackData;
  } /////** Data manipulation functions  *///////

  /** create a map from all feedbacks for this reviewee  */
  function prepareFeedbacks(feedbacks: IFeedback[]) {
    let mappedFeedbacks = new Map();
    feedbacks.forEach((feedback) => {
      let key = [feedback.roleLevel, feedback.userId];
      mappedFeedbacks.set(key, feedback.categories);
    });
    //console.log("mappedFeedbacks", mappedFeedbacks); //debugging
    return mappedFeedbacks;
  }

 
  //// functions called on data loaded ////

  /** get data for current template  (may be different to 'active template') */
  //may need to use report object as picks object harder to access without params

  /** create a map from all feedbacks for this reviewee  */
  useEffect(() => {
    //console.log("feedbacks:", userInfo?.uid, feedbacks);
    //console.log('flatmapped feedbacks:', feedbacks?.flatMap((item)=>{}))
    if (mappedCategories !== undefined && feedbacks !== undefined) {
      setMappedFeedbacks(prepareFeedbacks(feedbacks));
      //forEach((feedback)=>mapByRole(mappedCategories, feedback.categories, ));
    }
    //eslint-disable-next-line
  }, [feedbacks, mappedCategories]);

useEffect(()=>{
  console.log('check mappedFeedback state from useEffect:', mappedFeedbacks)
},[mappedFeedbacks])

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDetails: loggedInUser = await getSecureUserUid();
        if (userDetails) {
          console.log("user details", userDetails);
          setUserInfo(userDetails);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [navigate]);

  useEffect(() => {
    console.log("checking authorisation....");
    if (userInfo) {
      if (userInfo.roleLevel > 2 && userInfo.uid !== CompMan) {
        console.log("Not authorised to view this page");
        navigate("/login");
      }
    }
    //eslint-disable-next-line
  }, [CompMan]);

  useEffect(() => {
    setTemplate(activeTemplate);
  }, [activeTemplate]);

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
    console.log("MAPPEDCATEGORIES", mappedCategories); //debugging
    setMappedCategories(mappedCategories);
  }, [categories]);

  /** set name of competence manager */
  useEffect(() => {
    if (revieweeData) {
      if (
        revieweeData.workId[0].reportsTo &&
        revieweeData.workId[0].reportsTo !== undefined
      ) {
        let compman = revieweeData.workId[0].reportsTo;
        setCompMan(compman);
      } else {
        setCompMan("No CM found");
      }
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
      <div className={styles.report} /* ref={reportRoot} */>
        <div className={styles.reportHeader}></div>
        <section>
          <h1>{date} Colleague Feedback Report</h1>

          <div className={styles.feedbackInfo}>
            <h2>Template: {template?.templateTitle}</h2>
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
        <button
          className={styles.buttonOrange}
          onClick={() => printMultiPdf(elementArray.current, revieweeId)}
        >
          {t("generatePdf")}
        </button>
      </div>
    </div>
  );
};

export default Report;
