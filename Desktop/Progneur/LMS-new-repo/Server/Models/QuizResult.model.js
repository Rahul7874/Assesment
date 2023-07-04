const mongoose = require("mongoose")

const QuizResultSchema = mongoose.Schema({


    course: { type: String },
    lecture: { type: String},
    user: { type: String },
    UserId:{type:String},
    score: { type: Number },
    currentDate: {
        type: String,
        default: () => {
            const currentDate = new Date();
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            return currentDate.toLocaleDateString(undefined, options);
        }
    },
    currentTime: { type: String, default: () => new Date().toLocaleTimeString() }
   

})

const QuizResultModel = mongoose.model("quizresult", QuizResultSchema)

module.exports = {
    QuizResultModel
}