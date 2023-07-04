const { Router } = require("express")

const { QuizResultModel } = require("../Models/QuizResult.model.js")


const QuizResultController = Router();

QuizResultController.post("/post", async (req, res) => {
    
    try {
       
        
        const { UserId,course, lecture, user, score, currentDate, currentTime} = req.body;



        const QuizResult = new QuizResultModel({
            UserId,
            course,
            lecture,
            user,
            score,
            currentDate,
            currentTime
        });

        await QuizResult.save();

        res.status(201).json({ message: 'QuizResult created' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error in quiz' });
    }
});

QuizResultController.get("/getresult", async (req, res) => {
    const QuizResult = await QuizResultModel.find();
    try {
        res.status(200).send({
            quizresult: QuizResult,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


QuizResultController.get("/getQuizResult/:id", async (req, res) => {

    try {
        const { id: QuizResultid } = req.params;
        const QuizResult = await QuizResultModel.findById(QuizResultid);
        if (!QuizResult) {
            return res.status(404).json({ message: `No Course with id: ${QuizResultid}` });
        } else {
            res.status(200).json({
                message: `user with id : ${QuizResultid} found successfully`,
                QuizResult: QuizResult,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

// QuizResultController.get("/getQuizResult/:course", async (req, res) => {

//     try {
//         // const { id: courseid } = req.params.course;
        
//         const QuizResult = await QuizResultModel.find({course : req.params.course});
//         if (!QuizResult) {
//             return res.status(404).json({ message: `No Course with id: ${req.params.course}` });
//         } else {
//             console.log("course : ",req.params.course)
//             res.status(200).json({
//                 message: `user with id : ${req.params.course} found successfully`,
//                 QuizResult: QuizResult,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });

//     }
// })






// QuizResultController.patch("/patch/:id", async (req, res) => {
//     try {
//         const { id: QuizResultid } = req.params;
//         const QuizResult = await QuizResultModel.findByIdAndUpdate(QuizResultid, req.body, {
//             new: true,
//             runValidators: true,
//         });

//         if (!QuizResult) {
//             return res.status(404).json({ message: `No course with id: ${QuizResultid}` });
//         } else {
//             res.status(200).json({
//                 message: `course with id: ${QuizResultid} updated successfully`,
//                 QuizResult: QuizResult,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

QuizResultController.delete("/delete/:id", async (req, res) => {
    try {
        const { id: QuizResultid } = req.params;
        const QuizResult = await QuizResultModel.findByIdAndDelete(QuizResultid);
        if (!QuizResult) {
            return res.status(404).json({ message: `No QuizResult with id: ${QuizResultid}` });
        } else {
            res.status(200).json({
                message: `QuizResult with id : ${QuizResultid} deleted successfully`,
                QuizResult: QuizResult,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = {
    QuizResultController
}
