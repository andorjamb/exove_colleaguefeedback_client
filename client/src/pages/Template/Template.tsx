//React
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Styles
import styles from "../../pages/Template/Template.module.css";
import "../../pages/Template/Template.css";

//Types
import {
  ITemplatePost,
  ITemplateQuestion,
  IQuestionPost,
  ISection,
  ICategoryPost,
  // IActiveTemplateGet,
} from "../../types/template";

//Internal imports
import { preface } from "../../assets/preface";
import { gradingGuidance } from "../../assets/gradingGuidance";
import {
  useGetActiveTemplateQuery,
  useAddTemplateMutation,
} from "../../features/templateApi";
import {
  useGetAllQuestionsQuery,
  useAddQuestionMutation,
} from "../../features/questionApi";
import { useGetAllCategoriesQuery } from "../../features/categoryApi";
import { updateTemplateSelection } from "../../features/templateSlice";

//Components
import Accordion from "../../components/Accordion/Accordion";

type accordion = {
  open: boolean;
};

interface ActiveCheckboxes {
  [index: string]: string[];
}

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
  const dispatch = useDispatch();

  /** data fetching and state */
  const getActiveTemplate = useGetActiveTemplateQuery();
  const getCategories = useGetAllCategoriesQuery();
  const getQuestions = useGetAllQuestionsQuery(); //IQuestion[]
  const { isLoading } = useGetAllQuestionsQuery();

  const [addQuestion] = useAddQuestionMutation();
  const [addTemplate] = useAddTemplateMutation();

  const [accordion, setAccordion] = useState<accordion[]>([]);
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const activeCheckboxState = useSelector(
    (state: any) => state.template.templateSelection
  );

  //console.log(activeCheckboxState); //debugging  - working

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

  /** data manipulations  */
  let newCategoryArray: ISection[] = dataParser();

  /** used to set default checked value of checkboxes, returns all active questions indexed by category  */
  function makeActiveCategoryObject(activeTemplate: any) {
    if (activeTemplate?.categories.length) {
      let activeCategoryObject = activeTemplate?.categories.reduce(
        (accumulator: any, currentValue: any) => {
          return {
            ...accumulator,
            ...{ [currentValue.category._id]: currentValue.questions },
          };
        },
        {}
      );
      dispatch(updateTemplateSelection(activeCategoryObject));
      return activeCategoryObject;
    } else {
      console.log("categories not populated.");
    }
  }

  /** set initial open state of accordion divs when categories are fetched */

  /** used to manipulate fetched template data into a form useful for rendering  */
  function dataParser() {
    let categoryArray: ISection[] = [];
    let arrayQuestion: ITemplateQuestion = {
      id: "",
      question: "",
      isFreeForm: false,
    };
    categories?.forEach((category) => {
      let questionArray: ITemplateQuestion[] = [];
      questions?.forEach((question) => {
        if (question.category === category._id) {
          arrayQuestion = {
            ...arrayQuestion,
            id: question._id,
            question: question.question[0].question as string, //TOFIX: this could cause bugs if 'Eng' is not first in array
            isFreeForm: false,
            //makes assumption that questions will only be one of two types
          };

          if (question.type.startsWith("s".toLowerCase())) {
            arrayQuestion = {
              ...arrayQuestion,
              isFreeForm: true,
            };
          }
          questionArray.push(arrayQuestion);
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

  /** event handlers */

  function titleChangeHandler(e: any) {
    console.log(e.target.value);
    setTemplateTitle((title) => e.target.value);
  }

  /* onChange handler for text input */
  function createQuestionChangeHandler(
    e: any,
    categoryId: string,
    value: string
  ) {
    if (value) {
      if (value.length > 2) {
        setNewQuestionState((newQuestionState) => {
          return {
            ...newQuestionState,
            value: e.target.value,
            categoryId: categoryId,
          };
        });
      }

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

  /** validator for checking data before sending */
  const validator = (obj: any) => {
    let values = Object.values(obj);
    console.log(values); //debugging
    for (const v in values) {
      if (v === "" || v === undefined) {
        return false;
      } else return true;
    }
  };

  /** submit function for new question  */
  function createQuestion() {
    console.log("adding question", newQuestionState); //debugging
    if (validator(newQuestionState)) {
      let newQuestion: IQuestionPost = {
        category: newQuestionState.categoryId,
        question: { lang: "Eng", question: newQuestionState.value },
        type: newQuestionState.type,
      };
      addQuestion(newQuestion).then((res) => {
        console.log("Question sent successfully:", res);
      });
    } else alert("Unable to send, incomplete data");
  }

  /* onChange event handler for selecting questions to be added to template  */
  function checkboxChangeHandler(
    e: any,
    categoryId: string, //passed from mapped all-category values
    questionId: string
  ) {
    let checkboxStateCopy = { ...activeCheckboxState };
    console.log(checkboxStateCopy); //debugging
    let questionArray: string[];
    /** initialise array with pre-selected questions  */
    if (checkboxStateCopy[categoryId]) {
      questionArray = checkboxStateCopy[categoryId];
      console.log(checkboxStateCopy); //debugging
    } else {
      checkboxStateCopy = { ...checkboxStateCopy, [categoryId]: [] };
      questionArray = [];
      console.log(checkboxStateCopy); //debugging
    }

    if (e.target.checked) {
      questionArray.push(e.target.value);
    } else {
      console.log(questionArray);
      questionArray = questionArray.filter((item) => item !== e.target.value);
    }

    if (Object.keys(checkboxStateCopy).length) {
      console.log("keys found");
    } else {
      console.log("no keys in the object");
    }

    for (const key of Object.keys(checkboxStateCopy)) {
      if (key === categoryId) {
        return { ...checkboxStateCopy, key: questionArray }; //overwrite array
      } else {
        checkboxStateCopy = {
          ...checkboxStateCopy,
          [categoryId]: questionArray,
        };
      }
      console.log(checkboxStateCopy);
      return checkboxStateCopy;
    }

    console.log("altering array of", categoryId, "to:", questionArray);
    dispatch(updateTemplateSelection(checkboxStateCopy));
  }

  /* onSubmit handler for saving template to db  */
  async function saveTemplate(e: any) {
    e.preventDefault();

    //need to convert activeCheckboxState to db-friendly form
    console.log(activeCheckboxState);
    let categoryArray: ICategoryPost[] = [];
    let categoryIds = Object.keys(activeCheckboxState);
    categoryIds.forEach((id) => {
      let questionArray = activeCheckboxState[id];
      let categoryObject = { category: id, questions: questionArray };
      categoryArray.push(categoryObject);
    });
    console.log(categoryArray);

    let newTemplate: ITemplatePost = {
      templateTitle: templateTitle,
      instructions: preface,
      categories: categoryArray,
    };
    /*  await addTemplate(newTemplate).then((res) => {
      console.log(res); */
    // }); //this may need to return the created id of saved template? (in case of needing to set as default/active)
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
    if (categories?.length) {
      let accordionCopy = [...accordion];
      for (let i = 0; i < categories.length; i++) {
        accordionCopy.push({ open: false });
      }
      setAccordion((accordion) => [...accordionCopy]);
    }
    //eslint-disable-next-line
  }, [categories]);

  /* for rendering active template questions */
  useEffect(() => {
    console.log(activeTemplate);
    if (activeTemplate?.categories.length) {
      console.log('categories:',activeTemplate?.categories)
      makeActiveCategoryObject(activeTemplate);
    }

    //eslint-disable-next-line
  }, [activeTemplate]);

  /* for rendering active template title */
  useEffect(() => {
    if (activeTemplate?.templateTitle) {
      setTemplateTitle((title) => activeTemplate.templateTitle);
    }
    //eslint-disable-next-line
  }, [activeTemplate]);

  return (
    <div className={"container"}>
      <h1>New feedback template</h1>
      <form className={"form"}>
        <div className={"formRow"}>
          <label htmlFor="templateTitle">
            <h3 className={"h3"}>Template title</h3>
          </label>
        </div>
        <div className={"formRow"}>
          <input
            className={"input"}
            name="templateTitle"
            value={templateTitle}
            onChange={titleChangeHandler}
          />{" "}
          <div className={"iconDiv"}>
            <span className={"materialIcons"}>edit</span>
          </div>
        </div>
        <section>
          <div className={"formRow"}>
            <label htmlFor="preface">
              <h3 className={"h3"}>Introductory text</h3>
            </label>
            <span>Non-editable text</span>
          </div>
          <div className={`${"noedit"} ${"preface"}`}>{preface}</div>
        </section>
        {/* END SECTION */}
        <section>
          <div className={"formRow"}>
            <label htmlFor="gradingGuidance">
              <h3 className={"h3"}>Grading Guidance</h3>
            </label>
            <span>Non-editable text</span>
          </div>
          <div className={`${"noedit"} ${"preface"}`}>{gradingGuidance}</div>
        </section>
        {/* END SECTION */}
        <div className={"formRow"}>
          <h3 className={"h3"}>Feedback Questions</h3>
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
                //activeCategories={activeCheckboxState}
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
        <div className={"formRow"}>
          <button
            className={"greenButton"}
            type="submit"
            onClick={saveTemplate}
          >
            Save
          </button>
          <button type="button">Preview</button>
        </div>
      </form>
    </div>
  );
};

export default Template;
