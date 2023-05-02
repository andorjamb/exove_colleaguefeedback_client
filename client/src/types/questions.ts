export interface IQCategory {
    _id: string,
    categoryName: string,
    description?: string,
    questions?: string[],
    createdOn: Date,
    createdBy: string,
    categoryStatus: boolean
}

export interface IQuestion {
    _id : string,
    category: string,
    createdOn: Date,
    createdBy: string,
    active: boolean,
    type: string,
    question: IQuestionLang[]
}

export interface IQuestionLang {
    _id: string,
    lang: string,
    question?: string,
    answer?: string,
    answeredOn: Date
}

/**
 * 
 * Question Schema:
 * export const questionsSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // your custom ID field
  category: { type: String, ref: 'Category', required: true },
  createdBy: {
    type: String,
    ref: "Users",
    required: true,
  },
  createdOn: Date,
  active: Boolean,
  type: { type: String, required: true, default:"String"},
  question: [
    {
    lang: { type: String, required: true }, //can be eng,fin,swd language
    question:{ type: String, required: true }, // question string eg how old are you
  },
]
});

 */