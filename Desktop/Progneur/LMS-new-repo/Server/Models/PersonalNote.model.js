const mongoose = require("mongoose")

const PersonalNoteSchema = mongoose.Schema({
    Topic: { type: String, required: true },
    Description: { type: String, required: true },
    owner: { type: String, required: true },
    ID: { type: String, required: true },


})

const PersonalNoteModel = mongoose.model("PersonalNote", PersonalNoteSchema)

module.exports = {
    PersonalNoteModel
}