//React
import React from "react";
import { useParams } from "react-router-dom";

//styles

//internal imports
import { useGetFeedbackByDocIdQuery } from "../../features/feedbackApi";

const Report = () => {
  const { id } = useParams(); //id will be docId
  const { data } = useGetFeedbackByDocIdQuery(id as any);
  console.log(data);

  return <div></div>;
};

export default Report;
