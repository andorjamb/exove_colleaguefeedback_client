export interface IRequestPicks {
  _id: string;
  requestedTo: string;
  requestedBy: string;
  requestedOn: Date;
  selectedList: {
    userId: string;
    selectionStatus: boolean; // for HR to approve
    selectedBy: string;
    selectedRole: string;
    feedBackSubmitted: boolean;
  }[];
  submitted: boolean;
  submittedOn: Date;
}
