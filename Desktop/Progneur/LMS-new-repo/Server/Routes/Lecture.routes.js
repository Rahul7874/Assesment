const { Router } = require("express")
require("dotenv").config()
const { LectureModel } = require("../Models/Lecture.model.js")


const LectureController = Router();


LectureController.get("/getlecture", async (req, res) => {
    const lecture = await LectureModel.find();
    try {
        res.status(200).send({
            lecture: lecture,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


LectureController.get("/getlecture/:id", async (req, res) => {

    try {
        const { id: lectureid } = req.params;
        const lecture = await LectureModel.findById(lectureid);
        if (!lecture) {
            return res.status(404).json({ message: `No Course with id: ${lectureid}` });
        } else {
            res.status(200).json({
                message: `user with id : ${lectureid} found successfully`,
                lecture: lecture,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

LectureController.get("/getlectureforTrainer/:course", async (req, res) => {

    try {
        // const { id: courseid } = req.params.course;
        // console.log("course1 : ",req.params)
        
        const lecture = await LectureModel.find(course = req.params);
        if (!lecture) {
            return res.status(404).json({ message: `No Course with id: ${req.params}` });
        } else {
            // console.log("course : ",req.params)
            res.status(200).json({
                message: `user with id : ${req.params} found successfully`,
                lecture: lecture,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})



LectureController.post("/create", async (req, res) => {
    try {
        const { course, courseID, lecture, lname, video, ldes, owner, created, status, isActive } = req.body;

        const Course = new LectureModel({
            course,
            courseID,
            lecture,
            lname,
            video,
            ldes,
            owner,
            created,
            status,
            isActive
        });

        await Course.save();

        res.status(201).json({ message: 'Lecture created' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


LectureController.patch("/patch/:id", async (req, res) => {
    try {
        const { id: lectureid } = req.params;
        const lecture = await LectureModel.findByIdAndUpdate(lectureid, req.body, {
            new: true,
            runValidators: true,
        });

        if (!lecture) {
            return res.status(404).json({ message: `No course with id: ${lectureid}` });
        } else {
            res.status(200).json({
                message: `course with id: ${lectureid} updated successfully`,
                lecture: lecture,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

LectureController.delete("/delete/:id", async (req, res) => {
    try {
        const { id: lectureid } = req.params;
        const lecture = await LectureModel.findByIdAndDelete(lectureid);
        if (!lecture) {
            return res.status(404).json({ message: `No lecture with id: ${lectureid}` });
        } else {
            res.status(200).json({
                message: `lecture with id : ${lectureid} deleted successfully`,
                lecture: lecture,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = {
    LectureController
}
