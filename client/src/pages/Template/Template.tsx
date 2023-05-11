//React
import React, { useState, useEffect } from "react";

//Types
import {
  ITemplatePost,
  ITemplateQuestion,
  IQuestionPost,
  ISection,
  ICategoryPost,
  IActiveTemplateGet,
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

//Components
import Accordion from "../../components/Accordion/Accordion";

type accordion = {
  open: boolean;
};

/* type activeCS = {
  category: string; //categoryid
  questions: string[]; //unclear whether this should be array of strings of array of IQuestionPost
}; */

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
  const getActiveTemplate = useGetActiveTemplateQuery();
  const getCategories = useGetAllCategoriesQuery();
  const getQuestions = useGetAllQuestionsQuery(); //IQuestion[]
  const { isLoading } = useGetAllQuestionsQuery();

  const [addQuestion] = useAddQuestionMutation();
  const [addTemplate] = useAddTemplateMutation();

  const [accordion, setAccordion] = useState<accordion[]>([]);
  const [templateTitle, setTemplateTitle] = useState<string>("");
  const [selectedQuestionState, setSelectedQuestionState] = useState<string[]>(
    []
  );
  const [catQuestState, setCatQuestState] = useState<ICategoryPost[]>([]);
  const [activeCheckboxState, setActiveCheckboxState] = useState<any>({});

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

  /** used to set default checked value of checkboxes, returns all active questions indexed by category  */
  function makeActiveCategoryObject(activeTemplate: any) {
    let activeCategoryObject = activeTemplate?.categories.reduce(
      (accumulator: any, currentValue: any) => {
        return {
          ...accumulator,
          ...{ [currentValue.category._id]: currentValue.questions },
        };
      },
      {}
    );
    return activeCategoryObject;
  }

  /** set initial state of accordion divs when categories are fetched */
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

  /** used to manipulate fetched template data into form useful for rendering  */
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
    console.log(value, " ", categoryId, " "); //debugging

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
    categoryId: string,
    questionId: string
  ) {
    console.log("cat_id: ", categoryId, "question_id: ", questionId); //debugging
    let questionArray = selectedQuestionState; //type string[] = [];
    /** need to get ALL checkbox items belonging to name 'questions'  */
    if (e.target.checked) {
      /** need to target only object belonging to current cat_id */
      questionArray.push(e.target.value);
    } else {
      questionArray = questionArray.filter((item) => item !== e.target.value);
    }
    setSelectedQuestionState((selectedQuestionState) => questionArray);

    const catQuestArray = catQuestState.map((obj) => {
      if (obj.category === categoryId) {
        return { ...obj, questions: questionArray };
      }
      console.log(obj);
      return obj;
    });
    // setCatQuestState(catQuestArray);

    let catObject: ICategoryPost = { category: categoryId, questions: [] };

    /*  setCatQuestState((catQuestState) => {
       return { ...catQuestState, category: categoryId, questions: [] };
      }); */
    //add new category with question array
  }

  /*[
    {
    category: category_id,
    questions: [] ? unclear whether this should be array of strings of array of IQuestionPost
  },{},
  
  ]
  */

  /* onSubmit handler for saving template to db  */
  async function saveTemplate(e: any) {
    e.preventDefault();
    let newTemplate: ITemplatePost = {
      templateTitle: templateTitle,
      instructions: preface,
      categories: catQuestState,
    };
    await addTemplate(newTemplate).then((res) => {
      console.log(res);
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

  /* for rendering active template title */
  useEffect(() => {
    if (activeTemplate?.templateTitle) {
      setTemplateTitle((title) => activeTemplate.templateTitle);
    }
  }, [activeTemplate]);

  /**dubugging purpose only */
  useEffect(() => {
    console.log("catQuestState:", catQuestState);
  }, [catQuestState]);

  /**dubugging purpose only */
  useEffect(() => {
    console.log("selectedQuestionState:", selectedQuestionState);
  }, [selectedQuestionState]);

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
