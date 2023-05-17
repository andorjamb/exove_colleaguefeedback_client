import { IReportData, IReportCategory, IChartData } from "../types/report";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";

export class ReportClass {
  requestPicksId: string | undefined;
  feedbackTo: string | undefined; //ldapUid
  reportsTo: string | undefined; //ldapUid of CM
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

export async function chartsToPdf({
  doc,
  charts,
}: {
  doc: jsPDF;
  charts: HTMLCollectionOf<Element>;
}) {
  let top = 30;
  let padding = 16;

  for (let i = 0; i < charts.length; i++) {
    const chart = charts[i] as HTMLElement;
    const imgData = await htmlToImage.toPng(chart);

    const pageWidth = doc.internal.pageSize.getWidth(); //px scaled to pdf pt
    console.log(pageWidth);

    let chartHeight = chart.offsetHeight; //pixels
    let chartWidth = chart.offsetWidth; //pixels

    if (chartWidth > pageWidth) {
      const ratio = pageWidth / chartWidth;

      chartHeight = chartHeight * ratio - padding;
      chartWidth = chartWidth * ratio - padding;
    }
    if (imgData) {
      doc.addImage(
        imgData,
        "PNG",
        10,
        top,
        chartWidth,
        chartHeight,
        `chart${i}`
      );
      top += chartHeight + 40;
    }
  }
}

/*Backup of modifid function
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

// MAKING CHARTS from report object

/* calculating average
    valueArray =  question.colleagues; 
    let total = 0;
    for (const i=0; i<array.length; i++) { total = total + i;}
      return total/array.length;
    */

/* for returning category name if only category id is present  */
/* function getCatName(para: string) {
  for (const cat of mappedCategories) {
    if (cat.categoryId === para) {
      return cat.categoryName;
    }
  }
}
 */
