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
  CM: string | undefined;
  self: string;
}

export interface IReportData {
  requestPicksId: string | undefined;
  feedbackTo: string;
  reportsTo: string | undefined;
  rangeDataGroups?: rangeDataGroup[];
  stringDataGroups?: stringDataGroup[];
}
