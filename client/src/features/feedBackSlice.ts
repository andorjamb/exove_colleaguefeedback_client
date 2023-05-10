import { createSlice } from "@reduxjs/toolkit";
import { IFCategory, IFeedback } from "../types/feedback";
import { IQuestionLang } from "../types/template";

const questions: IQuestionLang = {
    _id: '',
    lang: '',
    question: '',
    answer: '',
}
const category: IFCategory = 
    {
        category: '',
        questions: [questions]
    }

const initfeedback: IFeedback = {
    requestpicksId: '',
    responseDateLog:[new Date],
    template: '',
    roleLevel: 0,
    feedbackTo: '',
    progress: '',
    categories: [category],
}

const initialState = {
    feedback:initfeedback
}

const feedBackSlice = createSlice({
    name:'feedback',
    initialState,

    reducers: {
        newfeedback(state, action) {
            state.feedback = {...state.feedback , ...action.payload}
  
        },

      
        addQuestion (state, action){
              const { category , question }= action.payload;
              const categoryIndex = state.feedback.categories.findIndex(cat => cat.category === category);
              if (categoryIndex !== -1) {
                state.feedback.categories[categoryIndex].questions.push(question);
              }
            }
          
        
        ,
    }    
})

export const { addQuestion, newfeedback } = feedBackSlice.actions
export default feedBackSlice.reducer
