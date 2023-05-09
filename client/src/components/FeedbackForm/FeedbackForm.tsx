import React, { useMemo, useState } from "react";

//Survey packages
import { Model } from "survey-core";

//Styling
import styles from "./FeedbackForm.module.css";
import StringQuestions from "./StringQuestions";
import { template } from "./Data";
import RangeQuestions from "./RangeQuestions";
import BoleanQuestions from "./BoleanQuestions";


interface SingleQuiz {
  lang: string,
  question: string,
  _id:string
}

interface IQuiz{
  _id: string;
  category: string;
  createdBy: string;
  createdOn: string;
  active: boolean;
  type: string;
  question:SingleQuiz[] ;
}
interface ITemplate {
 
    _id: string;
    templateTitle: string;
    instructions: string;
    createdOn: string;
    createdBy: string;
    categories: ICategory[];
    active: boolean;

}

interface ICategory {
category:IICategory;
}

interface IICategory {
  _id: string;
  categoryName:string;
  questions: IQuiz[];
};


const FeedbackForm = () => {
  const qTemplate:ITemplate = template;
 const [language,setLang]=useState<string>('Eng')
const category:ICategory[] = qTemplate.categories
  return (
    <div className={styles.main}>
      <div className={styles.user} style={{}}>
      <h1 className={styles.header}>Feedback for your Colleague</h1>
      <h2 className={styles.username}>Dibya Dahal</h2>
      </div>

      <h3 className={styles.instructionsTitle}>Instruction</h3>

  
      <p className={styles.instructions}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
        quis tempora minus, fuga officia sed ut? Id blanditiis, voluptates
        voluptate eaque ipsum cupiditate dolore sunt possimus tempora excepturi
        perspiciatis ullam. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Non suscipit vitae tempore eligendi, nulla optio placeat?
        Consequatur deserunt obcaecati, atque reiciendis in corrupti praesentium
        libero, doloribus rem excepturi placeat perferendis!
      </p>

      <div className={styles.questionContainer}>
        {qTemplate.categories.map(
          (cat) => (
          <div className={styles.catQuest} key={cat.category._id} >
            <h2>{cat.category.categoryName}</h2>

            {
            cat.category.questions.map(
              (quiz) => (
              <div key={quiz._id}>
                {quiz.type === 'String' ? (
                  <StringQuestions
                    key={quiz._id}
                    question={quiz.question
                      .filter((lang) => lang.lang === language)
                      .map((lang) => lang.question)
                      .toString()}
                  />
                ) : quiz.type === 'Range' ? (
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
  </div>
  )
};

export default FeedbackForm;
