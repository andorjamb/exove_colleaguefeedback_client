import { IFeedback } from "../types/feedback";
/** IQuestionLang
 *  _id: string;
  lang: string;
  question?: string;
  answer?: string;
  answeredOn?: Date;
  type: string;

*/
export const testFeedbackData: IFeedback[] = [
  {
    userId: "newton",
    responseDateLog: [],
    template: "",
    progress: "",
    feedbackTo: "newton",
    roleLevel: 1,
    categories: [
      {
        category: "",
        questions: [
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
        ],
      },
      {
        category: "",
        questions: [
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
        ],
      },
    ],
  },
  {
    userId: "newton",
    responseDateLog: [],
    template: "",
    progress: "",
    feedbackTo: "newton",
    roleLevel: 1,
    categories: [
      {
        category: "",
        questions: [
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
        ],
      },
      {
        category: "",
        questions: [
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
          {
            question: "",
            type: "number",
            _id: "",
            answer: "",
            lang: "Eng",
          },
        ],
      },
    ],},
];

/*
feedbacks questions: object array
{
answer: "false",
answeredOn: "2023-05-12T07:38:42.115Z",
question: "The person produces high quality product",
type: "boolean",
_id: "6454aa0d971f4982fdd21b29"
*/

//feedbacks data shape:
/*feedback.cagories:[]
{
  category: 'b10e82d5-03be-45c3-85a5-363f2533a908', 
  questions: Array(0), 
  _id: '645e25c0235706de4691dcf1'
},
category: "b10e82d5-03be-45c3-85a5-363f2533a908"
questions: []
_id: "645e25c0235706de4691dcf1"
*/
