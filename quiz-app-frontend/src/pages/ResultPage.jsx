import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { QuizContext } from '../contexts/QuizContext';
import '../assets/styles/ResultsPage.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const { setIsQuizCompleted, score, questions, selectedOptions } = useContext(QuizContext);

  const handleBackToHome = () => {
    setIsQuizCompleted(false);
    navigate('/');
  };

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
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default ResultPage;