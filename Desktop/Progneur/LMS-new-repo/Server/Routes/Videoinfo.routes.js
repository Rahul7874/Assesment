const { Router } = require("express")
const { VideoModel } = require('../Models/Videoinfo.model.js')
const VideoController = Router();





VideoController
.post("/videoinfo", async (req, res) => {
    try {
        const { trainer,
            name,
            course,
            link } = req.body;

      
        

       
        const Video = new VideoModel({
            trainer,
            name,
            course,
            link
        });

      
        await Video.save();

        res.status(201).json({ message: 'Video created' });
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

VideoController.get("/allvideo", async (req, res) => {
    const video = await VideoModel.find();
    try {
        res.status(200).send({
            video: video,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// .get(function (request, response) {
//     console.log("GET / videos");

//     VideoModel.find(function (error, videos) {
//       if (error) {
//         response.status(500).send(error);
//         return;
//       }

//       console.log(videos);

//       response.json(videos);
//     });
//   });




module.exports = {
    VideoController
}