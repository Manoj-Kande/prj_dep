import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlipCard.css';

const FlipPage = () => {
  const [flipped, setFlipped] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/questions')
      .then(response => {
        if (response.ok) {
          // throw new Error('Network response was not ok');
          console.log("data fetched correctly");
        }
        return response.json();
      })
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer
      }));
    }
    setCurrentQuestionIndex(prevIndex =>
      prevIndex === questions.length - 1 ? 0 : prevIndex + 1
    );
    setFlipped(false);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const handlePrevQuestion = () => {
    if (selectedAnswer) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedAnswer
      }));
    }
    setCurrentQuestionIndex(prevIndex =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
    setFlipped(false);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index]?.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()) {
        newScore += 1;
      }
    });
    return newScore;
  };

  const handleSubmit = () => {
    const newScore = calculateScore();
    setScore(newScore);
    navigate('/flash_cards/score', { state: { score: newScore, totalQuestions: questions.length } });
  };

  const handleQuitQuiz = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate('/flash_cards/score', { state: { score: calculateScore(), totalQuestions: questions.length } });
    }, 2000);
  };

  const handleAdminClick = () => {
    navigate('/flash_cards/admin');
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flip-page-container">
      <div className='divs'>
        <button onClick={handleAdminClick} className="admin-button">
          Admin
        </button>
      </div>
      {showPopup && (
        <div className="popup">
          <p>Exiting from the quiz...</p>
        </div>
      )}

      <div className={`card-container ${flipped ? 'flipped' : ''}`}>
        <div className="card">
          <div className="card-front">
            <h2>{currentQuestion.question}</h2>
            <button onClick={handleFlip} className="flip-button">Show Options</button>
          </div>
          <div className="card-back">
            <h2>{currentQuestion.question}</h2>
            <div className="options-container">
              {[currentQuestion.option_1, currentQuestion.option_2, currentQuestion.option_3, currentQuestion.option_4].map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <button onClick={handleShowAnswer} className="show-answer-button">Show Answer</button>
            {showAnswer && <p>Correct Answer: {currentQuestion.correct_answer}</p>}
            <button onClick={handleFlip} className="flip-button">Show Question</button>
          </div>
        </div>
      </div>
      <div className="navigation">
        <button onClick={handlePrevQuestion} className="nav-button">
          &#8592; {/* Left arrow symbol */}
        </button>
        <button onClick={handleNextQuestion} className="nav-button">
          &#8594; {/* Right arrow symbol */}
        </button>
        <button onClick={handleQuitQuiz} className="quit-button">
          Quit Quiz
        </button>
      </div>
      <div className="submit-section">
        <button onClick={handleSubmit} className="submit-button">
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default FlipPage;
