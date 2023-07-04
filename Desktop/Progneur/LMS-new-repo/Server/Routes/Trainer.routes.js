const { Router } = require("express")
const bcrypt = require('bcrypt');
const { TrainerModel } = require('../Models/Trainer.model.js')
const TrainerController = Router();
const jwt = require("jsonwebtoken")
require("dotenv").config()



TrainerController.post("/signup", async (req, res) => {
    try {
        const { fname, lname, mobno, headline,
            location,
            about,
            linkedin,
            website,
            college,
            degree,
            estart,
            eend,
            cstart,
            cleaving, email, password, position, company, education, skills, avatar,created, roles, isAdmin, isActive } = req.body;

        // check if email already exists
        const existingUser = await TrainerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user object with hashed password
        const Trainer = new TrainerModel({
            fname,
            lname,
            mobno,
            headline,
            location,
            about,
            linkedin,
            website,
            college,
            degree,
            estart,
            eend,
            cstart,
            cleaving,
            email, password: hashedPassword,
            position,
            company,
            education,
            skills, avatar,
            created,
            roles,
            isAdmin,
            isActive
        });

        // save new user to database
        await Trainer.save();

        res.status(201).json({ message: 'Trainer created' });
        //res.json({ msg: "Signup successfull" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


TrainerController.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists with given email
        const trainer = await TrainerModel.findOne({ email });
        if (!trainer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // compare provided password with hashed password
        const isPasswordCorrect = await bcrypt.compare(password, trainer.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // password is correct, create and send JWT token
        const token = jwt.sign({ userId: trainer._id, userName: trainer.fname, isAdmin: trainer.isAdmin }, process.env.JWT_SECRET);
        res.json({ token });
        // console.log(token)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

TrainerController.get("/get/:id", async (req, res) => {
    try {
        const { id: trainerid } = req.params;
        const trainer = await TrainerModel.findById(trainerid);
        if (!trainer) {
            return res.status(404).json({ message: `No user with id: ${trainerid}` });
        } else {
            res.status(200).json({
                message: `user with id : ${trainerid} found successfully`,
                trainer: trainer,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})


TrainerController.delete("/delete/:id", async (req, res) => {
    try {
        const { id: trainerid } = req.params;
        const trainer = await TrainerModel.findByIdAndDelete(trainerid);
        if (!trainer) {
            return res.status(404).json({ message: `No user with id: ${trainerid}` });
        } else {
            res.status(200).json({
                message: `user with id : ${trainerid} deleted successfully`,
                trainer: trainer,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


TrainerController.get("/alltrainer", async (req, res) => {
    const trainer = await TrainerModel.find();
    try {
        res.status(200).send({
            trainer: trainer,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//patch request
//  http://20.121.40.36:8080/trainer/patch/id

TrainerController.patch("/patch/:id", async (req, res) => {
    try {
        const { id: trainerid } = req.params;
        const trainer = await TrainerModel.findByIdAndUpdate(trainerid, req.body, {
            new: true,
            runValidators: true,
        });

        if (!trainer) {
            return res.status(404).json({ message: `No Trainer with id: ${trainerid}` });
        } else {
            res.status(200).json({
                message: `Trainer with id: ${trainerid} updated successfully`,
                trainer: trainer,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = {
    TrainerController
}