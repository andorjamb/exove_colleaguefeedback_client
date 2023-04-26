import {IFeedback, IFCategory} from '../types/feedback';
import { IQuestionLang } from '../types/questions';

export const testFeedbackData = {
    _id: '123',
    template: 'feedback summer 2023',
    userId: 'anna01', //employee completing the survey instance
    requestpicksId: '023',
    feedbackTo: 'jesse01', //employee the feedback is about
    progress: '',
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
            question: 'The person shows awareness and respect of colleagues',
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


    ]
}

