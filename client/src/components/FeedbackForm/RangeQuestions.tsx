import React, { useState } from 'react';
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
            background: `linear-gradient(to right, #4BEBDD ,#A567CC ${percentage}%, grey ${percentage}%)`,
          };
        }
        else if(value ===1){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ${percentage}%, grey ${percentage}%)`,
            };
        }
        else if(value ===2){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F ${percentage}%, grey ${percentage}%)`,
            };
        }
        else if(value ===3){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F, #F85B6B ${percentage}%, grey ${percentage}%)`,
            };
        }
        else if(value ===4){
            
            const percentage = ((value ) / 5) * 100;
            return {
              background: `linear-gradient(to right, #4BEBDD , #A567CC ,#DF2C9F, #F85B6B, #FFF94D ${percentage}%, grey ${percentage}%)`,
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
            <label key={index} style={{ marginRight: "10px",backgroundColor: radioColor,cursor:"pointer",width:"40px",height:"40px", borderRadius:"50%" }}>
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
                <span
                    style={{
                        display: "inline-block", 
                        width: "30px",
                        height: "2px",
                        
                        verticalAlign: "middle",
                    }}
                />
            </label>
        );
    };

    return (
        <div style={{width:"100%", "position": "relative", display:"flex", "justifyContent":"center",flexDirection:"column"}}> 
            <label>{question}</label>
           

            <div style={{flexDirection: 'row', justifyContent: 'space-around', display: 'flex', ...getGradientStyle()}}>
         
                
                    {[1, 2, 3, 4, 5].map((index) => renderRadio(index))}
                   
            </div>
        </div>
    );
}
export default RangeQuestions;