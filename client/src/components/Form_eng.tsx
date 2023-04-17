import React from 'react';
import texts from '../text/formText_eng.json';

type FormText = {
    introduction: string;
}

const text = texts as FormText;


const Form_eng = () => {
    return (
        <div>
            <div className="intro">
                {text.introduction}
            </div>


        </div>
    );
};

export default Form_eng;

