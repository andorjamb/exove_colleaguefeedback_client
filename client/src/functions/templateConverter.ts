/** For creating conversions from mongoose json objects to json objects for frontend */
import {
  ITemplateGet,
  IQuestion,
  ITemplateQuestion,
  ISection,
} from "../types/template";

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

/////////// classes  ////////////

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

//////// conversion functions ////////////
export const convertTemplate = async (template: ITemplateGet) => {
  let categories: IQCategory[] = []; //error suppression purposes only
  let questions: IQuestion[] = [];
  type correctedQuestion = {
    id: string;
    question: string;
    isFreeForm: boolean;
  };
  let newQuestion: correctedQuestion;

  function correctType(p: string) {
    const values: string[] = ["Number", "number", "String", "string"];
    if (values.includes(p)) {
      return true;
    } else {
      return false;
    }
  }

  // loop through all categories
  // loop through all questions assigned to the category, rectify them and push to array
  // attach the array to a rectified category type

  categories.forEach((category) => {
    let questionArray: correctedQuestion[] = [];

    questions?.forEach((question) => {
      if (question.category === category._id && correctType(question.type)) {
        if (question.type.startsWith("s".toLowerCase())) {
          newQuestion = {
            id: question._id,
            question: question.question[0].question as string,
            isFreeForm: true,
          };
        } else {
          newQuestion = {
            id: question._id,
            question: question.question[0].question as string,
            isFreeForm: true,
          };
        }
      }
      questionArray.push(newQuestion);
    });
    console.log(questionArray);
    //
    let correctedCategory = new SectionClass(
      category._id,
      category.categoryName,
      questionArray
    );
    console.log(correctedCategory); //debugging
  });
};
