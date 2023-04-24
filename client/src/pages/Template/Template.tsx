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
  const plus: string = "../../assets/plus.png";
  const minus: string = "../../assets/minus.png";

  const questionData: ICat_Quest[] = [
    /** sample data for testing */
    {
      category: "Quality Focus",
      questions: [
        "The person produces high quality product",
        "The person aims to improve the quality of the end result beyond expressed requirements (1 - 5)",
      ],
    },
    { category: "People Skills", questions: [""] },
  ];

  async function getTemplates() {
    await axios.get(templateEndpoint).then((res) => console.log(res.data()));
  }

  function expandAccordion(){
    
  }

  useEffect(() => {
    getTemplates();
  }, []);

  const [accordion, setAccordion] = useState([false, false, false, false]);

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
            {" "}
            <option value="" disabled selected>
              select template
            </option>
          </select>
        </div>

        <div className={styles.accordion}>
          <div className="accordion-item">
            <div className="accordion-title">
              <div></div>
              <div>
                <img src={accordion[0] ? minus : plus} alt="" />
              </div>
            </div>
            <div className="accordion-content"></div>
          </div>
        </div>

        <div className={styles.accordion}></div>
        <div className={styles.accordion}></div>
        <div className={styles.accordion}></div>
      </form>
    </div>
  );
};

export default Template;
