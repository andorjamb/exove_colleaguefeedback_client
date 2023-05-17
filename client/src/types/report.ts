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


