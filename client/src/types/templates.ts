export interface ITemplates {
    _id: string,
    templateTitle: string,
    instructions: string,
    createdOn: Date,
    createdBy: string,
    categories: ICat_Quest[]
}

export interface ICat_Quest {
    category: string,
    questions: string[]
}