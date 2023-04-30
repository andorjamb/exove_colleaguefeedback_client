import {ITemplate, ISection, IQuestion} from "../types/template";

/* data in 'front end format' assuming it has been converted in backend  */
export const testTemplateData:ITemplate = {
    templateTitle: "Summer 2023",
    preface: [ "We collect colleague feedback yearly. This is an essential tool for developing as a professional for all of us, so please fill this form carefully. Especially open comments are very appreciated.",
    "A few reminders:",   
    "1) You are also evaluating your competence manager with the same form. When evaluating, please consider him/her first and foremost as a manager, not through his/her specialist role. You can see the role from the preselected 'You are providing this feedback as' -question.", 

  "2) Project Managers are evaluating all the employees working in client projects, and are doing the evaluation from the client perspective. Remember that a PM can also be asked to give feedback as a colleague. You can see the role from the preselected 'You are providing this feedback as' -question.",
  "3) We have a new grading system. Please read the guide on grading carefully.",
  "If you haven't worked with the person in question at all, don't start guessing. Notify HR / CTO to find another respondent - and remember that suggestions of a more suitable respondent are always welcome. Don't forward the email to anyone yourself.",
  "Please notice that although your feedback will be anonymous, your open comments containing any identifying information (such as project speci(c data) might be recognisable. We won't actively dig up who might have answered to whom, nor do we ever reveal that information to anyone." ],
    prefilledQuestions: ["Who are you providing feedback for?", "You are providing feedback as:"],
    gradingGuidance: [""],
    sections: [
        {
        name: "Quality Focus",
        questions: [
            {question: "The person produces high quality product",
            isFreeForm: false}, 
            {question: "The person aims to improve the quality of the end result beyond expressed requirements",
            isFreeForm: false
            },
            {question: "The person is living by the company values (passion, expertise, openness and care)",
            isFreeForm: false
            },
            {question: "The person is aligned with company best practices",
            isFreeForm: false
            },
            {question: "The person delivers quality even with limited resources (time, resources, information, guidance)",
            isFreeForm: false
            },
            {question: "Feedback about the person's quality focus",
            isFreeForm: true
            }]
    },
    {
        name: "People Skills",
        questions: [
            {question: "The person is willingly helping others",
            isFreeForm: false}, 
            {question: "The person takes other people's views into consideration",
            isFreeForm: false
            },
            {question: "The person isn't afraid to ask for help from others",
            isFreeForm: false
            },
            {question: "The person has a good attitude towards all the aspects of their work",
            isFreeForm: false
            },
            {question: "The person shares knowledge openly to others",
            isFreeForm: false
            },
            {question: "Other feedback about the persons people skills ",
            isFreeForm: true
            },
        ]
    },
    {
        name: "Self Guidance",
        questions: [
            {question: "The person has good prioritisation skills",
            isFreeForm: false}, 
            {question: "The person can see our work from the client's perspective (note: the client can be internal)",
            isFreeForm: false
            },
            {question: "The person has a positive attitude",
            isFreeForm: false
            },
            {question: "The person has a proactive way to take things forward",
            isFreeForm: false
            },
            {question: "The person is productive working independently",
            isFreeForm: false
            },
            {question: "The person can take good care of personal workload by prioritizing and delegating",
            isFreeForm: false
            },
            {question: "Other feedback about self-guidance ",
            isFreeForm: true
            }
        ]
    },
    {
        name: "Leadership",
        questions: [
            {question: "The person takes responsibility naturally",
            isFreeForm: false}, 
            {question: "The person can inspire others to perform better",
            isFreeForm: false
            },
            {question: "The person improves the team they are a part of",
            isFreeForm: false
            },
            {question: "You can always rely on the person to deliver",
            isFreeForm: false
            },
            {question: "Other feedback about leadership ",
            isFreeForm: true
            },
        ]
    },
    {
        name: "Readiness for Change",
        questions: [
            {question: "The person is interested in developing themselves and their skills",
            isFreeForm: false}, 
            {question: "The person sees change as an opportunity instead of a threat",
            isFreeForm: false
            },
            {question: "The person is ready to adopt new different working methods",
            isFreeForm: false
            },
            {question: "The person is able to handle change and uncertainty",
            isFreeForm: false
            },
            {question: "Other feedback about readiness for change ",
            isFreeForm: true
            },
        ]
    },
    {
        name: "Creativity",
        questions: [
            {question: "The person has good problem-solving skills",
            isFreeForm: false}, 
            {question: "The person can provide multiple options with pros and cons on how to solve a problem",
            isFreeForm: false
            },
            {question: "The person can foresee and prevent negative outcomes of solutions and decisions",
            isFreeForm: false
            },
            {question: "Other feedback about creativity ",
            isFreeForm: true
            },
        ]
    },
    {
        name: "General Evaluation",
        questions: [
            {question: "The person's personal strengths are:",
            isFreeForm: true}, 
            {question: "The person should improve in:",
            isFreeForm: true
            },
        ]
    },
]
}



