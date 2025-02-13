import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { QuizContext } from '../contexts/QuizContext';

const ProtectedQuizRoute = ({ children }) => {
  const { isQuizCompleted } = useContext(QuizContext);

  // If the quiz is completed, redirect to the results page with state.
  if (isQuizCompleted) {
    return (
      <Navigate
        to="/result"
        replace
      />
    );
  }

  // Otherwise, render the intended component.
  return children;
};

export default ProtectedQuizRoute;
