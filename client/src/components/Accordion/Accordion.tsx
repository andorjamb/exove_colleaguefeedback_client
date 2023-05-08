//React
import React from "react";

//Styles
import styles from "../../pages/Template/Template.module.css";

//Types
import { ISection, ITemplateQuestion } from "../../types/template";

interface Props {
  category: ISection;
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

const Accordion = ({
  category,
  clickHandler,
  isOpen,
  questionChangeHandler,
  createQuestion,
}: Props) => {
  /** new dataform in template:
   *
   * categories: [{
   *    id: string,
   *    name: string,
   *    questions: [{id: string, question: string, isFreeForm: boolean}, {},{}]
   *    },
   *    {},
   *    {}
   *  ]
   *
   */
  return (
    <div>
      <div className={styles.accordionContainer}>
        <div className={styles.accordionItem}>
          <div className={styles.accordionTitle} onClick={clickHandler}>
            <span className={styles.materialIcons}>
              {isOpen ? "remove" : "add"}
            </span>
            {category?.name}
          </div>

          {isOpen ? (
            <>
              <ul className={styles.accordionContent}>
                <fieldset
                  name=""
                  className={styles.fieldset}
                  onChange={() => questionChangeHandler}
                >
                  {category.questions?.map((q) => (
                    <li>
                      {!q?.isFreeForm ? (
                        <label>
                          <input
                            type="checkbox"
                            /* defaultChecked={category.questions.indexOf(q) !== -1} */
                            className={styles.input}
                          />
                          {q?.question + " (1-5)"}
                        </label>
                      ) : (
                        <label>
                          <input
                            type="checkbox"
                            /*   defaultChecked={category.questions.indexOf(q) !== -1} */
                            className={styles.input}
                          />
                          {q?.question + " (free form)"}
                        </label>
                      )}
                    </li>
                  ))}
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
