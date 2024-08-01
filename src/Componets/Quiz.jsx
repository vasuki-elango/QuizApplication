import React, { useEffect, useState } from 'react'
import '../Style/Quiz.css'
import questionset from './QuizSet.json'

export const Quiz = () =>  {
    const [currentquestion,setcurrentquestion] = useState(0);
    const [score,setscore] = useState(0);
    const [showscore,setshowscore] = useState(false);
    const [timer,settimer] = useState(20);


    const handleAnswerClick=(selectedoption)=>{
        if(selectedoption===questionset[currentquestion].correctoptions){
            setscore((prevscore)=>prevscore+1);
        }   
        if(currentquestion<questionset.length-1){
            setcurrentquestion((prevQuestion)=>
                prevQuestion+1);
                settimer(20);
        }
        else{
            setshowscore(true);
        }
    }
    const resetquiz =()=>{
        setcurrentquestion(0)
        setscore(0);
        setshowscore(false);
        settimer(20);
    }
    useEffect(()=>{
        let interval;
        if(timer>0 && !showscore){
            interval=setInterval(() => {
                settimer(prevtimer=>(prevtimer-1));
            }, 1000);
        }
        else{
            clearInterval(interval);
            setshowscore(true);
        }
        return()=> clearInterval(interval);
    },[timer,showscore]);
  return (
    <>
    <div className="quiz-app">
        {
            showscore ? (
            <div className="score-section" >
                <h1>Welcome to Programming Quiz</h1>
                <p>Number of Questions :{questionset.length}</p>
                <p>Your Score : {score}</p>
                <button onClick={resetquiz}>Let Start</button>
            </div>
            ):(
                <div className="question-section">
                    <h2>Question {currentquestion+1}</h2>
                    <p>{questionset[currentquestion].question}</p>
                    <div className="options">
                        {questionset[currentquestion]
                        .options.map((option,index)=>(
                            <button key={index} 
                            onClick={()=>handleAnswerClick(option)} >{option}</button>
                        ))}
                    </div>
                    <div className="timer">
                        Time Left: <span>{timer}s</span>
                    </div>
                </div>
            )
        }
    </div>
    </>
  )
}
