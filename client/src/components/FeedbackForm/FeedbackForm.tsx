import React from "react";

//Survey packages
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

//Styling
import styles from "./FeedbackForm.module.css";

const FeedbackForm = () => {
  const survey = new Model();

  return (
    <div>
      <Survey model={survey} />
    </div>
  );
};

export default FeedbackForm;
