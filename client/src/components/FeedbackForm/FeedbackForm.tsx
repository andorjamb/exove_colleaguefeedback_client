import React, { useEffect, useState } from "react";
import style from "./FeedbackForm.module.css";
import StringQuestions from "./StringQuestions";
import RangeQuestions from "./RangeQuestions";
import BooleanQuestions from "./BooleanQuestions";
import { useGetActiveTemplateQuery } from "../../features/templateApi";
import { ITemplate } from "../../types/template";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { IFCategory, IFeedback, ISearchParams } from "../../types/feedback";
import { newfeedback } from "../../features/feedBackSlice";
import { getSecureUserUid } from "../../functions/secureUser";
import { loggedInUser } from "../../types/users";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomSpinner from "../../components/CustomSpinner/CustomSpinner";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useGetActiveTemplateQuery() || [];

  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [qTemplate, setActiveTmpt] = useState<ITemplate>();
  const [userInfo, setUserInfo] = useState<loggedInUser>();
  const { feedback } = useSelector((state: any) => state.feedback);
  const lang = useSelector((state: any) => state.header.lang);
  const navigate = useNavigate();
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState<number>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const request: string | null = params.get("id");
  const feed: string | null = params.get("to");
  const role: string | null = params.get("role");
  let requestpicksId: string = "";
  let feedbackTo: string = "";
  let roleLevel: number;

  useEffect(() => {
    if (data) {
      const categories: IFCategory[] = [];
      data.categories.forEach((cat) => {
        const cate: IFCategory = {
          category: cat.category._id,
          questions: [],
        };
        categories.push(cate);
      });
      const newFeedbacks: IFeedback = {
        template: data._id,
        requestpicksId,
        feedbackTo,
        progress: "started",
        responseDateLog: [new Date().toISOString()],
        categories: categories,
        roleLevel,
        userId: userInfo?.uid,
      };

      dispatch(newfeedback(newFeedbacks));
      setActiveTmpt(data);

      setLoadingState(false);
    } else {
      setLoadingState(true);
    }
  }, [data, dispatch, userInfo?.uid]);

  useEffect(() => {
    const validateNumber = () => {
      const stringQuestions =
        qTemplate?.categories?.flatMap((cat) =>
          cat.questions.filter(
            (quiz: { type: string }) => quiz.type.toLowerCase() === "number"
          )
        ) || [];
      const feedbacked: IFeedback = feedback;
      const stringQuestionsAnswers =
        feedbacked?.categories?.flatMap((cat) =>
          cat.questions.filter((quiz) => quiz.type.toLowerCase() === "number")
        ) || [];

      setUnAnsweredQuestions(
        stringQuestions.length - stringQuestionsAnswers.length
      );
    };
    validateNumber();
  }, [feedback, qTemplate?.categories]);

  const handleSubmitFeedBack = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (unAnsweredQuestions !== 0) {
      alert(`questions are still needs answers`);
      return false;
    }

    try {
      const url = `https://exove.vercel.app/api/feedback/${requestpicksId}`;
      const { data } = await axios.post(
        url,
        { ...feedback },
        { withCredentials: true }
      );
      toast.success(data, {
        className: "toast-message",
      });
      navigate("/");
    } catch (error) {
      toast.error("Sorry ran into an error", {
        className: "toast-message",
      });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoadingState(true);
        const userDetails: loggedInUser = await getSecureUserUid();
        if (userDetails) {
          setUserInfo(userDetails);
        } else {
          navigate("/login");
        }
        setLoadingState(false);
      } catch (error) {
        console.log(error);
        setLoadingState(false);
      }
    };
    getUser();
  }, [navigate]);

  if (
    request === "null" ||
    feedbackTo === null ||
    role === null ||
    parseInt(role!) === 0
  ) {
    return (
      <>
        <h1>You don't have a feedback to submit.</h1>
      </>
    );
  } else {
    requestpicksId = request!;
    feedbackTo = feed!;
    roleLevel = parseInt(role!);
  }

  return (
    <div className={style.main}>
      <div className={style.user} style={{}}>
        <h1 className={style.header}>{qTemplate?.templateTitle}</h1>
        <h2 className={style.username}>
          Moi {userInfo ? userInfo.displayName : "Guest"}
        </h2>
      </div>

      <>
        {loadingState ? (
          <CustomSpinner />
        ) : (
          <div className={style.questionContainer}>
            <div className={style.instructionsContainer}>
              <h3 className={style.instructionsTitle}>Instruction</h3>

              <p className={style.instructions}>{qTemplate?.instructions}</p>
            </div>
            {qTemplate &&
              qTemplate.categories?.map((cat) => (
                <div className={style.catQuest} key={cat.category._id}>
                  <h2>{cat.category.categoryName}</h2>

                  {cat.questions.map((quiz) => (
                    <div key={quiz._id}>
                      {quiz.type.toLowerCase() === "string" ? (
                        <>
                          <StringQuestions
                            key={quiz._id}
                            category={cat.category._id}
                            questions={
                              quiz.question.find(
                                (quiz: { lang: any }) => quiz.lang === lang
                              )!
                            }
                          />
                        </>
                      ) : quiz.type.toLowerCase() === "number" ? (
                        <RangeQuestions
                          key={quiz._id}
                          category={cat.category._id}
                          questions={
                            quiz.question.find(
                              (quiz: { lang: any }) => quiz.lang === lang
                            )!
                          }
                        />
                      ) : (
                        <BooleanQuestions
                          key={quiz._id}
                          category={cat.category._id}
                          questions={
                            quiz.question.find(
                              (quiz: { lang: any }) => quiz.lang === lang
                            )!
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            <div className={style.formElements}>
              <button
                className={[style.button, style.loginButton].join(" ")}
                onClick={(e) => handleSubmitFeedBack(e)}
                disabled={unAnsweredQuestions !== 0}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default FeedbackForm;
