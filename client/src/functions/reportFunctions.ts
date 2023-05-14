import { IReportData } from "../types/report";

interface rangeDataGroup {
  categoryId: string;
  categoryName: string;
  questions: rangeResult[];
}

interface rangeResult {
  questionId: string;
  question: string;
  colleagues: number[];
  CM: number;
  self: number;
  colleagueAverage: number;
}

interface stringDataGroup {
  categoryId: string;
  categoryName: string;
  questions: stringResult[];
}
interface stringResult {
  questionId: string;
  question: string;
  colleagues: string[];
  CM: string;
  self: string;
}

export class ReportClass {
  requestPicksId: string | undefined;
  feedbackTo: string | undefined; //ldapUid
  reportsTo: string | undefined; //ldapUid of responsibile CM who will view report
  rangeDataGroups: rangeDataGroup[];
  stringDataGroups: stringDataGroup[];

  constructor(
    requestPicksId: string | undefined,
    feedbackTo: string | undefined,
    reportsTo: string | undefined,
    rangeDataGroups: rangeDataGroup[],
    stringDataGroups: stringDataGroup[]
  ) {
    this.requestPicksId = requestPicksId;
    this.feedbackTo = feedbackTo;
    this.reportsTo = reportsTo;
    this.rangeDataGroups = rangeDataGroups;
    this.stringDataGroups = stringDataGroups;
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

export const makeCharts = (data: IReportData) => {};
//labels array for chart:
/** const questionNameArray = reportData.rangeDataGroups.map((item)=>{item.questions.question}) */

export const makeOneReport = (requestPickId: string) => {
  /**PSEUDOCODE
     * 
     * assume static number of categories
     * assume dynamic number of questions per category
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
};
/* Th administrator will only run this function if enough completed feedbacks received, so might assume the check for 'progress' doesn't need to be run? */

/*
if (feedback.template !== activeTemplateId) {
  return;
}
if (feedback.progress != { value }) {
  return;
}
*/
