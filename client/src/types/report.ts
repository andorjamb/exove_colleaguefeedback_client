export interface IReportData {
  _id: string;
  requestPicksId: string;
  feedbackTo: string;
  rangeCategories?: [
    {
      category1: {
        question1: {
          questionId: string;
          colleagues: number[];
          CM: number;
          self: number;
          PM: number;
          subordinates: number[];
        };
        question2: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question3: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question4: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
      };
    },
    {
      category2: {
        question1: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question2: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question3: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question4: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
      };
    },
    {
      category3: {
        question1: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question2: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question3: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question4: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
      };
    },
    {
      category4: {
        question1: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };

        question2: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question3: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
        question4: {
          colleagues: number[];
          CM: number;
          self: number;
          colleagueAverage: number;
        };
      };
    }
  ];
  textCategorys?: [
    {
      //for text responses
      category1: {
        colleagues: string[];
        CM: string;
        self: string;
      }[];
      category2: {
        colleagues: string[];
        CM: string;
        self: string;
      };
      category3: {
        colleagues: string[];
        CM: string;
        self: string;
      };
      category4: {
        colleagues: string[];
        CM: string;
        self: string;
      };
      category5: {
        weaknesses: {
          colleagues: string[];
          CM: string;
          self: string;
        };
        strengths: {
          colleagues: string[];
          CM: string;
          self: string;
        };
      };
    }
  ];
}
