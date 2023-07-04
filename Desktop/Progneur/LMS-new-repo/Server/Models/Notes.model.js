const mongoose = require("mongoose")

const NotesSchema = mongoose.Schema({
    // contentType: { type: String, required: true },
    path: { type: String, required: true },
    // file: { type: Buffer, required: true },
    title:{ type: String, required: true },
    desc:{ type: String, required: true },
    owner:{ type: String, required: true },
    subject:{ type: String,default: null},
    course:{type:String,default:null},
   lectureNo:{type:Number,default:null},
    number:{ type: Number,default: null},
    isActive: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['draft', 'pending', 'approved', 'rejected'],
        default: 'draft'
    },
})

const NotesModel = mongoose.model("Note1", NotesSchema)

module.exports = {
    NotesModel
}