/* mongoose schema */

export interface IReport {
  _id: string;
  feedbacks: string[]; //not populated, ids only
  template: string;
  createdBy?: string;
  userId: string; //ldapUid of reviewee
  requestPicks: string;
  createdOn?: Date;
}

export interface IChartData {
  question: string;
  questionId: string;
  colleagueAverage: number;
  colleagues: number[];
  CM: number;
  self: number;
}

export interface IReportData {
  requestPicksId: string | undefined;
  feedbackTo: string | undefined;
  reportsTo: string | undefined;
  categories: IReportCategory[];
}

export interface IReportCategory {
  categoryName: string;
  categoryId: string;
  questions: IChartData[];
  /*   
  rangeResult: rangeResult[];
  stringResult: stringResult[]; */
}
