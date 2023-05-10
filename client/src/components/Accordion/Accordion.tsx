//React
import React from "react";

//Styles
import styles from "../../pages/Template/Template.module.css";

//Types
import { ISection, ITemplateQuestion } from "../../types/template";

interface Props {
  category: ISection;
  activeCategories: any;
  clickHandler: any;
  isOpen: boolean;
  checkboxChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    cat: string,
    id: string
  ) => void;
  createQuestionChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    cat: string,
    value: string
    // type: string
  ) => void;
  createQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Accordion = ({
  category,
  activeCategories,
  clickHandler,
  isOpen,
  checkboxChangeHandler,
  createQuestionChangeHandler,
  createQuestion,
}: Props) => {
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
                <fieldset className={styles.fieldset}>
                  {category.questions?.map((q) => (
                    <li key={q.id}>
                      {!q?.isFreeForm ? (
                        <label>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              checkboxChangeHandler(e, category.id, q.id)
                            }
                            name="questions"
                            value={q.id}
                            id={q.id}
                            defaultChecked={
                              activeCategories[category.id]
                                ? activeCategories[category.id].includes(q.id)
                                : {}
                            }
                            className={styles.input}
                          />
                          {q?.question + " (1-5)"}
                        </label>
                      ) : (
                        <label>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              checkboxChangeHandler(e, category.id, q.id)
                            }
                            name="questions"
                            id={q.id}
                            defaultChecked={
                              activeCategories[category.id]
                                ? activeCategories[category.id].includes(q.id)
                                : {}
                            }
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
                /*  onBlur={(e) =>
                  createQuestionChangeHandler(e, category.id, e.target.value)
                } */
              >
                <legend>Create new question in this category:</legend>
                <input
                  className={styles.input}
                  name="newQuestion"
                  type="text"
                  onBlur={(e) =>
                    createQuestionChangeHandler(e, category.id, e.target.value)
                  }
                />
                <label>
                  <input
                    type="checkbox"
                    name="newQuestion"
                    className={styles.input}
                    onChange={(e) =>
                      createQuestionChangeHandler(
                        e,
                        category.id,
                        e.target.value
                      )
                    }
                  />
                  Question is free form
                </label>
                <button
                  type="button"
                  onClick={createQuestion}
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
