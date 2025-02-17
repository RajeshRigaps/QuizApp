import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';
import '../assets/styles/QuizPage.css';

const API_URL = 'http://localhost:5000/api/quiz';

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
    fetch(`${API_URL}/questions`)
      .then((res) => res.json())
      .then((data) => {
        // Shuffle questions and options
        const shuffledQuestions = shuffleArray([...data]).map((questionData) => ({
          _id: questionData._id,
          question: questionData.question,
          options: shuffleArray([...questionData.options]),
          correctAnswer: questionData.correctAnswer
        }));
        setQuestions(shuffledQuestions);
        setSelectedOptions(Array(shuffledQuestions.length).fill(null));
      })
      .catch((err) => console.error("Error fetching questions", err));
  }, [setQuestions, setSelectedOptions]);

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleOptionClick = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    const updatedQuestions = questions.map((question, index) => {
      const optedAnswer = question.options[selectedOptions[index]];
      if (optedAnswer === question.correctAnswer) {
        calculatedScore += 1;
      }
      return { ...question, optedAnswer };
    });
    console.log(updatedQuestions);
    setScore(calculatedScore);
    setIsQuizCompleted(true);
    // Submit questions and score
    fetch(`${API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, results: updatedQuestions, score: calculatedScore }),
    })
    .then((res) => res.json())
    .then(() => {
      console.log("Quiz submitted!");
      navigate('/result');
    })
    .catch((err) => console.error("Error submitting quiz:", err));
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
        <h1>Welcome, {name}</h1>
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
        {currentQuestionIndex === questions.length - 1 && (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;