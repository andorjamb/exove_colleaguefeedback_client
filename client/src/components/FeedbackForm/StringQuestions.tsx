import React from 'react';
import styles from "./FeedbackForm.module.css";

interface question {
    question:string,

}

const StringQuestions = ({question}:question) => {

    return (
        <div className={styles.sMain}>
          
              <p>{question}</p> 
                <textarea className={styles.sTextarea}  name="answer" id="" cols={5} rows={5} placeholder='Type your answer..'>

                </textarea>
        
            

        </div>
    );
};

export default StringQuestions;