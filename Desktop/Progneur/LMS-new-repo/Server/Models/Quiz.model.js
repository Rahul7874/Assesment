const mongoose = require("mongoose")

const QuizSchema = mongoose.Schema({

    // quiz: { type: Object, required: true },

    subject: { type: String, required: true },
    lecture: { type: Number, required: true },
    testtime:{type:Number,required:true},
    owner: { type: String, required: true },
    level: { type: String, required: true },
    quiz: { type: Array, required: true },
   

})

const QuizModel = mongoose.model("quiz", QuizSchema)

module.exports = {
    QuizModel
}