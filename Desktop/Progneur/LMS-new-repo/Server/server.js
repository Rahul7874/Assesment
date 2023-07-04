const express = require("express")
const cors = require("cors")
const { userController } = require("./Routes/User.routes.js")
const { TrainerController } = require("./Routes/Trainer.routes.js")
const { CourseController } = require("./Routes/Course.routes.js")
const { LectureController } = require("./Routes/Lecture.routes.js")
const { connection } = require("./Config/db.js")
const { NotesController } = require("./Routes/Notes.routes.js")
const { SubjectController } = require("./Routes/Subjects.routes.js")
const { QuizController } = require("./Routes/Quiz.routes.js")
const { QuizResultController } = require("./Routes/QuizResult.routes.js")
const {PersonalNoteController} =require("./Routes/PersonalNote.routes.js")
const app = express();
const PORT = 8080;
const path = require('path');

app.use(cors());
app.use(express.json())

app.use('/uploads/', express.static(path.join(__dirname, 'uploads')));
app.get("/", (req, res) => {
    res.send("Home page")
})

app.use(cors())


app.use("/user", userController)
app.use("/trainer", TrainerController)
app.use("/course", CourseController)
app.use("/lecture", LectureController)
app.use("/notes", NotesController)
app.use("/subject", SubjectController)
app.use("/quiz", QuizController)
app.use("/quizresult",QuizResultController)
app.use("/personalnote", PersonalNoteController)
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to Mongo Atlas")
    }
    catch (err) {
        console.log("Error while connecting to db")
        console.log(err)
    }
    console.log(`listening on PORT ${PORT}`)
})