//mongodb schemas:

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
  category: string; //the category id
  questions: IQuestion[];
}

export interface IQuestion {
  _id: string;
  category: string;
  createdOn: Date;
  createdBy: string;
  active: boolean;
  type: string;
  question: IQuestionLang[];
}

export interface IQuestionLang {
  _id: string;
  lang: string;
  question?: string;
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
  templateTitle: string;
  sections: ISection[];
  active: boolean;
}

export interface ISection {
  name: string; //id?
  questions: ITemplateQuestion[];
}

export interface ITemplateQuestion {
  question: string;
  isFreeForm: boolean;
}
