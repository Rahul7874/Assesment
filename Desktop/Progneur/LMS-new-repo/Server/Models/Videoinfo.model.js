const mongoose = require("mongoose")

const videoSchema = mongoose.Schema({

    trainer: { type: String,  },
    name: { type: String, },
    course: { type: String,  },
    link: { type: String,  },
    
   


})

const VideoModel = mongoose.model("videoinfo", videoSchema)

module.exports={
    VideoModel
}