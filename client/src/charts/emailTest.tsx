import React from "react";
import emailjs from "@emailjs/browser";

/* interface IEmailParameters {
  name: string;
  date: string;
  link: string;
} */
const EmailTest = () => {
  const username = "";
  const link = "";

  const serviceId = "service_s3jvp7d";
  //process.env.REACT_APP_EMAIL_SERVICE_ID;
  const templateId = "requestPicks";
  const publicKey = "";
  //process.env.REACT_APP_EMAIL_PUBLIC_KEY;

  let date = new Date();
  date.setDate(date.getDate() + 14);
  let futureDate = date.toLocaleDateString();
  console.log(futureDate); //debugging

  const emailParameters = {
    name: `${username}`,
    date: futureDate,
    link: "",
  };
  const sendEmail = (e: any) => {
    e.preventDefault();

    //emailjs.send(serviceID, templateID, templateParams, publicKey);

    emailjs.send(serviceId, templateId, emailParameters, publicKey).then(
      (result: any) => {
        console.log(result.text);
      },
      (error: any) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default EmailTest;
