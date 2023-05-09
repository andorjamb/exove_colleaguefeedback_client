import React, { useState } from 'react';
import styles from "./FeedbackForm.module.css";

interface question {
    question:string,

}
const BoleanQuestions = ({question}:question) => {
    const [switchState, setSwitchState] = useState(true);
    const rows =switchState? 'row' : 'row-reverse';
    const direction =() =>{
        console.log(switchState)
        if(switchState){
            setSwitchState(!switchState)
         return { flexDirection: "row" }
        }
        else {
            setSwitchState(!switchState)
          return {flexDirection: "row-reverse" }
        }
      
      }
    return (
        <div className={styles.bolContainer}>
            <p className={styles.bolQuestion}>{question}</p>
            <div className={styles.bolComponent} >
  <div className={styles.bolDecision} style={{  flexDirection:rows, transition:"flexDirection ease 4s" }} onClick={direction}>
      <p className={styles.bolCircle}  >{switchState.toString()}</p>
    </div>
  </div>
        </div>
    );
};

export default BoleanQuestions;