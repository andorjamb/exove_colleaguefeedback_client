import { IReportData } from "../types/report"
/**
 * feedback => IReportData:'capture' from form - at what stage?: 
 * 
 * - get feedbackdata for this requestPick when essi approves a feedback instance:
 * OR 
 * - automatically when reviewer submits form ?
 * add data to ReportData object:
 * 
 * CONVERTING FEEDBACK OBJECT TO REPORT OBJECT:
 * categories.forEach((item)=>{
 * })
 { 
    
    MAKING CHARTS from report object

    /*web chart:
    for each dataGroup: 
    valueArray =  question.colleagues; 
    let total = 0;
    for (const i=0; i<array.length; i++) { total = total + i;}
      return total/array.length;
   
    */
    
export const makeCharts = (data:IReportData) =>{

}

export const makeOneReport=(requestPickId:string) => {
    /**PSEUDOCODE
     * assume 'progress' property of IFeedback object has possible values
     * [null, 'incomplete', 'submitted', 'approved']
     * get all feedbacks where feedback.requestPickId === currentRequestPickId && feedback.progress === 'approved';
     * 
     */
}