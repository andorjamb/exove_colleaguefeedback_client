import { IReportData } from "../types/report";
/**
 * feedback => IReportData:'capture' from form - at what stage?: 
 * 
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

export const makeOneReport = (requestPickId: string) => {
  /**PSEUDOCODE
     * 
     * assume static number of categories
     * assume dynamic number of questions per category
     *  1. CONVERTING FEEDBACK OBJECT TO REPORT OBJECT:
 Function will be triggered by onClick of 'generate report' button
     * assume 'progress' property of IFeedback object has possible values
     * [null, 'incomplete', 'submitted', 'approved']
     * get all feedbacks where feedback.requestPickId === currentRequestPickId && feedback.progress === 'approved';
     *  const report = new Report();
     * this.requestPickId = current.RequestPickId;
     * this.feedbackTo = current.feedbackTo;
     * feedbacks will be an array.
     * for each feedback: 
     * if (asRole = 'colleague'){
     * 
     * }
     * if (asRole = 'CM) {
     * }
     * if (asRole = 'self') {}
     * 
     * set report.
     * 
     */
};
