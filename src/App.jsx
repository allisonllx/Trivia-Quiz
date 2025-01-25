import { useState, useEffect } from 'react'
import Modal from "react-modal"
import './App.css'
import Header from './components/Header'
import Question from './components/Question'
import Outcome from './components/Outcome'
import Leaderboard from './components/Leaderboard'
import { saveScore } from './utils/playerInfo'
 
Modal.setAppElement("#root");

function App() {
  // initialise states
  const [name, setName] = useState("")
  const [score, setScore] = useState(null)
  const [allQuestions, setAllQuestions] = useState([])
  const [showQuestions, setShowQuestions] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [resetTrigger, setResetTrigger] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch data
  useEffect(() => {
    async function getQuestions() {
      try {
        const res = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium');
        const data = await res.json();
        console.log("Fetched questions:", data.results);
        setAllQuestions(data.results);
        console.log("Updated allQuestions:", allQuestions);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    }
    if (resetTrigger || allQuestions.length == 0) {
      getQuestions();
      setResetTrigger(false);
    }

  }, [resetTrigger])

  // Update db
  useEffect(() => {
    if (score !== null) {  // Check if score has been set
        // Upload score to Firestore
        saveScore(name, score).then(() => {
            console.log('Score uploaded successfully!');
        }).catch((error) => {
            console.error("Error uploading score:", error);
        });
    }
  }, [score]);

  let totalUnattempted = allQuestions.length;                                                          

  const onClickStart = (name) => {
    console.log("Start button is clicked");
    setShowQuestions(true);
    setName(name);
    totalUnattempted = allQuestions.length;
  }

  const onSubmit = () => {
    setIsModalOpen(true);
  }

  if (isModalOpen) {
    const totalQns = allQuestions.length;
    const totalAttempted = userAnswers.filter(ans => ans !== undefined).length;
    totalUnattempted = totalQns - totalAttempted;
  }      

  const onConfirm = () => {
    console.log("Submission confirmed")
    setIsModalOpen(false);
    setSubmitted(true);
    calculateScore();
  }

  const onReset = () => {
    setName(""); 
    setScore(null);
    setSubmitted(false);
    setUserAnswers([]);
    setShowResults(false);
    setShowQuestions(false); // return back to starting page to allow for time to reload a new set of questions
    setResetTrigger(true);
  }

  const calculateScore = () => {
    let totalScore = 0;
    userAnswers.forEach(answer => {
      if (answer) {
        totalScore += 1;
      }
    })
    setScore(totalScore);
  }

  const handleAnswer = (questionIndex, isCorrect) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = isCorrect;
    setUserAnswers(updatedAnswers); 
    console.log(updatedAnswers);
  }

  const questionElements = allQuestions.map((question, index) => <Question key={index}
                                                                  question={question} 
                                                                  questionIndex={index}
                                                                  onAnswer={handleAnswer}
                                                                  submitted={submitted} />)

  return (
    <>
      {!showQuestions && <Header onClick={onClickStart} />}
      {showQuestions && allQuestions.length > 0 && questionElements} 
      {showQuestions && allQuestions.length > 0 && !submitted && 
       <button className="submit-btn" onClick={onSubmit}>Submit</button>}
       <Modal isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Confirm Submission"
              style={{
                content: {
                  maxWidth: "300px",
                  maxHeight: "180px",
                  margin: "auto",
                  padding: "0px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }
              }}>
          <h3>Confirm Submission</h3>
          {totalUnattempted !== 0 
           ? <p>You have {totalUnattempted} question{totalUnattempted > 1 ? 's' : ''} unattempted</p> 
           : <p>Do you want to submit your answers?</p>}
          <div className="modal-btn">
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </Modal>
      {submitted && (
        <>
          <Outcome score={score} length={allQuestions.length} onClick={onReset}/>
          <Leaderboard /> 
        </>)}
    </>
  )
}

export default App
