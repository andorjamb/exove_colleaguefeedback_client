//React
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

//styles
import styles from "./Report.module.css";

//Types
import { IChartData } from "../../types/report";
import { IFeedback, IFCategory } from "../../types/feedback";
import { ITemplate } from "../../types/template";
import { loggedInUser } from "../../types/users";

//Redux
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

//Functions
//import { mapByRole } from "../../functions/reportFunctions";
import { printMultiPdf } from "../../functions/printPdf";
import { testing } from "../../testdata/testFeedbackData"; //chart testing only
import { getSecureUserUid } from "../../functions/secureUser";
import { testFeedbackData } from "../../testdata/testFeedbackData";
import { ChartDataClass } from "../../functions/reportFunctions";

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
  const elementArray = useRef<HTMLDivElement[]>([]); //try to use this on mapped elements instead of converting entire page to one canvas
  const date = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation(); //convert path to queryParams later

  const [CompMan, setCompMan] = useState<string | undefined>("");
  const [mappedCategories, setMappedCategories] = useState<MappedCategories>();
  const [mappedFeedbacks, setMappedFeedbacks] =
    useState<Map<(string | number | undefined)[], IFCategory[]>>(); //
  const [template, setTemplate] = useState<ITemplate>();
  const [userInfo, setUserInfo] = useState<loggedInUser>();
  const [selfEval, setSelfEval] = useState<IFeedback>();
  const [cmEval, setCmEval] = useState<IFeedback>();
  const [colleagueEvals, setColleagueEvals] = useState<IFeedback[]>();

  const activeTemplate = useGetActiveTemplateQuery().data;
  const revieweeData = useGetUserByLdapUidQuery(revieweeId as string).data;
  const CompManData = useGetUserByLdapUidQuery(CompMan as string).data;
  const categories = template?.categories;


  const { isLoading, isFetching } = useGetFeedbacksByNameQuery(
    revieweeId as string
  );

  let feedbacks: IFeedback[] | undefined = useGetFeedbacksByNameQuery(
    revieweeId as string
  ).data;

  /** create a map from all feedbacks for this reviewee - invoked from useEffect()  */
  function prepareFeedbacks(feedbacks: IFeedback[]) {
    let mappedFeedbacks = new Map();
    feedbacks.forEach((feedback) => {
      let key = [feedback.roleLevel, feedback.userId];
      mappedFeedbacks.set(key, feedback.categories);
    });
    return mappedFeedbacks;
  }


  useEffect(() => {
    if (mappedCategories !== undefined && feedbacks !== undefined) {
      //console.log('FEEDBACKS', feedbacks); // Debugging
      setMappedFeedbacks(prepareFeedbacks(feedbacks));
    }
    //eslint-disable-next-line
  }, [feedbacks, mappedCategories]);


  useEffect(() => {
    const getUser = async () => {
      try {
        const userDetails: loggedInUser = await getSecureUserUid();
        if (userDetails) {
          //console.log("user details", userDetails);  //Debugging
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

  /** currently assumed that activeTemplate is the same as template._id in feedbacks */
  useEffect(() => {
    setTemplate(activeTemplate);
  }, [activeTemplate]);

  /** prepare chart data objects */
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

  /** sort feedbacks by reviewer role  */
  useEffect(()=>{
    let colleagues:IFeedback[] = [];
    if (feedbacks && feedbacks !== undefined){    
      let feedbacksCopy = [...feedbacks];
      feedbacksCopy.forEach((feedback)=>{
        if(feedback.userId === revieweeId){
          setSelfEval(feedback);
        }
        else if (feedback.userId === CompMan){
          setCmEval(feedback);
        }
        else {
          colleagues.push(feedback);

        }
      })
      setColleagueEvals(colleagues);
 }
  },[feedbacks, CompMan, revieweeId]);

  /* map feedback responses to chartData objects */
  useEffect(()=>{
    console.log('checking access to mappedCategories', mappedCategories);
   cmEval?.categories.forEach((evalCategory)=>{
    mappedCategories?.forEach((chartCategory)=>{
      if (evalCategory.category === chartCategory.categoryId){
        console.log('whats happening', evalCategory.questions);
        console.log('chartCategory', chartCategory);
        evalCategory.questions.forEach((question)=>{
          
        })
         
       }
    }
    )

   })
   
console.log(selfEval);


  },[cmEval, selfEval, colleagueEvals]);



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
