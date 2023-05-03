/** For creating conversions from mongoose json objects to json objects for frontend */
import {
  ICat_Quest,
  ITemplate,
  IQuestion,
  ITemplateQuestion,
  ISection,
} from "../types/template";
import axios from "axios";

/*backend category interfaces */
export interface IQCategory {
  _id: string;
  categoryName: string;
  description?: string;
  questions?: string[];
  createdOn: Date;
  createdBy: string;
  categoryStatus: boolean;
}

/* export interface IQuestion {
    _id: string;
    category: string;  //category id
    createdOn: Date;
    createdBy: string;
    active: boolean;
    type: string;
    question: IQuestionLang[];
  } */

/* backend question interface */
export interface IQuestionLang {
  _id: string; //assume this is doc id, not the same as IQuestion parent id?
  lang: string;
  question?: string; //actual question
  answer?: string;
  answeredOn?: Date;
}

/////////// classes  ////////////

class TemplateQuestionClass {
  id: string;
  question: string;
  isFreeForm: boolean;

  constructor(id: string, question: string, isFreeForm: boolean) {
    this.id = id;
    this.question = question;
    this.isFreeForm = isFreeForm;
  }
}

class SectionClass {
  id: string;
  name: string;
  questions: ITemplateQuestion[];

  constructor(id: string, name: string, questions: ITemplateQuestion[]) {
    this.id = id;
    this.name = name;
    this.questions = questions;
  }
}

class TemplateClass {
  id: string;
  templateTitle: string;
  sections: ISection[];
  active: boolean;

  constructor(
    id: string,
    templateTitle: string,
    sections: ISection[],
    active: boolean
  ) {
    this.id = id;
    this.templateTitle = templateTitle;
    this.sections = sections;
    this.active = active;
  }
}

//////// conversion functions ////////////
export const convertTemplate = async (template: ITemplate) => {
  let newSectionArray: ISection[];

  let newTemplate = new TemplateClass(
    template._id,
    template.templateTitle,
    [],
    true
  );

  const allCategories: IQCategory[] = await fetchCategories();

  //get each question assigned to this question category in db
  const populateSection = (section: ISection) => {
    allCategories.forEach((category: IQCategory) => {
      let newQuestionArray: ITemplateQuestion[];
      let questionIds: string[] | undefined = category?.questions;

      questionIds?.forEach(async (id) => {
        let question: IQuestion = await fetchQuestion(id);
        let newQuestion = new TemplateQuestionClass(question._id, "", false);
        if (question.type === "String" || "string") {
          newQuestion.isFreeForm = true;
        }
        question.question.forEach((q) => {
          if (q.lang === "en") {
            if (q.question) {
              newQuestion.question = q.question;
            }
          }
        });
        newQuestionArray.push(newQuestion);
        section.questions = newQuestionArray; //
      });
    });
  };

  allCategories.forEach((category: IQCategory) => {
    let newSection: ISection = new SectionClass(
      category._id,
      category.categoryName,
      []
    );
    populateSection(newSection);
    newSectionArray.push(newSection);
  });
};

export const fetchCategories = async () => {
  let result = await axios.get<IQCategory[]>(
    `${process.env.REACT_APP_SERVER_API}/category`
  );
  let dbCategories = result.data;
  console.log(dbCategories);
  return dbCategories;
};

export const fetchQuestion = async (id: string) => {
  let result = await axios.get<IQuestion>(
    `${process.env.REACT_APP_SERVER_API}/question/${id}`
  );
  return result.data;
};
