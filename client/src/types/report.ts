/* export interface rangeDataGroup {
  questions: rangeResult[];
} */

export interface rangeResult {
  /*  questionId: string; */
  question: string;
  colleagues: number[];
  CM: number;
  self: number;
  colleagueAverage: number;
}

/* export interface stringDataGroup {
  questions: stringResult[];
} */

export interface stringResult {
  /*   questionId: string; */
  question: string;
  colleagues: string[];
  CM: string | undefined;
  self: string;
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
  rangeDataGroups?: rangeResult[];
  stringDataGroups?: stringResult[];
}
