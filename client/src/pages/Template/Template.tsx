//React
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

//Types
import {
  ITemplate,
  IQuestion,
  IQuestionLang,
  IConvertedTemplate,
  ITemplateQuestion,
} from "../../types/template";

//Styling
import styles from "./Template.module.css";

//Internal imports
import { testTemplateData } from "../../testdata/testTemplateData";
import { preface } from "./preface";
import { gradingGuidance } from "./gradingGuidance";
import { convertTemplate } from "../../functions/templateConverter";

//Components
import Accordion from "../../components/Accordion/Accordion";
/**
 * API ROUTES
  get('/template', getTemplates); ------------------Get all templates
  get('/template/active', getTemplate);  ----------------get current active template
  post('/template', addTemplate);  ------------- save template to db
  patch('/template/:id', setDefaultTemplate); ------ set template as default, all others as not default 
 */
type accordion = {
  open: boolean;
};

let convertedTemplateData: IConvertedTemplate;

const Template = () => {
  const loggedIn = useSelector((state: any) => state.auth.loggedIn);
  const isAdmin = useSelector((state: any) => state.auth.isAdmin);
  const navigate = useNavigate();

  const [serverData, setServerData] = useState<ITemplate>();
  const [questionState, setQuestionState] = useState([]);
  const [accordion, setAccordion] = useState<accordion[]>([{ open: false }]);

  const [currentTemplate, setCurrentTemplate] = useState<IConvertedTemplate>({
    id: "",
    templateTitle: "",
    sections: [
      {
        id: "",
        name: "",
        questions: [
          {
            id: "",
            question: "",
            isFreeForm: false,
          },
        ],
      },
    ],
    active: true,
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
    console.log(currentTemplate); //debugging

    //await axios.post(prodEndpoint, body);
    //converter(body)
  }

  function toggleAccordion(e: any, i: number) {
    let currentValue = accordion[i].open;
    setAccordion((accordion) => {
      return accordion.map((item) => {
        return accordion.indexOf(item) === i
          ? { ...item, open: !currentValue }
          : item;
      });
    });
  }

  function createQuestion() {
    let newRow: ITemplateQuestion = {
      id: "",
      question: "",
      isFreeForm: false,
    };
  }

  useEffect(() => {
    if (loggedIn && isAdmin) {
      console.log("test isAdmin"); //debugging
    } /* else {
      navigate("/"); 
    }*/
    //eslint-disable-next-line
  }, [isAdmin]);

  /* active template data loaded from db is set in state */
  useEffect(() => {
    axios
      .get<ITemplate>(`${process.env.REACT_APP_SERVER_API}/template/active`)
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setServerData(res.data);
      });
  }, []);

  useEffect(() => {
    if (serverData) {
      console.log(serverData);
      //const convertedTemplate: IConvertedTemplate = convertTemplate(serverData);
      //setCurrentTemplate((state) => convertedTemplate);
    }
  }, [serverData]);

  return (
    <div className={styles.container}>
      <h1>New feedback template</h1>
      <form className={styles.form}>
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
            onChange={changeHandler}
          />{" "}
          <div className={styles.iconDiv}>
            <span className={styles.materialIcons}>edit</span>
          </div>
        </div>
        <section>
          <div className={styles.formRow}>
            <label htmlFor="preface">
              <h3 className={styles.h3}>Introductory text</h3>
            </label>
            <span>Non editable text</span>
          </div>
          <div className={`${styles.noedit} ${styles.preface}`}>{preface}</div>
        </section>
        {/* END SECTION */}
        <section>
          <div className={styles.formRow}>
            <label htmlFor="gradingGuidance">
              <h3 className={styles.h3}>Grading Guidance</h3>
            </label>
            <span>Non editable text</span>
          </div>
          <div className={`${styles.noedit} ${styles.preface}`}>
            {gradingGuidance}
          </div>
        </section>
        {/* END SECTION */}
        <div className={styles.formRow}>
          <h3 className={styles.h3}>Feedback Questions</h3>
        </div>
        {/* ACCORDIONS */}
        {convertedTemplateData?.sections.map((item, i) => (
          <Accordion
            key={i}
            item={item}
            clickHandler={(e: any) => toggleAccordion(e, i)}
            isOpen={accordion[i].open}
            questionChangeHandler={questionChangeHandler}
            addQuestion={createQuestion}
          />
        ))}
        <div className={styles.formRow}>
          {" "}
          <button type="submit" onClick={submitHandler}>
            Save
          </button>
          <button type="button">Preview</button>
        </div>
      </form>
    </div>
  );
};

export default Template;
