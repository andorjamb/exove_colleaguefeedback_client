import {ICat_Quest, ITemplate} from '../types/template' 

export const activeTemplate:ITemplate = {
    _id : '01',
    templateTitle: 'feedback summer 2023',
    instructions:  "We collect colleague feedback yearly. This is an essential tool for developing as a professional for all of us so please fill this form carefully. Especially open comments are very appreciated./nA few reminders:/n1) You are also evaluating your competence manager with the same form. When evaluating, please consider him/her foremost as a manager, not through his/her specialist role. You can see the role from the preselected 'You are providing this feedback as' -question./nWe have a new grading system. Please read the guide on grading carefully./n",
    createdOn: new Date(),
    createdBy: 'Admin',
    categories: [
        {
            category: "Quality Focus",
            questions: [
              "The person produces high quality product",
              "The person aims to improve the quality of the end result beyond expressed requirements (1 - 5)",
            ],
          },
          {
            category: "People Skills",
            questions: [
              "The person communicates effectively",
              "The person shows awareness and respect of colleagues",
            ],
          },
          {
            category: "Self Guidance",
            questions: ["The person is able to effectively direct their own work"],
          },
    ]

}


