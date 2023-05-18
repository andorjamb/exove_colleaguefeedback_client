import { IReportData, IReportCategory, IChartData } from "../types/report";
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";

import { useCallback, useEffect } from "react";

/* export const useDownloadPdf = (name: string, isReady: boolean) => {
  useEffect(() => {
    if (isReady) {
      const fileName = `${name}.pdf`;
      const pdf = new JsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
      });

      const convertElements = document.querySelectorAll(".reportChart");
      const elements = Array.from(convertElements) as HTMLElement[];

      if (elements.length > 0) {
        Promise.all(
          elements.map(async (element) => {
            const canvas = await html2canvas(element);
            element.replaceWith(canvas);
          })
        ).then(() => {
          pdf.html(document.body, {
            callback: (generatedPdf) => {
              generatedPdf.save(fileName);
            },
          });
        });
      } else {
        pdf.html(document.body, {
          callback: (generatedPdf) => {
            generatedPdf.save(fileName);
          },
        });
      }
    }
  }, [isReady, name, setAtribute]);
}; */

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

export function scoreAverage(valueArray: number[]) {
  //valueArray =  question.colleagues;
  let total = 0;
  for (let i = 0; i < valueArray.length; i++) {
    total = total + i;
  }
  return total / valueArray.length;
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



/*Backup of modify data  function
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

/* for returning category name if only category id is present  */
/* function getCatName(para: string) {
  for (const cat of mappedCategories) {
    if (cat.categoryId === para) {
      return cat.categoryName;
    }
  }
}
 */
