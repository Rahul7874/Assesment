const mongoose = require("mongoose")

const LectureSchema = mongoose.Schema({
    course: { type: String, required: true },
    courseID: { type: String },
    lecture: { type: String, required: true },
    lname: { type: String, required: true },
    video: { type: String, required: true },
    ldes: { type: String, required: true },
    owner: { type: String, required: true },
    created: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['draft', 'pending', 'approved', 'rejected'],
        default: 'draft'
    },

})

const LectureModel = mongoose.model("lecture", LectureSchema)

module.exports = {
    LectureModel
}