import React, { useEffect, useMemo, useState } from "react";


//Survey packages
import { Model } from "survey-core";

//Styling
import style from "./FeedbackForm.module.css";
import StringQuestions from "./StringQuestions";
import { template } from "./Data";
import RangeQuestions from "./RangeQuestions";
import BoleanQuestions from "./BoleanQuestions";
import {useGetActiveTemplateQuery,useAddTemplateMutation} from "../../features/templateApi";
import { ICategory, ITemplate } from "../../types/template";




const FeedbackForm = () => {
  const { data } = useGetActiveTemplateQuery() || [];
  const [loadigState, setLoadingState] = useState<boolean>(true)
  const [activeTmpt, setActiveTmpt] = useState<ITemplate>()
 
  useEffect(() => {
    if (data) {
      setActiveTmpt(data)
      setLoadingState(false)
    } else {
      setLoadingState(true)
    }
  
  }, [data])
  
 
  const qTemplate = activeTmpt;
  console.log(activeTmpt?.categories)
  const [language, setLang] = useState<string>('Eng')
  // const category = qTemplate.categories
  return (


    <div className={style.main}>
      <div className={style.user} style={{}}>
        <h1 className={style.header}>Feedback for your Colleague</h1>
        <h2 className={style.username}>Dibya Dahal</h2>

      </div>

      <h3 className={style.instructionsTitle}>Instruction</h3>

  
      <p className={style.instructions}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        quis tempora minus, fuga officia sed ut? Id blanditiis, voluptates
        voluptate eaque ipsum cupiditate dolore sunt possimus tempora excepturi
        perspiciatis ullam. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Non suscipit vitae tempore eligendi, nulla optio placeat?
        Consequatur deserunt obcaecati, atque reiciendis in corrupti praesentium
        libero, doloribus rem excepturi placeat perferendis!
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
                        <StringQuestions
                          key={quiz._id}
                          question={quiz.question
                            .filter((lang) => lang.lang === language)
                            .map((lang) => lang.question)
                            .toString()}
                        />
                      ) : quiz.type === 'number' ? (
                        <RangeQuestions
                          key={quiz._id}
                          question={quiz.question
                            .filter((lang) => lang.lang === language)
                            .map((lang) => lang.question)
                            .toString()}
                        />
                      ) :
                        (
                          <BoleanQuestions
                            key={quiz._id}
                            question={quiz.question
                              .filter((lang) => lang.lang === language)
                              .map((lang) => lang.question)
                              .toString()}
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
  type="submit"
>
Submit
</button>
</div>
  </div>
  )
};

export default FeedbackForm;
