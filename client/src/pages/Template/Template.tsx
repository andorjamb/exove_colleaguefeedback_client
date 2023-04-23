//React
import React, { useState } from "react";

//Types
import { ITemplates, ICat_Quest } from "../../types/templates";

//Styling
import styles from "./Template.module.css";

const Template = () => {
  let templates: ITemplates[] = []; /** fetch templates:ITemplates[] from db  */
  const [accordion, setAccordion] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  return (
    <div className={styles.container}>
      <h1>New feedback template</h1>
      <form className={styles.form}>
        <div className={styles.formRow}>
          <h3 className={styles.h3}>Template title</h3>
          <select className={styles.select}>
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
          <select className={styles.select}>
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
          <select className={styles.select}></select>
        </div>
        <div className={styles.accordion}></div>
        <div className={styles.accordion}></div>
        <div className={styles.accordion}></div>
        <div className={styles.accordion}></div>
      </form>
    </div>
  );
};

export default Template;
