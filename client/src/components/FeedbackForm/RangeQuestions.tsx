import React, { useState } from 'react';
import styles from "./FeedbackForm.module.css";

interface question {
    question:string,

}
const RangeQuestions = ({ question }: question) => {
    const [value, setValue] = useState(0);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setValue(Number(e.target.value));
    };
    
    console.log(value)
    const divStyle = {
      
        
    }
    const getGradientStyle = () => {
        if (value === -1) {
          return { background: "linear-gradient(to right, #d5d7d5d1, #d5d7d5d1, #d5d7d5d1)" };
        } else if(value ===0){
            
          const percentage = ((value  ) / 5) * 100;
          return {
            background: `linear-gradient(to right, #4BEBDD ,#A567CC ${percentage}%, #F2F2F2 ${percentage}%)`,
          };
        }
        else if(value ===1){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ${percentage}%, #F2F2F2 ${percentage}%)`,
            };
        }
        else if(value ===2){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F ${percentage}%, #F2F2F2 ${percentage}%)`,
            };
        }
        else if(value ===3){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F, #F85B6B ${percentage}%, #F2F2F2 ${percentage}%)`,
            };
        }
        else if(value ===4){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F, #F85B6B, #FFF94D ${percentage}%, #F2F2F2 ${percentage}%)`,
            };
        }
        else if(value ===5){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F, #F85B6B , #FFF94D  ${percentage}%)`,
            };
          }
      };
    
    // background: `linear-gradient(to right, "#4BEBDD", "#A567CC", "#DF2C9F", "#F85B6B", "#FFF94D", ${percentage}%, grey ${percentage}%)`
    const renderRadio = (index:number) => {
      
            const colors = [
              "#4BEBDD",
              "#A567CC",
              "#DF2C9F",
              "#F85B6B",
              "#FFF94D",
            ];
        
            let radioColor = "rgb(221, 221, 221)";
        
            if (index <= value) {
              radioColor = colors[index - 1];
            } else if (value === 5) {
              radioColor = colors[4];
            }
        

        return (
            <label key={index} className={styles.rLabel} style={{ backgroundColor: radioColor}}>
                <input
                    type="radio"
                    value={index}
                    checked={index === value}
                    onChange={
                        (e) => {
                            console.log(e.target.value)
                            handleRadioChange(e)
                        }}
                    style={{ display: "none"}}
                />
                <span className={styles.rSpan}
                    
                />
            </label>
        );
    };

    return (
        <div className={styles.rMainDiv} > 
            <h3>{question}</h3>
           

            <div className={styles.rAnswer} style={{ ...getGradientStyle()}}>
         
                
                    {[1, 2, 3, 4, 5].map((index) => renderRadio(index))}
                   
            </div>
        </div>
    );
}
export default RangeQuestions;