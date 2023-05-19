import React from "react";

//Components
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import { toast } from "react-toastify";
import { functionData } from "../../types/notification";
import { sendNotification } from "../../functions/notification";

const Feedback = () => {
  const sendEmail = async () => {
    const details: functionData = {
      link: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQScA7p2q5GDil58X2C_xhJ9BrsRAR2YFt1O9MqAbJxPEr8hYi7",
      emailTo: "lera.vagapova@gmail.com",
      from_name: "Exove HR Office",
      messageBody:
        "Please Select a list of minimum 5 individual who will access you",
      applicationid: "0d7e444c-0ea4-4b7d-a75d-0d243642f91d",
      entityname: "RequestPicks",
      subject: "Submit Reviewee",
      reply_to: "y.nomore@gmail.com",
    };
    const sendemail = await sendNotification(details);
    console.log("sendemail ****************", sendemail);
    toast.success("Success message");
  };

  return (
    <div>
      <button onClick={sendEmail}>send email</button>
      <FeedbackForm />
    </div>
  );
};

export default Feedback;
