//React
import React from "react";
import { useSelector } from "react-redux";

//Styles
import styles from "../../pages/Template/Template.module.css";
import "../../pages/Template/Template.css";

//Types
import { ISection } from "../../types/template";

//Translations
import "../../translations/i18next";
import { useTranslation } from "react-i18next";

interface Props {
  category: ISection; //all available categories, all questions per category
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
  ) => void;
  createQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Accordion = ({
  category,
  clickHandler,
  isOpen,
  checkboxChangeHandler,
  createQuestionChangeHandler,
  createQuestion,
}: Props) => {
  const { t } = useTranslation(["template"]);
  const activeCategories = useSelector(
    (state: any) => state.template.templateSelection
  );
  console.log("accordion category prop:", category);
 // console.log("id of accordion category prop:", category.id);


/*  let answer = activeCategories[category.id].findIndex(
    (el: any) => el.id === "746c6638-e3b3-41ee-8f5c-8dc09b3cff21"
  );
  console.log("test:", answer); //debugging */ 

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
                <h3 className={styles.howTo}>{t("howTo")}</h3>
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
                              true
                              /*  activeCategories[category.id] ? activeCategories[category.id].includes(q._id)
                                : false */
                            }
                            className={styles.input}
                          />
                          {q?.question + " (1-5)"}
                        </label>
                      ) : (
                        <label>
                          <input
                            type="checkbox"
                            value={q.id}
                            onChange={(e) =>
                              checkboxChangeHandler(e, category.id, q.id)
                            }
                            name="questions"
                            id={q.id}
                            defaultChecked={
                              activeCategories[category.id]
                                ? activeCategories[category.id].includes(q.id)
                                : false
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
                  className={styles.greenButton}
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
