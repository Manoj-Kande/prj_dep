import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Edit.css';

const EditPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState({
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: ''
  });
  const [newAnswer, setNewAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://flash-cards-b7os.vercel.app/questions/${id}`)
      .then(response => response.json())
      .then(data => {
        setQuestion(data);
        setNewQuestion(data.question);
        setNewOptions({
          option_1: data.option_1,
          option_2: data.option_2,
          option_3: data.option_3,
          option_4: data.option_4
        });
        setNewAnswer(data.correct_answer);
      })
      .catch(error => console.error('Error fetching question:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'question') {
      setNewQuestion(value);
    } else if (['option_1', 'option_2', 'option_3', 'option_4'].includes(name)) {
      setNewOptions(prevOptions => ({ ...prevOptions, [name]: value }));
    } else if (name === 'correct_answer') {
      setNewAnswer(value);
    }
  };

  const handleSave = () => {
    fetch(`https://flash-cards-b7os.vercel.app/questionsedit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: newQuestion,
        ...newOptions,
        correct_answer: newAnswer
      })
    })
      .then(response => {
        if (response.ok) {
          alert('Edited successfully',"response",response);
          navigate('/flash_cards/admin');
        } else {
          alert('Failed to edit');
        }
      })
      .catch(error => console.error('Error updating question:', error));
  };

  if (!question) {
    return <p>Loading...</p>;
  }

  return (
    <div className="edit-container">
      <div className="edit-header">Edit Question</div>
      <form>
        <div className="form-row">
          <div className="input-data">
          <label>Question</label>
            <input
              type="text"
              name="question"
              value={newQuestion}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
          <label>Option 1</label>
            <input
              type="text"
              name="option_1"
              value={newOptions.option_1}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            
          </div>
          <div className="input-data">
          <label>Option 2</label>
            <input
              type="text"
              name="option_2"
              value={newOptions.option_2}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
          <label>Option 3</label>
            <input
              type="text"
              name="option_3"
              value={newOptions.option_3}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
           
          </div>
          <div className="input-data">
          <label>Option 4</label>
            <input
              type="text"
              name="option_4"
              value={newOptions.option_4}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
          <label>Correct Answer</label>
            <input
              type="text"
              name="correct_answer"
              value={newAnswer}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            
          </div>
        </div>
        <div className="form-row">
          <div className="input-data submit-btn">
            <div className="inner"></div>
            <input
              type="button"
              value="Save" className='bns'
              onClick={handleSave}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
