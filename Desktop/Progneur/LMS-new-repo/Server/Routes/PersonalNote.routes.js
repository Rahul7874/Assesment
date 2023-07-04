const { Router } = require("express")

require("dotenv").config()

const { PersonalNoteModel } = require("../Models/PersonalNote.model.js")

const PersonalNoteController = Router();


PersonalNoteController.get("/get", async (req, res) => {
    const PersonalNote = await PersonalNoteModel.find();
    try {
        res.status(200).send({
            PersonalNote: PersonalNote,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

PersonalNoteController.post("/create", async (req, res) => {
    try {
        const { Topic,Description,owner,ID } = req.body;

        const PersonalNote = new PersonalNoteModel({
            Topic,Description,owner,ID
        });

        await PersonalNote.save();

        res.status(201).json({ message: 'personalnote created' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


PersonalNoteController.get("/get/:id", async (req, res) => {

    try {
        const { id: personalnoteid } = req.params;
        const personalnote = await PersonalNoteModel.findById(personalnoteid);
        if (!personalnote) {
            return res.status(404).json({ message: `No note with id: ${personalnoteid}` });
        } else {
            res.status(200).json({
                message: `personalnote with id : ${personalnoteid} found successfully`,
                personalnote: personalnote,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

PersonalNoteController.delete("/delete/:id", async (req, res) => {
    try {
        const { id: personalnoteid } = req.params;
        const personalnote = await PersonalNoteModel.findByIdAndDelete(personalnoteid);
        if (!personalnote) {
            return res.status(404).json({ message: `No note with id: ${personalnoteid}` });
        } else {
            res.status(200).json({
                message: `personalnote with id : ${personalnoteid} deleted successfully`,
                personalnote: personalnote,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

PersonalNoteController.patch("/patch/:id", async (req, res) => {
    try {
        const { id: personalnoteid } = req.params;
        const personalnote = await PersonalNoteModel.findByIdAndUpdate(personalnoteid, req.body, {
            new: true,
            runValidators: true,
        });

        if (!personalnote) {
            return res.status(404).json({ message: `No Note with id: ${personalnoteid}` });
        } else {
            res.status(200).json({
                message: `note with id: ${personalnoteid} updated successfully`,
                personalnote: personalnote,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = {
    PersonalNoteController
}