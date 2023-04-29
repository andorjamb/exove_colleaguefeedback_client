//on object creation: get CM of 'requestedTo', push CM to selectedList
//has 'role' been added?v should the object contain email? 

export interface IRequestPicks {
    _id: string,
    requestedTo: string,
    requestedBy: string, 
    requestedOn: Date,
    selectedList: [
      {
        userId: string,
        selectionStatus: boolean // for HR to approve
        selectedBy: string,
        feedBackSubmitted:boolean, 
      },
      ],
      submitted: boolean,
    submittedOn:Date,
}