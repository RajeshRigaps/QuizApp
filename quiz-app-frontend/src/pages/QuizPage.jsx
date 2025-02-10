import { useState , useEffect} from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/QuizPage.css";
import questionsData from "../components/Question"

const shuffleArray = (array) => {
    for(let i= array.length -1; i > 0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuizPage = () => 
    { 
        const location = useLocation();
        const name = location.state.name;
        const [ questions , setQuestions] = useState([]);
        const [ currentQuestionIndex, setCurrentQuestionIndex  ] = useState(0);
        const [ selectedOptions, setSelectedOptions ] = useState([]);
        const [isQuizCompleted, setIsQuizCompleted] = useState(false);

        useEffect(() => {
            // Shuffle questions and options
            const shuffledQuestions = shuffleArray([...questionsData]).map((questionData) => ({
                ...questionData,
                options: shuffleArray([...questionData.options]),
            }));
            setQuestions(shuffledQuestions);
            setSelectedOptions(Array(shuffledQuestions.length).fill(null));
        },[]);
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
            setIsQuizCompleted(true);
            // You can send the selectedOptions to a server or process them as needed
        }
        if (isQuizCompleted) {
            return (
                <div className="quiz-page">
                    <h1>Quiz Completed</h1>
                    <h2>Results:</h2>
                      
                </div>
            );
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
                {questions.length > 0 &&(
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
                </div>)}
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