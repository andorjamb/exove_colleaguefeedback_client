//mongodb schemas:

/* export interface ITemplate {
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

} */

//Adap tdb data to Front end interface:

export interface ITemplate {
    templateTitle: string,
    preface: string[],
    gradingGuidance: string[],
    sections: ISection[]

}

export interface ISection {
    name: string,
    questions: IQuestion[]

}

export interface IQuestion {
    question: string,
    isFreeForm: boolean

}

