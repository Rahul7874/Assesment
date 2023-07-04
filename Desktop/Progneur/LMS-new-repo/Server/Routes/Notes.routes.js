const { Router } = require("express");
require("dotenv").config();
const { NotesModel } = require("../Models/Notes.model.js");
const mongoose = require("mongoose");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

const NotesController = Router();

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); //Appending extension
//   },
// });

// var upload = multer({ storage: storage }).single("pdfFile");

NotesController.get("/allnote", async (req, res) => {
  const notes = await NotesModel.find();
  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
    res.setHeader("Content-Length", notes.length);

    res.status(200).json({
      notes: notes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

NotesController.get("/onenote/:name/:lecture", async (req, res) => {
  // const notes = await NotesModel.findOne();

  const { name, lecture } = req.params;

  // const foundCourse =  NotesModel.find({ course: name });
  // console.log("note : ",foundCourse.exec())
  // // console.log("note : ",foundCourse.title)
  // // console.log("note : ",foundCourse.lectureNo)
  // // console.log("note : ",foundCourse.path)
  // // console.log("note : ",foundCourse.desc)

  // try {
  //   res.setHeader("Content-Type", "application/pdf");
  //   res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
  //   res.setHeader("Content-Length", notes.length);

  //   res.status(200).json({
  //     notes: foundCourse,
  //   });
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }


  NotesModel.findOne({ course: name, lectureNo: parseInt(lecture) })
    .exec()
    .then(foundCourse => {
      if (foundCourse) {

        res.json(foundCourse);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    })
    .catch(error => {
      // Handle the error
      res.status(500).json({ error: error.message });
    });

});

NotesController.post("/create", async (req, res) => {
  try {

    const finaldata = {
      title: req.body.name,
      path: req.body.documentUrl1,
      desc: req.body.des,
      owner: req.body.owner,
      subject: req.body.course,
      number: req.body.lecture
    };




    // upload(req, res, async (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     // let file = fs.readFileSync(req.file.path);

    //     // let base_64 = file.toString("base64");

    //     let finalfile = {
    //       contentType: req.file.mimetype,
    //       path: req.file.path,
    //       // file: new Buffer.from(base_64, "base64"),
    //       title: req.body.title,
    //       desc: req.body.desc,
    //       owner: req.body.owner,
    //       subject: req.body.subject,
    //       number: req.body.number,
    //     };

        const Note = new NotesModel(finaldata);
        // console.log("final note : ",Note)
        await Note.save();
        res.status(201).json({ message: "Notes created" });
    //   }
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

NotesController.post("/coursenotes", async (req, res) => {
  try {



    const finaldata = {
      title: req.body.name,
      path: req.body.documentUrl1,
      desc: req.body.des,
      owner: req.body.owner,
      course: req.body.course,
      lectureNo: req.body.lecture
    };


    // upload(req, res, async (err) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     // let file = fs.readFileSync(req.file.path);

    //     // let base_64 = file.toString("base64");

    //     let finalfile = {
    //       contentType: req.file.mimetype,
    //       path: req.file.path,
    //       // file: new Buffer.from(base_64, "base64"),
    //       title: req.body.title,
    //       desc: req.body.desc,
    //       owner: req.body.owner,
    //       course: req.body.course,
    //       subject:null,
    //       lectureNo: req.body.lecturenumber,

    //     };

    //     console.log("final course note: ",finalfile)

    const Note = new NotesModel(finaldata);

    await Note.save();
    // console.log("notes for course : ", finaldata);
    res.status(201).json({ message: "Notes created" });
    //   }
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  NotesController,
};
