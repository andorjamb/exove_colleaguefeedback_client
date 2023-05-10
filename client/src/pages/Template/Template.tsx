//React
import React, { useState, useEffect } from "react";
/* import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; */

//Styles
import styles from "./Template.module.css";

//Types
import {
  ITemplatePost,
  ITemplateQuestion,
  IQuestionPost,
  ISection,
  ICategoryPost,
  IActiveTemplateGet,
  ITemplate,
} from "../../types/template";

//Internal imports
import { preface } from "../../assets/preface";
import { gradingGuidance } from "../../assets/gradingGuidance";
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
  const { isLoading } = useGetAllQuestionsQuery();

  const [addQuestion] = useAddQuestionMutation();
  const [addTemplate] = useAddTemplateMutation();

  const [accordion, setAccordion] = useState<accordion[]>([]);
  const [templateTitle, setTemplateTitle] = useState<string>("");
  /*  const [categoriesState, setCategoriesState] = useState<ICategoryPost[]>([]);
  const [selectedQuestionState, setSelectedQuestionState] = useState<
    IQuestionPost[]
  >([]); */
  const [catQuestState, setCatQuestState] = useState<ICategoryPost[]>([]);

  const [newQuestionState, setNewQuestionState] = useState<{
    categoryId: string;
    value: string;
    type: string;
  }>({
    categoryId: "",
    value: "",
    type: "",
  });

  const activeTemplate = getActiveTemplate.data;
  const categories = getCategories.data;
  const questions = getQuestions.data;

  let newCategoryArray: ISection[] = dataParser();

  let activeCategoryObject = makeActiveCategoryObject(activeTemplate!);

  function makeActiveCategoryObject(activeTemplate: ITemplate) {
    let activeCategoryObject = activeTemplate?.categories.reduce(
      (accumulator, currentValue) => {
        return {
          ...accumulator,
          [currentValue.category._id]: currentValue.category.questions,
        };
      }
    );

    return activeCategoryObject;
  }

  useEffect(() => {
    if (categories?.length) {
      let accordionCopy = [...accordion];
      for (let i = 0; i < categories.length; i++) {
        accordionCopy.push({ open: false });
      }
      setAccordion((accordion) => [...accordionCopy]);
    }
    //eslint-disable-next-line
  }, [categories]);

  /*   const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const navigate = useNavigate(); */

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
    /*type: string */
  ) {
    console.log(value, " ", categoryId, " "); //debugging

    if (value) {
      //set question in newQuestionState
      setNewQuestionState((newQuestionState) => {
        return {
          ...newQuestionState,
          value: e.target.value,
          categoryId: categoryId,
        };
      });
      if (value === "on") {
        setNewQuestionState((newQuestionState) => {
          return { ...newQuestionState, type: "String" };
        });
      } else {
        setNewQuestionState((newQuestionState) => {
          return { ...newQuestionState, type: "Number" };
        });
      }
    }
  }

  function titleChangeHandler(e: any) {
    console.log(e.target.value);
    setTemplateTitle((title) => e.target.value);
  }

  function createQuestion() {
    console.log("adding question", newQuestionState);
    let newQuestion: IQuestionPost = {
      category: newQuestionState.categoryId,
      question: { lang: "Eng", question: newQuestionState.value },
      type: newQuestionState.type,
    };
    addQuestion(newQuestion).then(() => {
      console.log("sent");
    });
  }

  function checkboxChangeHandler( //for adding questions to a template
    e: any,
    categoryId: string,
    questionId: string
  ) {
    console.log("cat_id: ", categoryId, "question_id: ", questionId);
    let questionArray: string[] = [];
    if (e.target.checked) {
      questionArray.push(e.target.value);
    } else {
      questionArray = questionArray.filter((item) => item !== e.target.value);
    }
    let catObject: ICategoryPost = { category: categoryId, questions: [] };

    /*  setCatQuestState((catQuestState) => {
      return { ...catQuestState, category: categoryId, questions: [] };
    }); */
    setCatQuestState((catQuestState) => {
      return [...catQuestState, catObject]; //add new category with question array
    });
  }

  /*   function getToppings() {
    const toppingsList = [];
    const toppings = document.getElementsByName("toppings");
    toppings.forEach(function (topping) {
        if (topping.checked) {
            toppingsList.push(topping.value)
        };
    })
    return toppingsList;
} */

  /*
  export interface ICategoryPost {
    category: string;
    questions: QuestionLangPost[];
  }
  
type QuestionLangPost = {
  //for creating new question
  lang: string;
  question: string;
};

export interface IQuestionPost {
  //for creating new question
  category: string;
  type: string;
  question: QuestionLangPost;
}

export interface ITemplatePost {
  templateTitle: string;
  instructions: string;
  categories: ICategoryPost[];
}

*/

  async function saveTemplate(e: any) {
    e.preventDefault();
    let newTemplate: ITemplatePost = {
      templateTitle: templateTitle,
      instructions: "",
      categories: catQuestState,
    };
    await addTemplate(newTemplate).then(() => {
      console.log("template saved successfully");
    }); //this may need to return the created id of saved template? (in case of needing to set as default/active)
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

  useEffect(() => {
    if (activeTemplate?.templateTitle) {
      setTemplateTitle((title) => activeTemplate.templateTitle);
    }
  }, [activeTemplate]);

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
            value={templateTitle}
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
        {isLoading ? (
          <>
            <h4>Fetching questions</h4>
          </>
        ) : (
          <>
            {newCategoryArray.map((item, i) => (
              <Accordion
                key={i}
                category={item}
                activeCategories={activeCategoryObject}
                clickHandler={(e: any) => toggleAccordion(e, i)}
                isOpen={accordion[i]?.open}
                checkboxChangeHandler={(e) =>
                  checkboxChangeHandler(e, item.id, e.target.value)
                }
                createQuestionChangeHandler={(e) =>
                  createQuestionChangeHandler(e, item.id, e.target.value)
                }
                createQuestion={createQuestion}
              />
            ))}
          </>
        )}
        <div className={styles.formRow}>
          <button className={styles.greenButton} type="submit" onClick={saveTemplate}>
            Save
          </button>
          <button type="button">Preview</button>
        </div>
      </form>
    </div>
  );
};

export default Template;
