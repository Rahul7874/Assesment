const { Router } = require("express")
require("dotenv").config()
const { QuizModel } = require("../Models/Quiz.model.js")
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')
const path = require('path')

const upload = multer();
// const AikenParser = require('aiken-parser');


const QuizController = Router();


QuizController.post("/upload", upload.single('file'), async (req, res) => {
  try {

    // const file = req.file.buffer.toString('utf-8');
    // const parser = new AikenParser(file);
    // const quiz = file.parse();
    // const fileContents = fs.readFileSync(file).toString()

    // console.log("data quiz : ",req.body)



    //----------------------------------------------------------------------------------------------------

    // const fileString = req.file.buffer.toString('utf-8');
    // let questionNumber = 1;
    // let aikenString = "";
    // const lines = fileString.split("\n");

    // for (let i = 0; i < lines.length; i++) {
    //   const line = lines[i].trim();

    //   // Skip empty lines
    //   if (line.length === 0) {
    //     continue;
    //   }

    //   // Add question number
    //   aikenString += `${questionNumber}. `;

    //   // Add question text
    //   const questionEnd = line.indexOf("?");
    //   const question = line.substring(0, questionEnd + 1);
    //   aikenString += question.trim();
    //   aikenString += "\n";

    //   // Add answer choices
    //   const choices = line.substring(questionEnd + 1).trim().split(",");
    //   for (let j = 0; j < choices.length; j++) {
    //     aikenString += `${String.fromCharCode(65 + j)}. ${choices[j].trim()}\n`;
    //   }

    //   // Add newline after each question
    //   aikenString += "\n";

    //   // Increment question number
    //   questionNumber++;
    // }

    // console.log("aiken string converted : ---- ",aikenString);


    //---------------------------------------------------------------------------------------------------------------












    // console.log("Original File : ",file,"________________________________________________")



    //---------------------------------------------------------------------------------------------------------------


    // const str = file.toString();

    // // console.log("Str------------------------------",str)

    //         const fileData = fs.readFileSync(file, "utf8");
    //         console.log( "String file : ",fileData )
    // console.log("File--------- : ",quiz)

    // if (typeof quiz === 'object') {

    //     console.log(' the value is of type string');
    //   } else if(typeof quiz === 'string') {
    //     console.log(' the value is  of type string');
    //   }
    //   else{
    //     console.log("not............................")
    //   }



    //---------------------------------------------------------------------------------------------------------------
    // console.log("uploaded body subject : ",req.body.subject)
    const fileContents = req.file.buffer.toString('utf-8');
    const lines = fileContents.split('\n');

    let currentQuestion = null;
    const questions = [];

    for (const line of lines) {
      if (line.startsWith('A)') || line.startsWith('B)') || line.startsWith('C)') || line.startsWith('D)') || line.startsWith('E)')) {
        // This line is an answer choice
        if (!currentQuestion) {
          throw new Error('Answer choice found without question');
        }
        currentQuestion.choices.push(line.substring(2).trim());
      } else if (line.startsWith('ANSWER:')) {
        // This line is the correct answer
        if (!currentQuestion) {
          throw new Error('Answer found without question');
        }
        currentQuestion.answer = line.substring(7).trim();
        questions.push(currentQuestion);
        currentQuestion = null;
      } else {
        // This line is part of the question
        if (currentQuestion) {
          currentQuestion.text += '\n' + line.trim();
        } else {
          currentQuestion = {
            text: line.trim(),
            choices: [],
            answer: null
          };
        }
      }
    }



    //---------------------------------------------------------------------------------------------------------------




    //    const quiz={
    //     info:{},
    //     quizzes:[]
    //    }

    //    quiz.info.owner=req.body.owner;
    //    quiz.info.subject=req.body.subject;
    //    quiz.info.lecture=req.body.lecture;
    //    quiz.quizzes=questions
    //    quiz.quizzes.push(questions)

    const owner = req.body.owner;
    const subject = req.body.subject;
    const lecture = req.body.lecture;
    const testtime = req.body.testtime;
    const level = req.body.level;
    const quiz = questions




    const Quiz = new QuizModel({
      subject,
      lecture,
      testtime,
      level,
      owner,
      quiz

    });

    await Quiz.save();

    res.status(201).json({ message: 'Quiz Uploaded...' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


QuizController.get("/allquizzes", async (req, res) => {
  const quizzes = await QuizModel.find();
  try {
    res.status(200).send({
      quizzes: quizzes,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

QuizController.get("/onequiz/:name/:lecture/:level", async (req, res) => {

  const { name, lecture, level } = req.params;

  QuizModel.findOne({ subject: name, lecture: parseInt(lecture), level: level })
    .exec()
    .then(foundQuiz => {
      if (foundQuiz) {

        console.log
        res.json(foundQuiz);
      } else {
        res.status(404).json({ message: 'Quiz not found' });
      }
    })
    .catch(error => {

      res.status(500).json({ error: error.message });
    });

});
QuizController.get("/lecturequiz/:name/:lecture", async (req, res) => {

  const { name, lecture } = req.params;

  QuizModel.find({ subject: name, lecture: parseInt(lecture) })
    .exec()
    .then(foundQuiz => {
      if (foundQuiz) {

        console.log
        res.json(foundQuiz);
      } else {
        res.status(404).json({ message: 'Quiz not found' });
      }
    })
    .catch(error => {

      res.status(500).json({ error: error.message });
    });

});




// QuizController.get("/singlequizz/:name/:lecture", async (req, res) => {
//   const { name, lecture } = req.params;
//   QuizModel.findOne({ course: name, lectureNo: parseInt(lecture) })
//     .exec()
//     .then(foundCourse => {
//       if (foundCourse) {

//         res.json(foundCourse);
//       } else {
//         res.status(404).json({ message: 'quiz not found' });
//       }
//     })
//     .catch(error => {
//       // Handle the error
//       res.status(500).json({ error: error.message });
//     });
// });

module.exports = {
  QuizController
}