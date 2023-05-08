import React from "react";
import {
  IQuestion,
  IQuestionLang,
  ICategoryGet,
  IQCategory,
} from "../../types/template";

import styles from "../../pages/Template/Template.module.css";

interface Props {
  category: IQCategory;
  questions: IQuestion[] | undefined;
  clickHandler: any;
  isOpen: boolean;
  questionChangeHandler: (
    event: React.MouseEventHandler<HTMLFieldSetElement>,
    i: number,
    id: string
  ) => void;
  createQuestion: (
    event: React.MouseEventHandler<HTMLButtonElement>,
    id: string
  ) => void;
}

type correctedQuestion = {
  id: string;
  question: string;
  isFreeForm: boolean;
};

const Accordion = ({
  category,
  questions,
  clickHandler,
  isOpen,
  questionChangeHandler,
  createQuestion,
}: Props) => {
  let newQuestion: correctedQuestion;
  

  let questionArray: IQuestion[] = [];
  questions?.forEach((question) => {
    if (question.category === category._id) {
      questionArray.push(question);
    }
  });
  console.log("accordion question array:", questionArray[0]);

  function questionParser() {}

  function correctType(type: string) {
    const types: string[] = ["Number", "number", "String", "string"];
    if (types.includes(type)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      <div className={styles.accordionContainer}>
        <div className={styles.accordionItem}>
          <div className={styles.accordionTitle} onClick={clickHandler}>
            <span className={styles.materialIcons}>
              {isOpen ? "remove" : "add"}
            </span>
            {category?.categoryName}
            {category?._id}
          </div>

          {isOpen ? (
            <>
              <ul className={styles.accordionContent}>
                <fieldset
                  name=""
                  className={styles.fieldset}
                  onChange={() => questionChangeHandler}
                >
                  {questionArray.map((q) =>
                    q.question.map((item) => item.question)
                  )}
                </fieldset>
              </ul>
              <fieldset
                className={`${styles.fieldset} ${styles.accordionContent}`}
              >
                <legend>Create new question in this category:</legend>
                <input className={styles.input} />
                <label>
                  <input
                    type="checkbox"
                    value="freeForm"
                    className={styles.input}
                  />
                  Question is free form
                </label>
                <button
                  type="button"
                  onClick={() => createQuestion}
                  className={styles.addQuestionButton}
                >
                  Add
                </button>
              </fieldset>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
