//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Types
import { ITemplate } from "../../types/template";

//Styling
import styles from "./Template.module.css";

import { testTemplateData } from "../../testdata/testTemplateData";
import { useGetAllTemplatesQuery } from "../../features/templateApi";
import { preface } from "./preface";
import { gradingGuidance } from "./instructions";
import { prefilledQuestionText } from "./instructions";
/**
 * API ROUTES
  get('/template', getTemplates); //Get all templates
  get('/template/active', getTemplate); // get current active template
  post('/template', addTemplate);
  patch('/template/:id', setDefaultTemplate); // set template as default setting all other not default
 * 
 * 
 */

const Template = () => {
  let templates: ITemplate[] = []; /** fetch templates:ITemplates[] from db  */
  const devEndpoint: string = "http://localhost:4000/template";
  //const prodEndpoint: string = process.env.REACT_APP_SERVER_URL;

  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);

  const { data, isLoading } = useGetAllTemplatesQuery();

  const navigate = useNavigate();

  const [currentTemplate, setCurrentTemplate] = useState<ITemplate>({
    templateTitle: "",
    preface: [""],
    prefilledQuestions: [""],
    gradingGuidance: [""],
    sections: [{ name: "", questions: [{ question: "", isFreeForm: false }] }],
  });

  const [accordion, setAccordion] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  function changeHandler(e: any) {
    console.log(e.target.value);
    setCurrentTemplate((currentTemplate) => ({
      ...currentTemplate,
      [e.target.name]: e.target.value,
    }));
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    const body = currentTemplate;
    console.log(currentTemplate); //debugging
    //await axios.post(devEndpoint, body);
  }

  function toggleAccordion(i: number) {
    setAccordion((accordion) => [...accordion, (accordion[i] = !accordion[i])]);
    console.log("current accordion index:", i, accordion[i]); //debugging
  }

  function addQuestion() {}

  useEffect(() => {
    if (isAdmin) {
      return console.log("test isAdmin");
    } /* else {
      navigate("/"); 
    }*/
  }, [isAdmin]);

  return (
    <div className={styles.container}>
      <h1>New feedback template</h1>
      <form className={styles.form} onChange={changeHandler}>
        <div className={styles.formRow}>
          <label htmlFor="templateTitle">
            <h3 className={styles.h3}>Template title</h3>
          </label>
        </div>
        <div className={styles.formRow}>
          <input
            className={styles.input}
            name="templateTitle"
            defaultValue={testTemplateData.templateTitle}
          />
        </div>
        <section>
          <div className={styles.formRow}>
            <label htmlFor="preface">
              <h3 className={styles.h3}>Instruction text</h3>
            </label>
          </div>
          <div className={styles.formRow}>
            <textarea
              name="preface"
              className={`${styles.input} ${styles.preface}`}
              defaultValue={preface.join("\r\n")}
            />
          </div>
        </section>
        <section>
          <div className={styles.formRow}>
            <label htmlFor="prefilledQuestions">
              <h3 className={styles.h3}>Prefilled Questions</h3>
            </label>
          </div>
          <textarea
            name="prefilledQuestions"
            className={styles.input}
            defaultValue={prefilledQuestionText}
          ></textarea>
          {testTemplateData?.prefilledQuestions.map((item) => (
            <input className={styles.input} defaultValue={item} />
          ))}
          <button type="button" onClick={addQuestion}>
            Add Question Here
          </button>
        </section>
        {/* END SECTION */}
        <section>
          <label htmlFor="gradingGuidance">
            <h3 className={styles.h3}>Grading Guidance</h3>
          </label>
          <textarea
            name="gradingGuidance"
            className={`${styles.input} ${styles.preface}`}
            defaultValue={gradingGuidance.join("\r\n")}
          />
        </section>
        {/* END SECTION */}

        <div className={styles.formRow}>
          <h3 className={styles.h3}>Feedback Questions</h3>
          <label>Prefill with:</label>
          <select className={styles.select}>
            <option>select template</option>
          </select>
        </div>
        {/* ACCORDIONS */}
        {testTemplateData?.sections.map((item, i) => (
          <div className={styles.accordionContainer} key={i + item.name}>
            <div className={styles.accordionItem}>
              <div className={styles.accordionTitle}>
                <span
                  className={styles.materialIcons}
                  onClick={() => toggleAccordion(i)}
                >
                  {accordion[i] ? "remove" : "add"}
                </span>
                {item.name}
              </div>

              {accordion[i] ? (
                <ul className={styles.accordionContent}>
                  {testTemplateData?.sections[i].questions?.map((q) => (
                    <li>
                      {!q.isFreeForm ? (
                        <label>
                          <input type="checkbox" />
                          {q.question}
                        </label>
                      ) : (
                        <>
                          <div>
                            <label> {q.question}</label>
                          </div>
                          <div>
                            <input className={styles.input} type="text" />
                          </div>
                        </>
                      )}
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
        <button type="button">Preview</button>
      </form>
    </div>
  );
};

export default Template;
