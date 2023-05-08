import React from 'react';
interface question {
    question:string,

}
const BoleanQuestions = ({question}:question) => {
    return (
        <div>
            <h4>{question}</h4>
        </div>
    );
};

export default BoleanQuestions;