//mongodb models:

export interface ITemplate {
  _id: string;
  templateTitle: string;
  instructions: string;
  createdOn: Date;
  createdBy: string;
  categories: ICat_Quest[];
  active: boolean;
}

export interface ICat_Quest {
  category: string; //id
  questions: IQuestion[];
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
}

/* export interface IQCategory {
  _id: string;
  categoryName: string;
  description?: string;
  questions?: string[];
  createdOn: Date;
  createdBy: string;
  categoryStatus: boolean;
} */

/* 
EXPANDED VIEW OF ITemplate
 {
  _id: string;
  templateTitle: string;
  instructions: string;
  createdOn: Date;
  createdBy: string;
  categories: [
    //ISection
    {
      category: string;
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

export interface IConvertedTemplate {
  id: string; //maps to database doc id
  templateTitle: string;
  sections: ISection[];
  active: boolean;
}

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
