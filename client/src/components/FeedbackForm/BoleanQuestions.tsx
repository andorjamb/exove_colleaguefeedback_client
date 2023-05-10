import  { useState } from 'react';
import styles from "./FeedbackForm.module.css";
import { IQuestionLang, SingleQuiz } from '../../types/template';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../../features/feedBackSlice';


interface question {
  questions: SingleQuiz,
  category:string,

}
const BoleanQuestions = ({ questions, category }: question) => {
  const dispatch =useDispatch()
  const [switchState, setSwitchState] = useState(true);
  const rows = switchState ? 'row' : 'row-reverse';
  // const [booleanQuestion,setBooleanQuestion ] = useState<string>({question:questions.question})


  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log(switchState)
    setSwitchState(!switchState)
    const question: IQuestionLang = {
        _id: questions._id,
        lang: questions.lang,
        question: questions.question,
        answer:(!switchState).toString()
    }
    direction() // change diff display
    dispatch(addQuestion({question,category}))
}
  
    const direction =() =>{
      
        if(switchState){
         return { flexDirection: "row" }
        }
        else {
          return {flexDirection: "row-reverse" }
        }
 
      }
    return (
      <div className={styles.bolContainer}>
       
        <p className={styles.bolQuestion}>{questions.question}</p>      
            <div className={styles.bolComponent} >
          <div className={styles.bolDecision} style={{ flexDirection: rows, transition: "flexDirection ease 4s" }}
            onClick={(e) => handleDivClick(e) }>
      <p className={styles.bolCircle}  >{switchState.toString()}</p>
    </div>
  </div>
        </div>
    );
};

export default BoleanQuestions;