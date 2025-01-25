import { decode } from 'he'
import { useState } from 'react'

function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    } 
    return array;
}

function Question({ question, questionIndex, onAnswer, submitted }) {
    const options = shuffle([...question.incorrect_answers, question.correct_answer])
    // console.log("Options are shuffled")
    const [isUnAttempted, setIsUnattempted] = useState(true)
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedAnsStatus, setSelectedAnsStatus] = useState("")

    const buttons = options.map(option => {
        const handleOptionClick = () => {
            const isCorrect = option === question.correct_answer;
            
            setIsUnattempted(false);
            setSelectedOption(option);
            setSelectedAnsStatus(isCorrect);
            onAnswer(questionIndex, isCorrect);
        }

         let className = 'question--options-btn';
         if (submitted) {
            if (option === question.correct_answer) {
                className += " correct";
            } else if (option === selectedOption) {
                className += " incorrect";
            }
         }

        // const buttonClass = selectedOption === option 
        //     ? (selectedAnsStatus ? "correct" : "incorrect")
        //     : "";

        return (<button 
                 key={option}
                 onClick={handleOptionClick}
                 className={className}
                 disabled={submitted}
                 >{decode(option)}</button>)
        })

    return (
        <>
            <div className="question--question">
                <h3>Q: {decode(question.question)}</h3>
                {isUnAttempted && <p>{`(unattempted)`}</p>}
            </div>
            <div className="question--options">
                {buttons}
            </div>
            <hr></hr>
        </>
    )
}

export default Question