import React from "react";

//Components
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import { functionData, newEmailDetails } from "../../types/notification";
import { sendNotification } from "../../functions/notification";

const Feedback = () => {
  const sendEmail = async () => {
    const details:functionData = {
      link: 'string',
      emailTo: 'string',
      from_name: 'string',
      messageBody: 'string',
      applicationId: 'string',
      entityname: 'string',
      subject: 'string',
      reply_to:'string',
      
    }
    const sendemail = sendNotification(details)
    console.log('sendemail ****************',sendemail)
  }
  return (
    <div>
      <button onClick={sendEmail}>send email</button>
      <FeedbackForm />
    </div>
  );
};

export default Feedback;
