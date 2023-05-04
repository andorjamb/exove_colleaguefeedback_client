import { ITemplate } from "../types/template";

//form in db
export const testTemplateData = {
  _id: "07a2d180-9a9f-48db-8b9b-2ac90e2f0a30",
  templateTitle: "Jesse Template 1",
  instructions: "",
  createdOn: "2023-04-24T12:15:34.674Z",
  createdBy: "HR100",
  categories: [
    {
      category: "f0a2ad09-0962-4343-a009-912d3dbf3db2",
      questions: [
        {
          _id: "055cf4ef-001d-4d64-898d-3c505c7c3e25",
          category: "f0a2ad09-0962-4343-a009-912d3dbf3db2",
          createdBy: "HR100",
          createdOn: "2023-04-21T07:37:21.839Z",
          active: true,
          type: "Number",
          question: [
            {
              lang: "Eng",
              question: "The person is willingly helping others!",
              _id: "64423d32e1479cc7a8fbc87d",
            },
            {
              lang: "Fin",
              question: "The person is willingly helping others!",
              _id: "64423d32e1479cc7a8fbc87e",
            },
            {
              lang: "Ger",
              question: "The person is willingly helping others!",
              _id: "64423d32e1479cc7a8fbc87f",
            },
          ],
        },
        {
          _id: "6ddc417c-05ee-4652-875c-045fc023ebe4",
          category: "f0a2ad09-0962-4343-a009-912d3dbf3db2",
          createdBy: "HR100",
          createdOn: "2023-04-21T07:38:20.286Z",
          active: true,
          type: "String",
          question: [
            {
              lang: "Eng",
              question: "Other feedback about the persons people skills",
              _id: "64423d6de1479cc7a8fbc883",
            },
            {
              lang: "Fin",
              question: "Other feedback about the persons people skills",
              _id: "64423d6de1479cc7a8fbc884",
            },
            {
              lang: "Ger",
              question: "Other feedback about the persons people skills",
              _id: "64423d6de1479cc7a8fbc885",
            },
          ],
        },
      ],
      _id: "644672e77fa63a870aa64e24",
    },
  ],
  active: false,
};

const t1 = {
  templateTitle: "Summer 2019",
  instructions: "",
  createdOn: new Date(),
  createdBy: "HR",
  categories: [],
  active: true,
};

/* 

export const testTemplateData: ITemplate = {
  templateTitle: "Summer 2023",
  sections: [
    {
      name: "Quality Focus",
      questions: [
        {
          question: "The person produces high quality product",
          isFreeForm: false,
        },
        {
          question:
            "The person aims to improve the quality of the end result beyond expressed requirements",
          isFreeForm: false,
        },
        {
          question:
            "The person is living by the company values (passion, expertise, openness and care)",
          isFreeForm: false,
        },
        {
          question: "The person is aligned with company best practices",
          isFreeForm: false,
        },
        {
          question:
            "The person delivers quality even with limited resources (time, resources, information, guidance)",
          isFreeForm: false,
        },
        {
          question: "Feedback about the person's quality focus",
          isFreeForm: true,
        },
      ],
    },
    {
      name: "People Skills",
      questions: [
        {
          question: "The person is willingly helping others",
          isFreeForm: false,
        },
        {
          question: "The person takes other people's views into consideration",
          isFreeForm: false,
        },
        {
          question: "The person isn't afraid to ask for help from others",
          isFreeForm: false,
        },
        {
          question:
            "The person has a good attitude towards all the aspects of their work",
          isFreeForm: false,
        },
        {
          question: "The person shares knowledge openly to others",
          isFreeForm: false,
        },
        {
          question: "Other feedback about the persons people skills ",
          isFreeForm: true,
        },
      ],
    },
    {
      name: "Self Guidance",
      questions: [
        {
          question: "The person has good prioritisation skills",
          isFreeForm: false,
        },
        {
          question:
            "The person can see our work from the client's perspective (note: the client can be internal)",
          isFreeForm: false,
        },
        { question: "The person has a positive attitude", isFreeForm: false },
        {
          question: "The person has a proactive way to take things forward",
          isFreeForm: false,
        },
        {
          question: "The person is productive working independently",
          isFreeForm: false,
        },
        {
          question:
            "The person can take good care of personal workload by prioritizing and delegating",
          isFreeForm: false,
        },
        { question: "Other feedback about self-guidance ", isFreeForm: true },
      ],
    },
    {
      name: "Leadership",
      questions: [
        {
          question: "The person takes responsibility naturally",
          isFreeForm: false,
        },
        {
          question: "The person can inspire others to perform better",
          isFreeForm: false,
        },
        {
          question: "The person improves the team they are a part of",
          isFreeForm: false,
        },
        {
          question: "You can always rely on the person to deliver",
          isFreeForm: false,
        },
        { question: "Other feedback about leadership ", isFreeForm: true },
      ],
    },
    {
      name: "Readiness for Change",
      questions: [
        {
          question:
            "The person is interested in developing themselves and their skills",
          isFreeForm: false,
        },
        {
          question:
            "The person sees change as an opportunity instead of a threat",
          isFreeForm: false,
        },
        {
          question:
            "The person is ready to adopt new different working methods",
          isFreeForm: false,
        },
        {
          question: "The person is able to handle change and uncertainty",
          isFreeForm: false,
        },
        {
          question: "Other feedback about readiness for change ",
          isFreeForm: true,
        },
      ],
    },
    {
      name: "Creativity",
      questions: [
        {
          question: "The person has good problem-solving skills",
          isFreeForm: false,
        },
        {
          question:
            "The person can provide multiple options with pros and cons on how to solve a problem",
          isFreeForm: false,
        },
        {
          question:
            "The person can foresee and prevent negative outcomes of solutions and decisions",
          isFreeForm: false,
        },
        { question: "Other feedback about creativity ", isFreeForm: true },
      ],
    },
    {
      name: "General Evaluation",
      questions: [
        { question: "The person's personal strengths are:", isFreeForm: true },
        { question: "The person should improve in:", isFreeForm: true },
      ],
    },
  ],
  active: true,
};
 */


