import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/QuizPage.css";
import questions from "../components/Question"

const QuizPage = () => 
    { 
        const location = useLocation();
        const name = location.state.name;
        const [ currentQuestionIndex, setCurrentQuestionIndex  ] = useState(0);
        const [ selectedOptions, setSelectedOptions ] = useState(Array(questions.length).fill(null));
        const handleQuestionClick = (index) => {
            setCurrentQuestionIndex(index);
        }
        const handleOptionClick = (optionIndex) => {
            const newSelectedOptions = [...selectedOptions];
            newSelectedOptions[currentQuestionIndex] = optionIndex;
            setSelectedOptions(newSelectedOptions);
        }
        const handleSubmit = () => {
            console.log("Selected options:", selectedOptions);
            
            // You can send the selectedOptions to a server or process them as needed
        }
        return(
        <div className="quiz-page">
            <div className="question-numbers">
                {questions.map((_, index) => (
                    <button
                        key={index}
                        className={`question-number ${index == currentQuestionIndex ? "active" : "" }`}
                        onClick={() => handleQuestionClick(index)}
                    >
                        {index+1}
                    </button>
                ))}
            </div>
            <div className="quiz-container" >
                <h1>Welcome,  {name}</h1>
                <div className="question">
                    <h2>{questions[currentQuestionIndex].question}</h2>
                    <div className="options">
                        {questions[currentQuestionIndex].options.map((opt, index) => (
                            <div 
                                key ={index}
                                className={`option ${selectedOptions[currentQuestionIndex] == index ? "selected" : "" }`}
                                onClick={() => handleOptionClick(index)}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
                {currentQuestionIndex == questions.length - 1 && (
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
}
export default QuizPage