import { IFeedback } from "../types/feedback";
import {
  IReportData,
  IReportCategory,

} from "../types/report";

export class ReportClass {
  requestPicksId: string | undefined;
  feedbackTo: string | undefined; //ldapUid
  reportsTo: string | undefined; //ldapUid of responsibile CM who will view report
  categories: IReportCategory[];

  constructor(
    requestPicksId: string | undefined,
    feedbackTo: string | undefined,
    reportsTo: string | undefined,
    categories: IReportCategory[]
  ) {
    this.requestPicksId = requestPicksId;
    this.feedbackTo = feedbackTo;
    this.reportsTo = reportsTo;
    this.categories = categories;
  }
}
/**
 * - get feedbackdata for this requestPick when essi approves a feedback instance:
 * OR 
 * - automatically when reviewer submits form ?
 * add data to ReportData object:
    
    MAKING CHARTS from report object

    /*web chart:
    for each dataGroup: 
    valueArray =  question.colleagues; 
    let total = 0;
    for (const i=0; i<array.length; i++) { total = total + i;}
      return total/array.length;
    */

export const convertReportData = (data: IFeedback) => {};

export const makeCharts = (data: IReportData) => {};
//labels array for chart:
/** const questionNameArray = reportData.rangeDataGroups.map((item)=>{item.questions.question}) */

/**PSEUDOCODE
     *  1. CONVERTING FEEDBACK OBJECT TO REPORT OBJECT:
      Function will be triggered by onClick of 'generate report' button
     * assume 'progress' property of IFeedback object has possible values eg)
     * [null, 'incomplete', 'submitted', 'approved']
     * //[started]
     * for each feedback: 
     * if (userId === feedbackTo){
     * 
     * }
     * if (userId === reportsTo) {
     * }
     * if (roleLevel = 'self') {}
     * 
     * set report.
     * 
     */
/* Th administrator will only run this function if enough completed feedbacks received, so might assume the check for 'progress' doesn't need to be run? */

/*
if (feedback.template !== activeTemplateId) {
  return;
}
if (feedback.progress != { value }) {
  return;
}
*/
