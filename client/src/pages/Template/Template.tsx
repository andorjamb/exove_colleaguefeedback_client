//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//Styles
import styles from "./Template.module.css";

//Types
import {
  ITemplatePost,
  ITemplateQuestion,
  IQuestionPost,
  ISection,
} from "../../types/template";

//Internal imports
import { preface } from "./preface";
import { gradingGuidance } from "./gradingGuidance";
import {
  useGetActiveTemplateQuery,
  //useGetAllTemplatesQuery,
  useAddTemplateMutation,
} from "../../features/templateApi";
import {
  useGetAllQuestionsQuery,
  //useGetQuestionIdQuery,
  useAddQuestionMutation,
} from "../../features/questionApi";
import { useGetAllCategoriesQuery } from "../../features/categoryApi";

//Components
import Accordion from "../../components/Accordion/Accordion";

type accordion = {
  open: boolean;
};

type correctedQuestion = {
  //redundant type - same as ITemplateQuestion?
  id: string;
  question: string;
  isFreeForm: boolean;
};

class SectionClass {
  id: string;
  name: string;
  questions: ITemplateQuestion[];
  constructor(id: string, name: string, questions: ITemplateQuestion[]) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
}

const Template = () => {
  //const getTemplateData = useGetAllTemplatesQuery();
  const getActiveTemplate = useGetActiveTemplateQuery();
  const getCategories = useGetAllCategoriesQuery();
  const getQuestions = useGetAllQuestionsQuery(); //IQuestion[]

  const [addQuestion] = useAddQuestionMutation();
  const [addTemplate] = useAddTemplateMutation();

  const [accordion, setAccordion] = useState<accordion[]>([
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
  ]);
  const [templateTitle, setTemplateTitle] = useState<string>("");

  //const templates = getTemplateData.data;
  const activeTemplate = getActiveTemplate.data;
  const categories = getCategories.data;
  const questions = getQuestions.data;
  const categoriesCount: number | undefined = categories?.length;
  console.log("number of categories:", categoriesCount);
  categories?.forEach((cat) => {
    //use for setting number of accordion states
  });

  /*   const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const navigate = useNavigate(); */

  const [questionState, setQuestionState] = useState({
    newQuestion: "",
    questionArray: [],
  });

  let newCategoryArray: ISection[];
  newCategoryArray = dataParser();

  /** new dataform in template:
   *
   * categories: [{
   *    id:string,
   *    name: string,
   *      questions : [{id: string, question: string, isFreeForm: boolean}, {},{}]
   *    },
   *    {},
   *    {}
   *  ]
   *
   */

  function dataParser() {
    let categoryArray: ISection[] = [];
    let newQuestion: ITemplateQuestion = {
      id: "",
      question: "",
      isFreeForm: false,
    };
    categories?.forEach((category) => {
      let questionArray: ITemplateQuestion[] = [];
      questions?.forEach((question) => {
        if (question.category === category._id) {
          console.log("question match:", question.question);
          newQuestion = {
            ...newQuestion,
            id: question._id,
            question: question.question[0].question as string,
          };

          if (question.type.startsWith("s".toLowerCase())) {
            newQuestion = {
              ...newQuestion,
              /*   id: question._id,
              question: question.question[0].question as string, */
              isFreeForm: true,
            };
          } /* else {
            newQuestion = {
              id: question._id,
              question: question.question[0].question as string,
              isFreeForm: false,
            };
          } */
          questionArray.push(newQuestion);
        }
      });
      console.log(questionArray); //debugging

      let correctedCategory = new SectionClass(
        category._id,
        category.categoryName,
        questionArray
      );
      console.log("reformed catogry", correctedCategory); //debugging
      categoryArray.push(correctedCategory);
    });
    return categoryArray;
  }

  /* function correctType(p: string) {
    const values: string[] = ["Number", "number", "String", "string"];
    if (values.includes(p)) {
      return true;
    } else {
      return false;
    }
  } */

  function titleChangeHandler(e: any) {
    console.log(e.target.value);
    setTemplateTitle((title) => e.target.value);
  }

  function questionChangeHandler(e: any, i: number, categoryId: string) {
    let items = { ...questionState };
    //items.questionArray = [...items.questionArray, e.target.value];
    setQuestionState(items);
  }

  async function saveTemplate(e: any) {
    e.preventDefault();
    let newTemplate: ITemplatePost = {
      templateTitle: templateTitle,
      instructions: "",
      categories: [{}],
    };
    addTemplate(newTemplate);
  }

  function toggleAccordion(e: any, i: number) {
    let currentValue = accordion[i]?.open;
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
      question: { lang: "Eng", question: questionState.newQuestion },
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
        {newCategoryArray.map((item, i) => (
          <Accordion
            key={i}
            category={item}
            clickHandler={(e: any) => toggleAccordion(e, i)}
            isOpen={accordion[i]?.open}
            questionChangeHandler={questionChangeHandler}
            createQuestion={() => createQuestion}
          />
        ))}
        <div className={styles.formRow}>
          <button type="submit" onClick={saveTemplate}>
            Save
          </button>
          <button type="button">Preview</button>
        </div>
      </form>
    </div>
  );
};

export default Template;
