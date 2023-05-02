import { IQuestionLang } from "./questions";

export interface IFeedback {
    _id :string,
    template: string,
    userId : string,
    requestpicksId : string,
    feedbackTo: string,
    progress : string,
    responseByDate? : string,
    responseDateLog: Date[], //logs dates of changes
    categories: IFCategory[],

}

export interface IFCategory {
    category: string, //id 
    questions: IQuestionLang
}

export interface ITableEntry { //for Essi's tabular dashboard view
    _id : string,
    emp_id : string,
    emp_name :  string,
    res_coll: string, //a number as string respresent the number of responses received
    res_pm: string,
    res_cm: string,
    status_picks: {
        ready :boolean,
        approved: boolean,  
    },
    status_surveys: {
        ready :boolean,
        approved: boolean,
    },
    status_report: {
        ready :boolean,
        approved: boolean,
    }
}