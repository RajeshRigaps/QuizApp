import React, { createContext, useState } from 'react';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <QuizContext.Provider value={{ isQuizCompleted, setIsQuizCompleted, score, setScore, questions, setQuestions, selectedOptions, setSelectedOptions }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };

