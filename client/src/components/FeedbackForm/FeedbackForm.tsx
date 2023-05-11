import React, { useEffect, useState } from "react";

import style from "./FeedbackForm.module.css";
import StringQuestions from "./StringQuestions";
import RangeQuestions from "./RangeQuestions";
import BoleanQuestions from "./BoleanQuestions";
import {useGetActiveTemplateQuery} from "../../features/templateApi";
import {  ITemplate } from "../../types/template";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { IFCategory, IFeedback } from "../../types/feedback";
import { newfeedback } from "../../features/feedBackSlice";
import { getSecureUserUid } from "../../functions/secureUser";
import { loggedInUser } from "../../types/users";

const FeedbackForm = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useGetActiveTemplateQuery() || [];
  const [loadigState, setLoadingState] = useState<boolean>(true)
  const [activeTmpt, setActiveTmpt] = useState<ITemplate>()
  const [userInfo, setUserInfo] = useState<loggedInUser>()

  useEffect(() => {
    if (data) {
     
      const categories: IFCategory[] = []
       
      data.categories.forEach(cat => {
        const cate: IFCategory = {
          category: cat.category._id,
          questions:[]
        }
        categories.push(cate)
      });
      

      const feedback: IFeedback = {
        template: data.templateTitle,
        requestpicksId: 'string',
        feedbackTo: 'string',
        progress: 'started',
        responseDateLog: [new Date().toISOString()],
        categories: categories,
        roleLevel:3,
      }
      dispatch(newfeedback(feedback));
      setActiveTmpt(data)
      
      setLoadingState(false)
    } else {
      setLoadingState(true)
    }
  
  }, [data])
  
  const feedbacks = useSelector((state: any) => state.feedback);
 
  const qTemplate = activeTmpt;
  const [language, setLang] = useState<string>('Eng')

  const handleSubmitFeedBack = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const feedBack: IFeedback = { ...feedbacks, userId: userInfo?.uid, roleLevel: 3 }
    console.log(feedBack)
  }

  useEffect(() => {
    getUser()
  },[])
  const getUser = async () => {
  try {
    const userDetails: loggedInUser = await getSecureUserUid()
    if(userDetails) setUserInfo(userDetails)
  } catch (error) {
    console.log(error)
  }

}
  return (


    <div className={style.main}>
      <div className={style.user} style={{}}>
        <h1 className={style.header}>{ qTemplate?.templateTitle}</h1>
        <h2 className={style.username}>Moi {userInfo ? userInfo.displayName : 'Guest'}</h2>

      </div>

      <h3 className={style.instructionsTitle}>Instruction</h3>

  
      <p className={style.instructions}>
        {qTemplate?.instructions}
      </p>
      <>
        {
        loadigState ? (
          <>
            <h1>Getting Data .........</h1>
        </>) :
          (
          <div className = {style.questionContainer}>
        {qTemplate && qTemplate.categories?.map(
          (cat) => (
            <div className={style.catQuest} key={cat.category._id} >
              <h2>{cat.category.categoryName}</h2>

              {
                cat.category.questions.map(
                  (quiz) => (
                    <div key={quiz._id}>
                      {quiz.type === 'string' ? (
                        <>
                        <StringQuestions
                          
                          key={quiz._id}
                          category={quiz.category}

                          questions= {
                              quiz.question.find(quiz => quiz.lang === language)!
                              
                            }
                      
                        />
                        </>
                      ) : quiz.type === 'number' ? (
                        <RangeQuestions
                          key={quiz._id}
                          category={quiz.category}

                          questions= {
                              quiz.question.find(quiz => quiz.lang === language)!
                              
                            }
                        />
                      ) :
                        (
                          <BoleanQuestions
                            key={quiz._id}
                            category={quiz.category}

                          questions= {
                              quiz.question.find(quiz => quiz.lang === language)!
                              
                            }
                          />
                        )
                      }
                    </div>
                  )
                )
              }
            </div>
      
          )
        )
        }
      </div>
  )

  }
   </>

<div className={style.formElements}>
<button
          className={[style.button, style.loginButton].join(" ")}
          onClick={(e)=> handleSubmitFeedBack(e)}
>
Submit
        </button>
        
</div>
  </div>
  )
};

export default FeedbackForm;
