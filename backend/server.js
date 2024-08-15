const express = require('express');
const connection = require('./dbm'); // Import the connection from db.js
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 

app.get("/",(req,res)=>{
    res.send("hello world");
});
// app.post('/questions', async (req, res) => {
//     let q = [];
  
//      connection.find({})
//       .then((resp) => {
//         q=resp;
//         res.json(q);
//       })
//       .catch((err) => {
//         console.log("error while fetching the data",err);
//         res.status(500).send({ message: 'Error fetching data' }); // handle error response
//       });
//   });


app.get('/questions', async (req, res) => {
    try {
        const requestBody = req.body;
       
        const questions = await connection.find({}); 
        res.json(questions);
    } catch (err) {
        console.error("Error while fetching the data", err);
        res.status(500).send({ message: 'Error fetching data', error: err.message });
    }
});

app.get('/questions/:id',async (req,res)=>{
    const questionId = parseInt(req.params.id);
    let ress={};

    const ans=await connection.findOne({id:questionId});
    connection.findOne({id:questionId})
    .catch((err)=>{
            console.error('Error fetching question:', error);
            return res.status(500).send('Error fetching question');
    });
    
    res.json(ans);
    
});

app.put('/questionsedit/:id', async (req, res) => {
    const questionId = parseInt(req.params.id, 10); 
    const { question, option_1, option_2, option_3, option_4, correct_answer } = req.body;

    try {
      const result = await connection.updateOne(
        { id: questionId },
        { $set: { question, option_1, option_2, option_3, option_4, correct_answer } }
      );
  
      if (result.nModified === 0) {
        return res.status(404).send('Question not found');
      }
  
      res.send('Question updated successfully');
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).send('Error updating question');
    }
});


// Delete a specific question by ID
app.delete('/questions/:id/delete', async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
  
    try {
      const result = await connection.deleteOne({ id: questionId });
  
      if (result.deletedCount === 0) {
        return res.status(404).send('Question not found');
      }
  
      res.send('Question deleted successfully');
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).send('Error deleting question');
    }
  });


  // Add a new question
app.post('/questions/add', async (req, res) => {
    const { question, option_1, option_2, option_3, option_4, correct_answer } = req.body;
  
    const newQuestion = new connection({
      id: Math.floor(Math.random() * 10000),
      question,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_answer
    });
  
    try {
      await newQuestion.save();
      res.send('Question added successfully');
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).send('Error adding question');
    }
  });
  
  
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


  