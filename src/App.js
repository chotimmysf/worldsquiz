import React from "react";
import './App.css';
import { questionBank } from "./questionBank";
import { useState } from "react";

export default function App() {
  const [ currentQuestion, setCurrentQuestion ] = React.useState(0);
  const [ askedQuestions, setAskedQuestions ] = React.useState(0);
  const [ score, setScore ] = React.useState(0);
  const [ showScore, setShowScore ] = React.useState(false);

  const correctAnswerHandler = (isCorrect) => {
    
    const generateAskedQuestions = () => {
      var askedQuestions = [];
      var setAskedQuestions = questionBank[Math.round(Math.random()*questionBank.length)+1];
      askedQuestions = askedQuestions.push(setAskedQuestions);
      return askedQuestions;
    }
    generateAskedQuestions();

    if(isCorrect) {
      setScore(score+1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionBank.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  function reloadPage() {
    window.location.reload(true);
  }

  return (
    <div className="App">
      <header className="quiz-header">
        <h1>World's Randomest Quiz</h1>
        <p>Take the world's randomest quiz!</p>
      </header>
      <div class="quiz-container">
        {showScore ? (
          <section className="show-score-section">
            You got {score} out of {questionBank.length} questions correct!
            <button onClick={reloadPage}>Start a New Quiz</button>
          </section>
        ):(
          <>
            <section className='question-section'>
                <h2>Question {currentQuestion + 1}</h2>
                <p className="remaining-questions">{questionBank.length - currentQuestion - 1} questions left</p>
                <h3>{questionBank[currentQuestion].questionText}</h3>
            </section>
            
            <section className='answers-section'>
                {questionBank[currentQuestion].answerChoices.map((item) => (
              <button onClick={() => correctAnswerHandler(item.isCorrect)}>
                {item.answerText}
              </button>
            ))}
            </section>
          </>
          )}
      </div>
    </div>
  );
}
