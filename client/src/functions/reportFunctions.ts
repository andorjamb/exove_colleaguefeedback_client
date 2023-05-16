import { IFeedback } from "../types/feedback";
import { IReportData, IReportCategory, IChartData } from "../types/report";

/**
 * export const reportSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    feedbacks: { type: [mongoose.Schema.Types.String], ref: "FeedBacks" },
    templates: { type: [mongoose.Schema.Types.String], ref: "Template" },
    createdBy: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    userId: { type: String, required: true },
    requestPicks: { type: String, required: true },
    
})
*/

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

/*
export interface IChartData {
  question: string;
  colleagueAverage: number;
  colleagues: number[];
  CM: number;
  self: number;
}*/

/** for Charts creation only  */
export class ChartDataClass {
  categoryName: string | undefined;
  chartData: IChartData[] | undefined;
  comments: { self: string; CM: string; colleagues: string[] };

  constructor(
    categoryName: string | undefined,
    chartData: IChartData[] | undefined,
    comments: { self: string; CM: string; colleagues: string[] }
  ) {
    this.categoryName = categoryName;
    this.chartData = chartData;
    this.comments = comments;
  }
}

/* export class ChartDataClass {
  categoryName: string | undefined;
  chartData: IChartData[] | undefined;
  comments: { self: string; CM: string; colleagues: string[] };

  constructor(
    categoryName: string | undefined,
    chartData: IChartData[] | undefined,
    comments: { self: string; CM: string; colleagues: string[] }
  ) {
    this.categoryName = categoryName;
    this.chartData = chartData;
    this.comments = comments;
  }
} */

// MAKING CHARTS from report object

/* calculating average
    valueArray =  question.colleagues; 
    let total = 0;
    for (const i=0; i<array.length; i++) { total = total + i;}
      return total/array.length;
    */

function makeReportCategoriesData(feedbacks: IFeedback[]) {
  let reduction = feedbacks.reduce((accumulator: any, currentValue: any) => {
    return {
      ...accumulator,
      ...{ [currentValue.user._id]: currentValue.categories },
    };
  }, {});
}

/* for returning category name if only category id is present  */
/* function getCatName(para: string) {
  for (const cat of mappedCategories) {
    if (cat.categoryId === para) {
      return cat.categoryName;
    }
  }
}
 */

/*   
  function manipulate(value: any, key: string[]) {
    let m = value.map((object: any) => {
      return {
        categoryId: object.category,
        chartData: transformQuestions(object.questions),
      };
    });
    console.log(m);
    chartDataArray.push(m);
  } */

// );

/*
function mapByRole(values: IFCategory[], key: any) {
  let bla = new ChartDataClass();

  //make object skeleton here
  if (key[1] === revieweeId) {
    console.log("self evaluation:", values); //array of feedback objects

    values.forEach((value) => {
      mappedCategories?.forEach((category: any) => {

        if (category.categoryId === value.category) {
          console.log("category chart data:", category.chartData);
          console.log(value.questions);
          value.questions.forEach((question) => {
            if (question.type === "number") {
              let newQuestionObject = {
                question: question.question,
                self: quesiton.answer,
              };
            }
            if (question.type === "string") {
            }

            //make new let chartDataCopy = [...chartData]

            console.log(question.question, question.answer);
          });
          let newData = new ChartDataClass(category.categoryName);
        }
      });

      //transformQuestions(value.questions);
    });
  }
  if (key[0] < 5) {
    console.log("CM evaluation: by ", key[1], values); //array of feedback objects

    setCM((CM) => key[1]);
  } else {
    console.log("colleague evaluation");
  }
}

*/