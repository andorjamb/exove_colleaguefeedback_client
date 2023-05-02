/** For creating conversions from mongoose json objects to json objects matching frontend data requirements */
import { ICat_Quest, ITemplate, IQuestion } from "../types/template";

/** interfaces in frontend format */
interface ISection {
  name: string;
  questions: IQuestion[];
}

interface ITemplateQuestion {
  question: string;
  isFreeForm: boolean;
}
///////////

class SectionClass {
  name: string;
  questions: IQuestion[];

  constructor(name: string, questions: IQuestion[]) {
    this.name = name;
    this.questions = questions;
  }
}

class TemplateClass {
  templateTitle: string;
  //preface: string[];
  //gradingGuidance: string[];
  sections: ISection[];
  active: boolean;

  constructor(
    templateTitle: string,
    //preface: string[],
    //gradingGuidance: string[],
    sections: ISection[],
    active: boolean
  ) {
    this.templateTitle = templateTitle;
    //this.preface = preface;
    //this.gradingGuidance = gradingGuidance;
    this.sections = sections;
    this.active = active;
  }
}

export const convertTemplate = (template: ITemplate) => {
  const newTemplate = new TemplateClass(
    template.templateTitle,
    convertCategories(template.categories),
    template.active
  );

  /* functions for preparing large text blocks so they can be more easily displayed in components. we can join them back together when saving to db.  */
  /*  function toStringArray(string: string) {
    let arr;
    arr = string.split("/n");
  } */
};

//QUESTION TO SELF: do you want to run the converter on the whole array or feed each array item to the converter?

//convert each 'category' item to a 'section' item and push to new array, which will become 'sections' in converted template
export const convertCategories = (categories: ICat_Quest[]) => {
  //parameter will be template.categories (an array)
  let newArray: ISection[] = [];
  let newItem;
  categories.forEach((item) => {
    newItem = new SectionClass(item.category, item.questions);
    newArray.push(newItem);
  });
  return newArray;
};

export const convertQuestion = (question: IQuestion) => {};
