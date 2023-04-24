//React
import React, { useState, useEffect } from "react";
import axios from "axios";

//Types
import { ITemplates, ICat_Quest } from "../../types/templates";

//Styling
import styles from "./Template.module.css";

const Template = () => {
  let templates: ITemplates[] = []; /** fetch templates:ITemplates[] from db  */
  const templateEndpoint: string = "";

  const [accordion, setAccordion] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const questionData: ICat_Quest[] = [
    /** sample data for testing */
    {
      category: "Quality Focus",
      questions: [
        "The person produces high quality product",
        "The person aims to improve the quality of the end result beyond expressed requirements (1 - 5)",
      ],
    },
    {
      category: "People Skills",
      questions: [
        "The person communicates effectively",
        "The person shows awareness and respect of colleagues",
      ],
    },
    { category: "Self Guidance", questions: [""] },
  ];

  async function getTemplates() {
    await axios.get(templateEndpoint).then((res) => console.log(res.data()));
  }

  function toggleAccordion(e: any, i: number) {
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
        {questionData.map((item, i) => (
          <div className={styles.accordionContainer}>
            <div className="accordion-item" key={i}>
              <div className={styles.accordionTitle}>
                <span
                  className={styles.materialIcons}
                  onClick={(e) => toggleAccordion(e, i)}
                >
                  {accordion[i] ? "remove" : "add"}
                </span>
                {item.category}
              </div>
              <div className={styles.accordionContent}></div>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Template;
