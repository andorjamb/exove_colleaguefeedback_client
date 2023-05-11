//mongodb models:

export enum QuestionType {
  range = "Number",
  open = "String",
  truefalse = "Boolean",
}

export interface IQuestionTextGet {
  _id: string;
  lang: string;
  question: string;
}

export interface IQuestionGet {
  _id: string;
  category: string;
  createdBy: string;
  createdOn: Date;
  active: boolean;
  type: QuestionType;
  question: IQuestionTextGet[];
}

export interface ICategoryGet {
  //in template/active this is no longer being used
  _id: string;
  category: string;
  questions: IQuestionGet[];
}

export interface IActiveTemplateCategories {
  category: IActiveTemplateCategory;
  questions: string[];
}

export interface IActiveTemplateCategory {
  _id: string;
  categoryName: string;
  questions: IQuestionGet[];
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

export interface IActiveTemplateGet {
  _id: string;
  templateTitle: string;
  instructions: string;
  createdOn: Date;
  createdBy: string;
  categories: IActiveTemplateCategories[];
  active: false;
}

//////

export interface ICat_Quest {
  category: string; //id
  questions: IQuestion[]; //IQuestionGet
}

export interface IQuestion {
  _id: string;
  category: string; //category id
  createdOn: Date;
  createdBy: string;
  active: boolean;
  type: string;
  question: IQuestionLang[];
}

export interface IQuestionLang {
  _id: string;
  lang: string;
  question?: string; //actual question text
  answer?: string;
  answeredOn?: Date;
  type: string;
}

export interface IQCategory {
  _id: string;
  categoryName: string;
  description?: string;
  questions?: string[];
  createdOn: Date;
  createdBy: string;
  categoryStatus: boolean;
}

//Types for sending new question to db

type QuestionLangPost = {
  //for creating new question
  lang: string;
  question: string;
};

export interface IQuestionPost {
  //for creating new question
  category: string;
  type: string;
  question: QuestionLangPost;
}

//Types for sending new template to db

export interface ICategoryPost {
  category: string;
  questions: QuestionLangPost[];
}

export interface ITemplatePost {
  templateTitle: string;
  instructions: string;
  categories: ICategoryPost[];
}

/* Expanded view of catgories:ICategoriesPost[]
categories: [
  {
  category: category_id,
  questions: [] ? unclear whether this should be array of strings of array of IQuestionPost
},{},

]



*/ /* 
EXPANDED VIEW OF ITemplate / ITemplateGet
 {
  _id: string;
  templateTitle: string;
  instructions: string;
  createdOn: Date;
  createdBy: string;
  categories: [
    //ISection
    {
      category: string; //category id
      questions: [
        {
          id: string;
          category: string;
          createdBy: string;
          createdOn: Date;
          active: boolean;
          type: any;
          question: [
            {
              lang: string;
              question: string;
              _id: string;
            }
          ];
        }
      ];
    }
  ];
  active: boolean;
}
 */

//interfaces for mapping template questions to UI component

export interface ISection {
  id: string; //maps to database doc id
  name: string;
  questions: ITemplateQuestion[];
}

export interface ITemplateQuestion {
  id: string; //maps to database doc id
  question: string;
  isFreeForm: boolean;
}


//Latest type for getting active and all templates

export interface SingleQuiz {
  lang: string,
  question: string,
  _id:string
}

interface IQuiz{
  _id: string;
  category: string;
  createdBy: string;
  createdOn: string;
  active: boolean;
  type: string;
  question:SingleQuiz[] ;
}
export interface ITemplate {
 
    _id: string;
    templateTitle: string;
    instructions: string;
    createdOn: Date;
    createdBy: string;
    categories: ICategory[];
    active: boolean;

}

export interface ICategory {
category:IICategory;
}

interface IICategory {
  _id: string;
  categoryName:string;
  questions: IQuiz[];
};