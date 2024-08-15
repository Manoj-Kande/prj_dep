const express = require('express');
const connection = require('./dbm'); // Import the connection from db.js
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 

// Fetch all questions
app.get('/questions', (req, res) => {
  const query = 'SELECT * FROM questions';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching questions:', error);
      return res.status(500).send('Error fetching questions');
    }
    res.json(results);
  });
});

// Fetch a specific question by ID
app.get('/questions/:id', (req, res) => {
  const questionId = req.params.id;
  const query = 'SELECT * FROM questions WHERE id = ?';
  connection.query(query, [questionId], (error, results) => {
    if (error) {
      console.error('Error fetching question:', error);
      return res.status(500).send('Error fetching question');
    }
    if (results.length === 0) {
      return res.status(404).send('Question not found');
    }
    res.json(results[0]);
  });
});

// Update a specific question by ID
app.put('/questions/:id', (req, res) => {
  const questionId = req.params.id;
  const { question, option_1, option_2, option_3, option_4, correct_answer } = req.body;

  const query = `
    UPDATE questions
    SET question = ?, option_1 = ?, option_2 = ?, option_3 = ?, option_4 = ?, correct_answer = ?
    WHERE id = ?
  `;

  connection.query(query, [question, option_1, option_2, option_3, option_4, correct_answer, questionId], (error, results) => {
    if (error) {
      console.error('Error updating question:', error);
      return res.status(500).send('Error updating question');
    }
    res.send('Question updated successfully');
  });
});

// Delete a specific question by ID
app.delete('/questions/:id', (req, res) => {
  const questionId = req.params.id;
  const query = 'DELETE FROM questions WHERE id = ?';

  connection.query(query, [questionId], (error, results) => {
    if (error) {
      console.error('Error deleting question:', error);
      return res.status(500).send('Error deleting question');
    }
    res.send('Question deleted successfully');
  });
});

// Add a new question
app.post('/questions', (req, res) => {
  const { question, option_1, option_2, option_3, option_4, correct_answer } = req.body;
  const query = `
    INSERT INTO questions (question, option_1, option_2, option_3, option_4, correct_answer)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [question, option_1, option_2, option_3, option_4, correct_answer], (error, results) => {
    if (error) {
      console.error('Error adding question:', error);
      return res.status(500).send('Error adding question');
    }
    res.send('Question added successfully');
  });
});

app.get("/",(req,res)=>{
  res.send("hello world");
}
);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
