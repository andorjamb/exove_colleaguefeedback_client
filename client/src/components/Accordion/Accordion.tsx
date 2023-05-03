import React from "react";
import { ICat_Quest, IQuestion, IQuestionLang, ITemplate, ISection } from "../../types/template";

import styles from "../../pages/Template/Template.module.css";

interface Props {
  item: ISection;
  clickHandler: any;
  isOpen: boolean;
  questionChangeHandler: (
    event: React.MouseEventHandler<HTMLFieldSetElement>,
    i: number, id:string
  ) => void;
  createQuestion: (event: React.MouseEventHandler<HTMLButtonElement>,
    id:string) => void;
}

const Accordion = ({
  item,
  clickHandler,
  isOpen,
  questionChangeHandler,
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
            {item?.name}
          </div>

          {isOpen ? (
            <>
              <ul className={styles.accordionContent}>
                <fieldset
                  name=""
                  className={styles.fieldset}
                  onChange={() => questionChangeHandler}
                >
                  {item.questions?.map((q) => (
                    <li>
                      {!q.isFreeForm ? (
                        <label>
                          <input
                            type="checkbox"
                            defaultChecked={item.questions.indexOf(q) !== -1}
                            className={styles.input}
                          />
                          {q.question + " (1-5)"}
                        </label>
                      ) : (
                        <label>
                          <input
                            type="checkbox"
                            defaultChecked={item.questions.indexOf(q) !== -1}
                            className={styles.input}
                          />
                          {q.question + " (free form)"}
                        </label>
                      )}
                    </li>
                  ))}
                </fieldset>
              </ul>
              <fieldset
                className={`${styles.fieldset} ${styles.accordionContent}`}
              >
                <legend>Add new question</legend>
                <input className={styles.input} />
                <label>
                  <input
                    type="checkbox"
                    value="freeForm"
                    className={styles.input}
                  />
                  Check if question is free form
                </label>
                <button
                  type="button"
                  onClick={()=>createQuestion}
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
