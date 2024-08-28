import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'; // Ensure the correct path to your CSS file

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('https://flash-cards-b7os.vercel.app//questions/')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://flash-cards-b7os.vercel.app/questions/${id}/delete`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== id));
        } else {
          alert('Failed to delete');
        }
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      <Link to="/flash_cards/add-question" className="add-btn">Add Question</Link>
      <Link to="/flash_cards" className="add-btn">Back To Home</Link>
      
      <div className="questions-list">
        {questions.map(question => (
          <div key={question.id} className="question-item">
            <div className="question-text">
              <p>{question.question}</p>
              <div className="options">
                <p>1. {question.option_1}</p>
                <p>2. {question.option_2}</p>
                <p>3. {question.option_3}</p>
                <p>4. {question.option_4}</p>
              </div>
              <p>Correct Answer: {question.correct_answer}</p>
            </div>
            <div className="actions">
              <button className="edit-btn">
                <Link to={`/flash_cards/edit/${question.id}`}>Edit</Link>
              </button>
              <button className="delete-btn" onClick={() => handleDelete(question.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
