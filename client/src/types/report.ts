/* mongoose schema */

import { IFeedback } from "./feedback";

export interface IReport {
  _id: string;
  feedbacks: IFeedback[]; //not populated, ids only
  template: string;
  createdBy?: string;
  userId: string; //ldapUid of reviewee
  requestPicks: string;
  createdOn?: Date;
}

export interface IReportPost {
  feedbacks: (string | undefined)[];
  template: string;
  userId: string;
  requestPicks: string;
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
