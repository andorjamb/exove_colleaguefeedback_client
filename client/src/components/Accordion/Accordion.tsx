import React from "react";
import { ISection } from "../../types/template";

import styles from "../../pages/Template/Template.module.css";

interface Props {
  item: ISection;
  clickHandler: any;
  //(event:React.MouseEventHandler<HTMLSpanElement>, i:number) => void;
  isOpen: boolean;
  questionChangeHandler: (
    event: React.MouseEventHandler<HTMLFieldSetElement>,
    i: number
  ) => void;
  addQuestion: () => void;
}

const Accordion = ({
  item,
  clickHandler,
  isOpen,
  questionChangeHandler,
  addQuestion,
}: Props) => {
  return (
    <div>
      <div className={styles.accordionContainer}>
        <div className={styles.accordionItem}>
          <div className={styles.accordionTitle}>
            <span className={styles.materialIcons} onClick={clickHandler}>
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
                          <input type="checkbox" />
                          {q.question + " (1-5)"}
                        </label>
                      ) : (
                        <label>
                          <input type="checkbox" />
                          {q.question + " (free form)"}
                        </label>
                      )}
                    </li>
                  ))}
                </fieldset>
              </ul>
              <button
                type="button"
                className={styles.addButton}
                onClick={addQuestion}
              >
                Add Question Here
              </button>
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
