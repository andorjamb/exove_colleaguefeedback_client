import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

interface IEmailParameters {
  name: string;
  date: string;
}
const EmailTest = () => {
  const button = useRef();
  const username = ""; //

  const serviceId = "";
  //process.env.REACT_APP_EMAIL_SERVICE_ID;
  const templateId = "";
  const publicKey = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

  let futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);
  console.log(futureDate.toLocaleDateString());

  const emailParameters = {
    name: `${username}`,
    date: futureDate,
  };
  const sendEmail = (e: any) => {
    e.preventDefault();

    //emailjs.send(serviceID, templateID, templateParams, publicKey);

    emailjs
      .send(serviceId, "YOUR_TEMPLATE_ID", emailParameters, "YOUR_PUBLIC_KEY")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      <button ref="button" onClick={sendEmail}>
        Send Email
      </button>
    </div>
  );
};

export default EmailTest;
