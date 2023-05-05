import {IFeedback, IFCategory} from '../types/feedback';
import { IQuestionLang } from '../types/questions';
import { IReportData } from '../types/report';

const testReportData:IReportData =  {
    _id: '234',
    requestPicksId :'456',
    feedbackTo: 'ivan01',
    rangeCategories: [
        {
        category1 : {
            question1: {
                colleagues:[4,3,3,3,3], 
                CM: 4, 
                self: 3, 
                colleagueAverage: 4 
                //ceiling or floor? 
            },
            question2: {
                colleagues: [4,4,4,5,4], 
                CM: 4, 
                self: 4, 
                colleagueAverage: 4
            },
            question3: {
                colleagues: [3,2,3,4,4], 
                CM: 3, 
                self: 4, 
                colleagueAverage: 3
            },
            question4: {
                colleagues: [3,4,4,3,3], 
                CM: 3, 
                self: 3, 
                colleagueAverage: 3
            },
        },
    },{
        category2 : {
            question1: {
                colleagues:[4,3,3,3,3], 
                CM: 4, 
                self: 3, 
                colleagueAverage: 4 //ceiling or floor? 
            },
            question2: {
                colleagues: [4,4,4,5,4], 
                CM: 4, 
                self: 4, 
                colleagueAverage: 4
            },
            question3: {
                colleagues: [3,2,3,4,4], 
                CM: 3, 
                self: 4, 
                colleagueAverage: 3
            },
            question4: {
                colleagues: [3,4,4,3,3], 
                CM: 3, 
                self: 3, 
                colleagueAverage: 3
            },
        },
    },{
        category3 : {
            question1: {
                colleagues:[4,3,3,3,3], 
                CM: 4, 
                self: 3, 
                colleagueAverage: 4 //ceiling or floor? 
            },
            question2: {
                colleagues: [4,4,4,5,4], 
                CM: 4, 
                self: 4, 
                colleagueAverage: 4
            },
            question3: {
                colleagues: [3,2,3,4,4], 
                CM: 3, 
                self: 4, 
                colleagueAverage: 3
            },
            question4: {
                colleagues: [3,4,4,3,3], 
                CM: 3, 
                self: 3, 
                colleagueAverage: 3
            },
        },
    },{
        category4 : {
            question1: {
                colleagues:[4,3,3,3,3], 
                CM: 4, 
                self: 3, 
                colleagueAverage: 4 //ceiling or floor? 
            },
            question2: {
                colleagues: [4,4,4,5,4], 
                CM: 4, 
                self: 4, 
                colleagueAverage: 4
            },
            question3: {
                colleagues: [3,2,3,4,4], 
                CM: 3, 
                self: 4, 
                colleagueAverage: 3
            },
            question4: {
                colleagues: [3,4,4,3,3], 
                CM: 3, 
                self: 3, 
                colleagueAverage: 3
            },
        },
    }
],
    textcategorys: [{ //for text responses
        category1: {
            colleagues: ["good job", "works too hard", "could do better"], 
            CM: "great team member", 
            self: "I know I have areas to improve", 
        },
        category2: {
            colleagues: ["good job", "works too hard", "could do better"], 
            CM: "great team member", 
            self: "I know I have areas to improve", 
        },
        category3: {
            colleagues: ["good job", "works too hard", "could do better"], 
            CM: "great team member", 
            self: "I know I have areas to improve", 
        },
        category4: {
            colleagues: ["good job", "works too hard", "could do better"], 
            CM: "great team member", 
            self: "I know I have areas to improve", 
        },
        category5: {
            weaknesses: {
                colleagues: ["should arrive earlier", "sometimes indecisive"], 
                CM: "could contribute more at meetings", 
                self: "I want to be more organised", 
            },
            strengths: {
                colleagues: ["Makes intelligent contributions", "Keeps desk fairly clean"], 
                CM: "Has a positive attitude", 
                self: "I am always ready to improve", 
            }
        }
}]
}

export const testFeedbackData = {
    _id: '123',
    template: 'feedback summer 2023',
    userId: 'anna01', //employee completing the survey instance
    requestpicksId: '456',
    feedbackTo: 'ivan01', //employee the feedback is about
    progress: "",
    responseByDate: new Date(),
    responseDateLog: [],
    categories: [
        {category: "Quality Focus",
        questions: [ //IQuestionLang
            {
            _id: '340',
            lang: 'en',
            question: 'The person produces high quality product',
            answer: '4',
            answeredOn: new Date() 
        },
        {
            _id: '341',
            lang: 'en',
            question: 'The person aims to improve the quality of the end result beyond expressed requirements',
            answer: '3',
            answeredOn: new Date() 
        },
        {
            _id: '341',
            lang: 'en',
            question: 'The person is aligned with company best practices',
            answer: '3',
            answeredOn: new Date() 
        },
        {
            _id: '341',
            lang: 'en',
            question: 'The person delivers quality even with limited resources (time, resources, information, guidance)',
            answer: '3',
            answeredOn: new Date() 
        },
        {
            _id: '341',
            lang: 'en',
            question: "Feedback about the person's quality focus (freeform)",
            answer: 'Shows a good focus of the quality of the product',
            answeredOn: new Date() 
        }, 

    ]
},
    {category: "People Skills",
        questions: [
            {
            _id: '342',
            lang: 'en',
            question: 'The person communicates effectively',
            answer: '5',
            answeredOn: new Date() 
        },
        {
            _id: '343',
            lang: 'en',
            question: 'The person is willingly helping others',
            answer: '4',
            answeredOn: new Date() 
        },
        {
            _id: '343',
            lang: 'en',
            question: 'The person takes other people’s views into consideration',
            answer: '4',
            answeredOn: new Date() 
        },
        {
            _id: '343',
            lang: 'en',
            question: 'The person isn’t afraid to ask for help from others',
            answer: '4',
            answeredOn: new Date() 
        },
        {
            _id: '343',
            lang: 'en',
            question: 'The person has a good attitude towards all the aspects of their work',
            answer: '4',
            answeredOn: new Date() 
        },
        {
            _id: '343',
            lang: 'en',
            question: 'The person shares knowledge openly to others',
            answer: '4',
            answeredOn: new Date() 
        },
        {
            _id: '343',
            lang: 'en',
            question: 'Other feedback about the persons people skills (freeform)',
            answer: '4',
            answeredOn: new Date() 
        },
    
    ]
},
{category: "Leadership",
questions: [
    {
    _id: '344',
    lang: 'en',
    question: 'The person is able to effectively direct their own work',
    answer: '5',
    answeredOn: new Date() 
},
{
    _id: '345',
    lang: 'en',
    question: 'The person actively engages in new learning',
    answer: '4',
    answeredOn: new Date() 
},

]
},
{category: "Self Guidance",
questions: [
    {
    _id: '344',
    lang: 'en',
    question: 'The person is able to effectively direct their own work',
    answer: '5',
    answeredOn: new Date() 
},
{
    _id: '345',
    lang: 'en',
    question: 'The person actively engages in new learning',
    answer: '4',
    answeredOn: new Date() 
},

]
},
{category: "General Evaluation",
questions: [
    {
    _id: '344',
    lang: 'en',
    question: "The person's personal strengths are: (freeform)",
    answer: 'Good chess player',
    answeredOn: new Date() 
},
{
    _id: '345',
    lang: 'en',
    question: "The person should improve in:",
    answer: 'Personal hygiene',
    answeredOn: new Date() 
},

]
},


    ]
}

