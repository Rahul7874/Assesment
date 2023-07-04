const { Router } = require("express")
const bcrypt = require('bcrypt');
const { UserModel } = require("../Models/User.model.js")
const jwt = require("jsonwebtoken")
const userController = Router();
require("dotenv").config()

userController.post("/signup", async (req, res) => {
  try {
    const { email, password, lname, fname, mobno, isAdmin, isSuperAdmin } = req.body;

    // check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user object with hashed password
    const User = new UserModel({
      email,
      password: hashedPassword,
      lname,
      fname,
      mobno,
      isSuperAdmin,
      isAdmin
    });

    // save new user to database
    await User.save();

    res.status(201).json({ message: 'User created' });
    // res.json({msg : "Signup successfull"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

userController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists with given email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // compare provided password with hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // password is correct, create and send JWT token
    const token = jwt.sign({ userId: user._id, Name: user.fname }, process.env.JWT_SECRET);
    res.json({ token });
    // console.log(token)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

userController.get("/get/:id", async (req, res) => {
  try {
    const { id: userid } = req.params;
    const user = await UserModel.findById(userid);
    if (!user) {
      return res.status(404).json({ message: `No user with id: ${userid}` });
    } else {
      res.status(200).json({
        message: `user with id : ${userid} found successfully`,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
})


userController.get("/alluser", async (req, res) => {
  const user = await UserModel.find();
  try {
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


userController.delete("/delete/:id", async (req, res) => {
  try {
    const { id: userid } = req.params;
    const user = await UserModel.findByIdAndDelete(userid);
    if (!user) {
      return res.status(404).json({ message: `No user with id: ${userid}` });
    } else {
      res.status(200).json({
        message: `user with id : ${userid} deleted successfully`,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userController.patch("/patch/:id", async (req, res) => {
    try {
        const { id: userid } = req.params;
        const user = await UserModel.findByIdAndUpdate(userid, req.body, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ message: `No Trainer with id: ${userid}` });
        } else {
            res.status(200).json({
                message: `user with id: ${userid} updated successfully`,
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = {
  userController
}