//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { v4 as uuidv4 } from "uuid";

//Types
import {
  ITemplateGet,
  ITemplatePost,
  IQuestion,
  IQCategory,
  IQuestionLang,
  ISection,
  IConvertedTemplate,
  ITemplateQuestion,
  IQuestionPost,
} from "../../types/template";

//Styling
import styles from "./Template.module.css";

//Internal imports
import { testTemplateData } from "../../testdata/testTemplateData";
import { preface } from "./preface";
import { gradingGuidance } from "./gradingGuidance";
import {
  convertTemplate,
  /* fetchCategories, */
} from "../../functions/templateConverter";
import {
  useGetActiveTemplateQuery,
  useGetAllTemplatesQuery,
  useAddTemplateMutation,
} from "../../features/templateApi";
import {
  useGetAllQuestionsQuery,
  useGetQuestionIdQuery,
  useAddQuestionMutation,
} from "../../features/questionApi";
import { useGetAllCategoriesQuery } from "../../features/categoryApi";
import {correctt}

//Components
import Accordion from "../../components/Accordion/Accordion";

/**
 * API ROUTES
  get('/template', getTemplates); ------------------Get all templates
  get('/template/active', getTemplate);  ----------------get current active template
  post('/template', addTemplate);  ------------- save template to db
  patch('/template/:id', setDefaultTemplate); ------ set template as default, all others as not default 
 */


type accordion = {
  open: boolean;
};

type correctedQuestion = {
  id: string;
  question: string;
  isFreeForm: boolean;
};




const Template = () => {
  const getTemplateData = useGetAllTemplatesQuery();
  const getActiveTemplate = useGetActiveTemplateQuery();
  const getCategories = useGetAllCategoriesQuery();
  const getQuestions = useGetAllQuestionsQuery(); //IQuestion[]

  const [addQuestion] = useAddQuestionMutation();
  const [addTemplate] = useAddTemplateMutation();

  const templates = getTemplateData.data;
  const activeTemplate = getActiveTemplate.data;
  const categories = getCategories.data;
  const questions = getQuestions.data;
  console.log(activeTemplate);
  console.log(questions);

  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const navigate = useNavigate();

  const [questionState, setQuestionState] = useState({
    newQuestion: "",
    questionArray: [],
  });
  const [accordion, setAccordion] = useState<accordion[]>([{ open: false }]);

  const [templateTitle, setTemplateTitle] = useState<string>("");

  let newQuestion: correctedQuestion;
  
  function dataParser() {
    categories?.forEach((category) => {
      let questionArray: correctedQuestion[] = [];
    questions?.forEach((question) => {
      if (question.category === category._id && correctType(question.type)) {
        if (question.type.startsWith("s".toLowerCase())) {
          newQuestion = {
            id: question._id,
            question: question.question[0].question as string,
            isFreeForm: true,
          };
        } else {
          newQuestion = {
            id: question._id,
            question: question.question[0].question as string,
            isFreeForm: true,
          };
        }
      }
      questionArray.push(newQuestion);
    });
    console.log(questionArray);//debugging
    
    let correctedCategory = new SectionClass(
      category._id,
      category.categoryName,
      questionArray
    );
    console.log(correctedCategory); //debugging
  });
}

  function correctType(p: string) {
    const values: string[] = ["Number", "number", "String", "string"];
    if (values.includes(p)) {
      return true;
    } else {
      return false;
    }
  }

  function titleChangeHandler(e: any) {
    console.log(e.target.value);
    setTemplateTitle((title) => e.target.value);
  }

  function questionChangeHandler(e: any, i: number, categoryId: string) {
    let items = { ...questionState };
    //items.questionArray = [...items.questionArray, e.target.value];
    setQuestionState(items);
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    // addTemplate()
  }

  function toggleAccordion(e: any, i: number) {
    let currentValue = accordion[i].open;
    setAccordion((accordion) => {
      return accordion.map((item) => {
        return accordion.indexOf(item) === i
          ? { ...item, open: !currentValue }
          : item;
      });
    });
  }

  function createQuestion(categoryId: string) {
    let newQuestion: IQuestionPost = {
      category: categoryId,
      question: { lang: "en", question: questionState.newQuestion },
      type: "",
    };
    addQuestion(newQuestion);
  }

  return (
    <div className={styles.container}>
      <h1>New feedback template</h1>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <label htmlFor="templateTitle">
            <h3 className={styles.h3}>Template title</h3>
          </label>
        </div>
        <div className={styles.formRow}>
          <input
            className={styles.input}
            name="templateTitle"
            value={activeTemplate?.templateTitle}
            onChange={titleChangeHandler}
          />{" "}
          <div className={styles.iconDiv}>
            <span className={styles.materialIcons}>edit</span>
          </div>
        </div>
        <section>
          <div className={styles.formRow}>
            <label htmlFor="preface">
              <h3 className={styles.h3}>Introductory text</h3>
            </label>
            <span>Non editable text</span>
          </div>
          <div className={`${styles.noedit} ${styles.preface}`}>{preface}</div>
        </section>
        {/* END SECTION */}
        <section>
          <div className={styles.formRow}>
            <label htmlFor="gradingGuidance">
              <h3 className={styles.h3}>Grading Guidance</h3>
            </label>
            <span>Non editable text</span>
          </div>
          <div className={`${styles.noedit} ${styles.preface}`}>
            {gradingGuidance}
          </div>
        </section>
        {/* END SECTION */}
        <div className={styles.formRow}>
          <h3 className={styles.h3}>Feedback Questions</h3>
        </div>
        {/* ACCORDIONS */}
        {categories?.map((item, i) => (
          <Accordion
            key={i}
            category={item}
            questions={questions} //the array of all questions
            clickHandler={(e: any) => toggleAccordion(e, i)}
            isOpen={true}
            questionChangeHandler={questionChangeHandler}
            createQuestion={() => createQuestion}
          />
        ))}
        <div className={styles.formRow}>
          <button type="submit" onClick={submitHandler}>
            Save
          </button>
          <button type="button">Preview</button>
        </div>
      </form>
    </div>
  );
};

export default Template;
