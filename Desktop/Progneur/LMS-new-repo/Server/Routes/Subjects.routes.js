const { Router } = require("express")
const { SubjectModel } = require("../Models/Subject.model.js")
require("dotenv").config()


const SubjectController = Router();
SubjectController.get("/get/:id", async (req, res) => {

    try {
        const { id: subid } = req.params;
        const subject = await SubjectModel.findById(subid);
        // console.log("inside...",courses," id : ",courseid)
        if (!subject) {
            return res.status(404).json({ message: `No subject with id: ${subid}` });
        } else {
            res.status(200).json({
                message: `subject with id : ${subid} found successfully`,
                subjects: subject,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})
SubjectController.delete("/delete/:id", async (req, res) => {
    try {
        const { id: subid } = req.params;
        const subject = await SubjectModel.findByIdAndDelete(subid);
        if (!subject) {
            return res.status(404).json({ message: `No course with id: ${subid}` });
        } else {
            res.status(200).json({
                message: `course with id : ${subid} deleted successfully`,
                subjects: subject,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

SubjectController.get("/allsubject", async (req, res) => {
    const subjects = await SubjectModel.find();
    try {
        res.status(200).send({
            subjects: subjects,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
SubjectController.post("/create", async (req, res) => {
    try {
        const { name, img, des, owner, created, status, isActive } = req.body;

        const Subject = new SubjectModel({
            name,
            img,
            des,
            owner,
            created,
            status,
            isActive
        });

        await Subject.save();

        res.status(201).json({ message: 'Subject created' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = {
    SubjectController
}