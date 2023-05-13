//React
import React from "react";
import { useParams } from "react-router-dom";

//styles

//internal imports
import {
  useGetFeedbackByDocIdQuery,
  useGetFeedbackByNameQuery,
} from "../../features/feedbackApi";
//(manager and HR only view)
//check user: if not correct role level, navigate to login

/**
 *
 * Endpoints:
 *
 * feedback/  - get all
 * feedback/:id - get one by doc Id /? or requestPick id?)
 * feedback/name/name  -  get feedbacks by userId (ldapuid?)
 * POST feedback/:id -  post feedback by requestId
 * DELETE feedback/:id -
 * PATCH feedback/submit/:id - requestPicksId: submits a feedback (is this action completed by Essi after approval?)
 */
const Report = () => {
  const { id } = useParams(); //id will be docId
  const { data } = useGetFeedbackByDocIdQuery(id as any);
  console.log(data);

  return <div></div>;
};

export default Report;
