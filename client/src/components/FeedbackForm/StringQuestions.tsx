import React from 'react';

interface question {
    question:string,

}

const StringQuestions = ({question}:question) => {
    console.log('***********',question)
    return (
        <div style={{"display":"flex","flexDirection":"column", "gap":"1rem", alignItems:"flex-start"}}>
          
              <h4>{question}</h4> 
                <textarea style={{"width":"100%"}} name="answer" id="" cols={5} rows={5} placeholder='Type your answer..'>

                </textarea>
        
            

        </div>
    );
};

export default StringQuestions;