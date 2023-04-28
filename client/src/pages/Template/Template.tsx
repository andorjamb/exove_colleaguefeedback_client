//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Types
import { ITemplate, ICat_Quest } from "../../types/template";
import { IQuestionLang, IQCategory, IQuestion } from "../../types/questions";

//Styling
import styles from "./Template.module.css";

import { questionData } from "../../testdata/testQuestionData";

const Template = () => {
  let templates: ITemplate[] = []; /** fetch templates:ITemplates[] from db  */
  const templateEndpoint: string = "http://localhost:4000/template";

  const loggedIn = useSelector((state: any) => state.header.loggedIn);
  console.log(loggedIn);
  const [currentTemplate, setCurrentTemplate] = useState<ITemplate>();

  const [accordion, setAccordion] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  async function getTemplates() {
    await axios.get(templateEndpoint).then((res) => console.log(res));
  }

  function changeHandler(e:any){

  }

  function submitHandler() {
    const body = currentTemplate;
    axios.post(templateEndpoint, body);
  }

  function toggleAccordion(i: number) {
    setAccordion((accordion) => [...accordion, (accordion[i] = !accordion[i])]);
    console.log("current accordion index:", i, accordion[i]); //debugging
  }

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className={styles.container}>
      <h1>New feedback template</h1>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <h3 className={styles.h3}>Template title</h3>
        </div>
        <div className={styles.formRow}>
          <input className={styles.input} />
        </div>
        <div className={styles.formRow}>
          <h3 className={styles.h3}>Instruction text</h3>
          <label>Prefill with:</label>
          <select className={styles.select}>
            <option value="" disabled selected>
              select template
            </option>
            {templates?.map((item) => (
              <option>{item.templateTitle}</option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <textarea className={styles.input} />
        </div>
        <div className={styles.formRow}>
          <h3 className={styles.h3}>Select questions</h3>
          <label>Prefill with:</label>
          <select className={styles.select}>
            <option value="" disabled selected>
              select template
            </option>
          </select>
        </div>
        {/* ACCORDION */}
        {questionData.map((item, i) => (
          <div className={styles.accordionContainer} key={i}>
            <div className={styles.accordionItem}>
              <div className={styles.accordionTitle}>
                <span
                  className={styles.materialIcons}
                  onClick={() => toggleAccordion(i)}
                >
                  {accordion[i] ? "remove" : "add"}
                </span>
                {item.category}
              </div>

              {accordion[i] ? (
                <ul className={styles.accordionContent}>
                  {questionData[i].questions.map((q) => (
                    <li>
                      <label>
                        <input type="checkbox" />
                        {q}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
        <button type="submit" onClick={submitHandler}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Template;
