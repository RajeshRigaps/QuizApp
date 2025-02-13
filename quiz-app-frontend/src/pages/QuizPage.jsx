import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';
import '../assets/styles/QuizPage.css';
import questionsData from '../components/Question';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsQuizCompleted, setScore, setQuestions, setSelectedOptions, questions, selectedOptions } = useContext(QuizContext);
  const name = location.state.name;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Shuffle questions and options
    const shuffledQuestions = shuffleArray([...questionsData]).map((questionData) => ({
      question: questionData.question,
      options: shuffleArray([...questionData.options]),
      correctAnswer: questionData.correctAnswer
    }));
    setQuestions(shuffledQuestions);
    setSelectedOptions(Array(shuffledQuestions.length).fill(null));
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
    selectedOptions.forEach((selectedOption, index) => {
      if (questions[index].options[selectedOption] === questions[index].correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsQuizCompleted(true);
    navigate('/result');
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