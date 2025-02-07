import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/QuizPage.css";
import questions from "../components/Question"

const QuizPage = () => 
    { 
        const location = useLocation();
        const name = location.state.name;
        const [ currentQuestionIndex, setCurrentQuestionIndex  ] = useState(0);

        const handleQuestionClick = (index) => {
            setCurrentQuestionIndex(index);
        };

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
                            <div className="option">
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuizPage