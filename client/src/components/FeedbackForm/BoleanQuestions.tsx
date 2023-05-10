import React, { useState } from 'react';
import styles from "./FeedbackForm.module.css";

interface passesProp{
  question: Iquestion,
  direction:React.MouseEventHandler<HTMLDivElement>
}
interface Iquestion {
  question: string,
  answer?: boolean,

}
const BoleanQuestions = ({question}:Iquestion) => {
  const [switchState, setSwitchState] = useState(true);
  const rows = switchState ? 'row' : 'row-reverse';
  const [booleanQuestion,setBooleanQuestion ] = useState<Iquestion>({question:question})
  
    const direction =() =>{
      
      setBooleanQuestion({ ...booleanQuestion, answer: switchState })
      console.log(booleanQuestion)
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
        <>
        { console.log(booleanQuestion)}
        </>
      
            <div className={styles.bolComponent} >
  <div className={styles.bolDecision}  style={{  flexDirection:rows, transition:"flexDirection ease 4s" }} onClick={direction }>
      <p className={styles.bolCircle}  >{switchState.toString()}</p>
    </div>
  </div>
        </div>
    );
};

export default BoleanQuestions;