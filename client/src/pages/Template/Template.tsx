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
import { gradingGuidance } from "./instructions";
import { prefilledQuestionText } from "./instructions";
import Accordion from "../../components/Accordion/Accordion";
/**
 * API ROUTES
  get('/template', getTemplates); //Get all templates
  get('/template/active', getTemplate); // get current active template
  post('/template', addTemplate);
  patch('/template/:id', setDefaultTemplate); // set template as default setting all other not default 
 */
type accordion = {
  open: boolean;
};

const Template = () => {
  let templates: ITemplate[] = []; /** fetch templates:ITemplates[] from db  */

  //const prodEndpoint: string = process.env.REACT_APP_SERVER_API;
  //should fetch 'active' template and use for default values?
  //

  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const [questionState, setQuestionState] = useState([]);
  const [accordion, setAccordion] = useState<accordion[]>([
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
    { open: false },
  ]);

  const { data, isLoading } = useGetAllTemplatesQuery();

  const navigate = useNavigate();

  const [currentTemplate, setCurrentTemplate] = useState<ITemplate>({
    templateTitle: "",
    preface: [""],
    prefilledQuestionText: [""],
    prefilledQuestions: [""],
    gradingGuidance: [""],
    sections: [{ name: "", questions: [{ question: "", isFreeForm: false }] }],
    active: false,
  });

  function changeHandler(e: any) {
    console.log(e.target.value);
    setCurrentTemplate((currentTemplate) => ({
      ...currentTemplate,
      [e.target.name]: e.target.value,
    }));
  }

  function questionChangeHandler(e: any, i: number) {
    let items = [...questionState];
    //items[i][e.target.name] = e.target.value;
    setQuestionState(items);
  }

  async function submitHandler(e: any) {
    e.preventDefault();
    const body = currentTemplate;
    console.log(body); //debugging
    console.log(currentTemplate); //debugging
    //await axios.post(devEndpoint, body);
    //converter(body)
  }

  function toggleAccordion(e: any, i: number) {
    let currentValue = accordion[i].open;
    setAccordion(
      (accordion) => {
        return accordion.map((item) => {
          return accordion.indexOf(item) === i
            ? { ...item, open: !currentValue }
            : item;
        });
      }
      /*   [
      ...accordion,
      (accordion[i] = { ...accordion[i], ...open = !currentValue}),
    ]*/
    );
    let current = accordion[i];
    console.log(current);

    console.log("current accordion index:", i, accordion); //debugging
  }

  function addQuestion() {}

  useEffect(() => {
    if (loggedIn && isAdmin) {
      return console.log("test isAdmin");
    } /* else {
      navigate("/"); 
    }*/
    //eslint-disable-next-line
  }, [isAdmin]);

  useEffect(() => {
    const activeTemplate = data?.filter((item) => item.active === true);
    console.log(activeTemplate); //debugging
  }, [data]);

  useEffect(() => {
    console.log(accordion);
  }, [accordion]);

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
              defaultValue={testTemplateData.preface.join("\r\n")}
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
          <button
            type="button"
            className={styles.addButton}
            onClick={addQuestion}
          >
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
          <Accordion
            key={i}
            item={item}
            clickHandler={(e: any) => toggleAccordion(e, i)}
            isOpen={accordion[i].open}
            questionChangeHandler={questionChangeHandler}
            addQuestion={addQuestion}
          />
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
