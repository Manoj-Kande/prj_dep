import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './AddQuestion.css';
const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: ''
  });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'question') {
      setQuestion(value);
    } else if (['option_1', 'option_2', 'option_3', 'option_4'].includes(name)) {
      setOptions(prevOptions => ({ ...prevOptions, [name]: value }));
    } else if (name === 'correct_answer') {
      setCorrectAnswer(value);
    }
  };

  const handleSave = () => {
    fetch('https://backend-wine-theta.vercel.app/questions/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        ...options,
        correct_answer: correctAnswer
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Question added successfully');
          navigate('/flash_cards/admin'); // Redirect to the admin page
        } else {
          alert('Failed to add question');
        }
      })
      .catch(error => console.error('Error adding question:', error));
  };

  return (
    <div className="edit-container">
      

      <h1>Add New Question</h1>
      <form>
        <div className="form-row">
          <div className="input-data">
            <label>Question:</label>
            <input
              type="text"
              name="question"
              value={question}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          {['option_1', 'option_2', 'option_3', 'option_4'].map((option, index) => (
            <div key={option} className="input-data">
              <label>Option {index + 1}:</label>
              <input
                type="text"
                name={option}
                value={options[option]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="form-row">
          <div className="input-data">
            <label>Correct Answer:</label>
            <input
              type="text"
              name="correct_answer"
              value={correctAnswer}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="submit-btn">
            <div className="input-data">
              <input type="button" value="Save" style={{color:'white'}} onClick={handleSave} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
