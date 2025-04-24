import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';
import '../assets/styles/QuizPage.css';

const API_URL = import.meta.env.VITE_API_URL;
//const API_URL = 'http://localhost:5000/api/quiz';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuizPage = () => {
  const navigate = useNavigate();
  const { name, setIsQuizCompleted, setScore, setQuestions, setSelectedOptions, questions, selectedOptions } = useContext(QuizContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/questions`, {credentials : 'include'})
      .then((res) => res.json())
      .then((data) => {
        // Shuffle questions and options
        const shuffledQuestions = shuffleArray([...data]).map((questionData) => ({
          _id: questionData._id,
          question: questionData.question,
          options: shuffleArray([...questionData.options])
        }));
        setQuestions(shuffledQuestions);
        setSelectedOptions(Array(shuffledQuestions.length).fill(null));
      })
      .catch((err) => console.error("Error fetching questions", err));
  }, [setQuestions, setSelectedOptions]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // This is required for Chrome to show the alert
      return 'Are you sure you want to leave? Your quiz will be cancelled.';
    };

    const handleUnload = () => {
      alert('Quiz cancelled. Navigating to home.');
      navigate('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [navigate]);

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleOptionClick = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    // Submit questions and score
    fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, questions, selectedOptions }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Quiz submitted!");
      setScore(data.score);
      setQuestions(data.results) 
      setIsQuizCompleted(true);
      navigate('/result');
    })
    .catch((err) => console.error("Error submitting quiz:", err));
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="quiz-page">
      <div className="question-numbers">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`question-number ${index === currentQuestionIndex ? 'active' : ''}`}
            onClick={() => handleQuestionClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="quiz-container">
        {currentQuestionIndex === 0 && (<h1>Welcome, {name}</h1>)}
        {questions.length > 0 && (
          <div className="question">
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${selectedOptions[currentQuestionIndex] === index ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(index)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={handlePreviousClick} disabled={currentQuestionIndex === 0}>
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button onClick={handleNextClick}>
              Next
            </button>
          ) : (
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;