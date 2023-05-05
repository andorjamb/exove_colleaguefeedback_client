//on object creation: get CM of 'requestedTo', push CM to selectedList
//has 'role' been added?v should the object contain email?

export interface IRequestPicks {
  _id: string;
  requestedTo: string;
  requestedBy: string;
  requestedOn: Date;
  SelectedList: {
    userId: string;
    selectionStatus: boolean; // for HR to approve
    roleLevel: number;
  }[];
  submitted: boolean;
  submittedOn: Date;
}
