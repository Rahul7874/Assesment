const mongoose = require("mongoose")

const SubjectSchema = mongoose.Schema({

    name: { type: String, required: true },
    img: { type: String, required: true },
    des: { type: String, required: true },
    owner: { type: String, required: true },
    created: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['draft', 'pending', 'approved', 'rejected'],
        default: 'draft'
    },

})

const SubjectModel = mongoose.model("subject", SubjectSchema)

module.exports = {
    SubjectModel
}