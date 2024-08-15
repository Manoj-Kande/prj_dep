import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ScorePage.css';

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  const handleBackToQuiz = () => {
    navigate('/flash_cards');
  };

  return (
    <div className="score-page-container">
      <h1>Your Score</h1>
      <p>{score} / {totalQuestions}</p>
      <button onClick={handleBackToQuiz} className="back-to-quiz-button">
        Back to Quiz
      </button>
    </div>
  );
};

export default ScorePage;
