const { Router } = require("express")
const { CourseModel } = require("../Models/Course.model.js")
require("dotenv").config()



const CourseController = Router();

CourseController.get("/allcourse", async (req, res) => {
    const courses = await CourseModel.find();
    try {
        res.status(200).send({
            courses: courses,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

CourseController.post("/create", async (req, res) => {
    try {
        const { name, img, des, owner, created, status, isActive, type, price } = req.body;

        const Course = new CourseModel({
            name,
            img,
            des,
            owner,
            created,
            status,
            isActive,
            type,
            price,
        });

        await Course.save();

        res.status(201).json({ message: 'Course created' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

CourseController.get("/get/:id", async (req, res) => {

    try {
        const { id: courseid } = req.params;
        const course = await CourseModel.findById(courseid);
        // console.log("inside...",courses," id : ",courseid)
        if (!course) {
            return res.status(404).json({ message: `No Course with id: ${courseid}` });
        } else {
            res.status(200).json({
                message: `user with id : ${courseid} found successfully`,
                courses: course,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})




CourseController.patch("/patch/:id", async (req, res) => {
    try {
        const { id: courseid } = req.params;
        const course = await CourseModel.findByIdAndUpdate(courseid, req.body, {
            new: true,
            runValidators: true,
        });

        if (!course) {
            return res.status(404).json({ message: `No course with id: ${courseid}` });
        } else {
            res.status(200).json({
                message: `course with id: ${courseid} updated successfully`,
                courses: course,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


CourseController.delete("/delete/:id", async (req, res) => {
    try {
        const { id: courseid } = req.params;
        const course = await CourseModel.findByIdAndDelete(courseid);
        if (!course) {
            return res.status(404).json({ message: `No course with id: ${courseid}` });
        } else {
            res.status(200).json({
                message: `course with id : ${courseid} deleted successfully`,
                courses: course,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});







module.exports = {
    CourseController
}