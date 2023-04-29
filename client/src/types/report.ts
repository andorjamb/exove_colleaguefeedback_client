export interface IReportData {
    _id: string,
    requestPicksId :string,
    feedbackTo: string,
    dataGroups: [
        {
        group1 : {
            question1: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question2: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question3: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question4: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
        },
    }, {
        group2 : {
            question1: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question2: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question3: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question4: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
        },
    },{
        group3: { 
            question1: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question2: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question3: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question4: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
        },
    },{
        group4: {
            question1: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
        
            question2: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question3: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
            question4: {
                colleagues: number[], 
                CM: number, 
                self: number, 
                colleagueAverage: number
            },
        }
    }
],
    textGroups: [{ //for text responses
        group1: {
            colleagues: string[], 
            CM: string, 
            self: string, 
        },
        group2: {
            colleagues: string[], 
            CM: string, 
            self: string,     
        },
        group3: {
            colleagues: string[], 
            CM: string, 
            self: string,        
        },
        group4: {
            colleagues: string[], 
            CM: string, 
            self: string, 
        },
        group5: {
            weaknesses: {
                colleagues: string[], 
                CM: string, 
                self: string, 
            },
            strengths: {
                colleagues: string[], 
                CM: string, 
                self: string, 
            }
        }
}]
}
