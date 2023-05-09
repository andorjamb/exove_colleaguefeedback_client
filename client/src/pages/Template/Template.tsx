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
  ICat_Quest,
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

  const [accordion, setAccordion] = useState<accordion[]>([]);
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [categoriesState, setCategoriesState] = useState<ICat_Quest[]>([]);

  /**
   * ICat_Quest [{
   * category: docId,
   * questions: IQuestion[]  //but submit as as array of question ids?
   * [{
   * }
   * ]}]
   */

  //const templates = getTemplateData.data;
  const activeTemplate = getActiveTemplate.data;
  const categories = getCategories.data;
  const questions = getQuestions.data;

  const [questionState, setQuestionState] = useState({
    newQuestion: "",
    questionArray: [],
  });

  let newCategoryArray: ISection[] = dataParser();

  useEffect(() => {
    if (categories?.length) {
      let accordionCopy = [...accordion];
      for (let i = 0; i < categories.length; i++) {
        accordionCopy.push({ open: false });
      }
      setAccordion((accordion) => [...accordionCopy]);
    }
  }, [categories]);

  /*   const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const navigate = useNavigate(); */

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

  //console.log(activeTemplate);  //debugging

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
          newQuestion = {
            ...newQuestion,
            id: question._id,
            question: question.question[0].question as string,
            isFreeForm: false,
          };

          if (question.type.startsWith("s".toLowerCase())) {
            newQuestion = {
              ...newQuestion,
              isFreeForm: true,
            };
          }
          questionArray.push(newQuestion);
        }
      });

      let correctedCategory = new SectionClass(
        category._id,
        category.categoryName,
        questionArray
      );
      categoryArray.push(correctedCategory);
    });
    return categoryArray;
  }

  function createQuestionChangeHandler(
    e: any,
    categoryId: string,
    value: string
  ) {
    console.log(value);
    console.log(categoryId);
  }

  function titleChangeHandler(e: any) {
    console.log(e.target.value);
    setTemplateTitle((title) => e.target.value);
  }

  function checkboxChangeHandler(
    e: any,
    // i: number,
    categoryId: string,
    questionId: string
  ) {
    let items = { ...questionState };
    console.log("cat_id: ", categoryId, "question_id: ", questionId);
    //items.questionArray = [...items.questionArray, e.target.value];
    setQuestionState(items);
  }

  async function saveTemplate(e: any) {
    e.preventDefault();
    let newTemplate: ITemplatePost = {
      templateTitle: templateTitle,
      instructions: "",
      categories: categoriesState,
    };
    await addTemplate(newTemplate); //this needs to return the created id of saved template
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
      {accordion.length}
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
            <span>Non-editable text</span>
          </div>
          <div className={`${styles.noedit} ${styles.preface}`}>{preface}</div>
        </section>
        {/* END SECTION */}
        <section>
          <div className={styles.formRow}>
            <label htmlFor="gradingGuidance">
              <h3 className={styles.h3}>Grading Guidance</h3>
            </label>
            <span>Non-editable text</span>
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
            checkboxChangeHandler={(e) =>
              checkboxChangeHandler(e, item.id, e.target.value)
            }
            createQuestionChangeHandler={(e) =>
              createQuestionChangeHandler(e, item.id, e.target.value)
            }
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
