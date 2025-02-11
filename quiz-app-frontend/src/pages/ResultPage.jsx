import { useLocation } from "react-router-dom";
import "../assets/styles/ResultsPage.css";

const ResultPage = () => {
    const location = useLocation();
    const { score, questions, selectedOptions } = location.state;

    return (
        <div className="result-page">
            <h1>Quiz Completed</h1>
            <h2>Results:</h2>
            <p>Your score is: {score} out of {questions.length}</p>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>
                        <strong>Question {index + 1}:</strong> {question.question}
                        <br />
                        <strong>Your Answer:</strong> {question.options[selectedOptions[index]]}
                        <br />
                        <strong>Correct Answer:</strong> {question.correctAnswer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultPage;