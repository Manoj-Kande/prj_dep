const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb+srv://2210030472:2210030472@cluster0.hrp4gzh.mongodb.net/");
}

main()
.then(() => {
    console.log("Connected to database successfully");
})
.catch((err) => {
    console.log("Error while connecting to database", err);
});



const questionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true
    },
    question: {
        type: String,
        required: true,
    },
    correct_answer: {
        type: String,
        required: true,
    },
    option_1: {
        type: String,
        required: true,
    },
    option_2: {
        type: String,
        required: true,
    },
    option_3: {
        type: String,
        required: true,
    },
    option_4: {
        type: String,
        required: true,
    }
});

const Question = mongoose.model("Question", questionSchema);


const questionData = [
    {
        id: 1,
        question: "What is the capital of France?",
        correct_answer: "Paris",
        option_1: "London",
        option_2: "Berlin",
        option_3: "Madrid",
        option_4: "Paris"
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        correct_answer: "Mars",
        option_1: "Venus",
        option_2: "Mars",
        option_3: "Jupiter",
        option_4: "Saturn"
    },
    {
        id: 3,
        question: "What is the largest mammal in the world?",
        correct_answer: "Blue Whale",
        option_1: "Elephant",
        option_2: "Giraffe",
        option_3: "Blue Whale",
        option_4: "Shark"
    },
    {
        id: 4,
        question: "Who wrote 'Hamlet'?",
        correct_answer: "William Shakespeare",
        option_1: "Charles Dickens",
        option_2: "J.K. Rowling",
        option_3: "William Shakespeare",
        option_4: "George Orwell"
    },
    {
        id: 5,
        question: "What is the smallest prime number?",
        correct_answer: "2",
        option_1: "1",
        option_2: "2",
        option_3: "3",
        option_4: "5"
    },
    {
        id: 6,
        question: "In which year did the Titanic sink?",
        correct_answer: "1912",
        option_1: "1912",
        option_2: "1905",
        option_3: "1915",
        option_4: "1920"
    },
    {
        id: 7,
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        option_1: "Ag",
        option_2: "Au",
        option_3: "Pb",
        option_4: "Fe"
    },
    {
        id: 8,
        question: "Which is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        option_1: "Atlantic Ocean",
        option_2: "Indian Ocean",
        option_3: "Arctic Ocean",
        option_4: "Pacific Ocean"
    },
    {
        id: 9,
        question: "How many continents are there?",
        correct_answer: "7",
        option_1: "5",
        option_2: "6",
        option_3: "7",
        option_4: "8"
    },
    {
        id: 10,
        question: "Which element has the atomic number 1?",
        correct_answer: "Hydrogen",
        option_1: "Oxygen",
        option_2: "Helium",
        option_3: "Hydrogen",
        option_4: "Carbon"
    },
    {
        id: 11,
        question: "Who painted the Mona Lisa?",
        correct_answer: "Leonardo da Vinci",
        option_1: "Vincent van Gogh",
        option_2: "Pablo Picasso",
        option_3: "Leonardo da Vinci",
        option_4: "Claude Monet"
    },
    {
        id: 12,
        question: "Which country is known as the Land of the Rising Sun?",
        correct_answer: "Japan",
        option_1: "China",
        option_2: "South Korea",
        option_3: "Thailand",
        option_4: "Japan"
    }
];


// Question.insertMany(questionData)
//     .then(() => {
//         console.log("Data inserted successfully");
//     })
//     .catch((err) => {
//         console.log("Error inserting data", err);
//     });
module.exports = Question;

