enum QuestionType {
  range = "Number",
  open = "String",
  truefalse = "Boolean",
}

export interface IQuestionTextGet {
  _id: string;
  lang: string;
  question: string;
}

export interface IQuesionGet {
  _id: string;
  category: string;
  createdBy: string;
  createdOn: string;
  active: boolean;
  type: QuestionType;
  question: IQuestionTextGet[];
}

export interface ICategoryGet {
  _id: string;
  category: string;
  questions: IQuesionGet[];
}

export interface ITemplateGet {
  _id: string;
  templateTitle: string;
  instructions: string;
  createdOn: Date;
  createdBy: string;
  categories: ICategoryGet[];
  active: false;
}
